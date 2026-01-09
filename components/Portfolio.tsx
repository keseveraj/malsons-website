import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUpRight, X, MapPin, Maximize2, ChevronsLeftRight } from 'lucide-react';

interface Project {
  id: number;
  category: string;
  title: string;
  location: string;
  image: string;       // The "After" image/thumbnail
  beforeImage: string; // The "Before" image
  video?: string;      // The "After" video
  beforeVideo?: string;// The "Before" video
  description: string;
  fullDescription: string;
}

const projects: Project[] = [
  {
    id: 1,
    category: "Residential",
    title: "Sky Condominium",
    location: "Puchong, Selangor",
    image: "/sky-condo-after.jpg",
    beforeImage: "/sky-condo-before.jpg",
    description: "Warm modern sanctuary.",
    fullDescription: "Transforming a bare unit into a warm, inviting family home. We introduced a solid wood dining centerpiece, ambient cove lighting, and a cozy layout that maximizes the stunning city view while maintaining a homely atmosphere."
  },
  {
    id: 2,
    category: "Office",
    title: "Sri Petaling Shoplot Office",
    location: "Sri Petaling, KL",
    image: "/sri-petaling-after.jpg",
    beforeImage: "/sri-petaling-before.jpg",
    description: "Modern shoplot office transformation.",
    fullDescription: "Converted a traditional shoplot into a modern, functional office space. The design maximizes space efficiency while maintaining a professional and welcoming atmosphere."
  },
  {
    id: 3,
    category: "Commercial",
    title: "Bukit Nanas Workspace",
    location: "Bukit Nanas, KL",
    image: "/bukit_nanas_thumbnail_after.jpg", // Thumbnail
    beforeImage: "/bukit_nanas_thumbnail_before.jpg",
    video: "/bukit_nanas_after.mp4",
    beforeVideo: "/bukit_nanas_before.mp4",
    description: "Dynamic office transformation.",
    fullDescription: "A complete overhaul of a commercial space in the heart of Bukit Nanas. This project features high-end finishes, integrated technology, and a layout designed for maximum productivity and employee well-being."
  },
  {
    id: 4,
    category: "Residential",
    title: "TRX Residence",
    location: "Tun Razak Exchange, KL",
    image: "/trx_residence_after.jpg",
    beforeImage: "/trx_residence_before.jpg",
    description: "Luxury urban living.",
    fullDescription: "A sophisticated high-rise renovation at Malaysia's financial district. The design emphasizes sleek lines, premium materials, and a layout that complements the panoramic city views."
  }
];

const BeforeAfterSlider: React.FC<{ after: string; before: string; afterVideo?: string; beforeVideo?: string }> = ({ after, before, afterVideo, beforeVideo }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoAfterRef = useRef<HTMLVideoElement>(null);
  const videoBeforeRef = useRef<HTMLVideoElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  const onMouseUp = () => setIsDragging(false);
  const onTouchEnd = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const onClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchend', onTouchEnd);
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  // Sync videos
  useEffect(() => {
    const v1 = videoAfterRef.current;
    const v2 = videoBeforeRef.current;
    if (!v1 || !v2) return;

    const syncVideos = () => {
      if (Math.abs(v1.currentTime - v2.currentTime) > 0.1) {
        v2.currentTime = v1.currentTime;
      }
      if (v1.paused !== v2.paused) {
        if (v1.paused) v2.pause();
        else v2.play();
      }
    };

    v1.addEventListener('play', syncVideos);
    v1.addEventListener('pause', syncVideos);
    v1.addEventListener('seeking', syncVideos);
    v1.addEventListener('timeupdate', syncVideos);

    return () => {
      v1.removeEventListener('play', syncVideos);
      v1.removeEventListener('pause', syncVideos);
      v1.removeEventListener('seeking', syncVideos);
      v1.removeEventListener('timeupdate', syncVideos);
    };
  }, [afterVideo, beforeVideo]);

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize group"
      ref={containerRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onClick={onClick}
    >
      {/* After Side */}
      {afterVideo ? (
        <video
          ref={videoAfterRef}
          src={afterVideo}
          poster={after}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={after}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1200&auto=format&fit=crop";
          }}
        />
      )}

      {/* Label After */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold z-10 pointer-events-none uppercase tracking-wider">
        After
      </div>

      {/* Foreground Side (Before) - Clipped */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {beforeVideo ? (
          <video
            ref={videoBeforeRef}
            src={beforeVideo}
            poster={before}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={before}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop";
            }}
          />
        )}
        {/* Label Before */}
        <div className="absolute top-4 left-4 bg-amber-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold z-10 pointer-events-none uppercase tracking-wider">
          Before
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center translate-x-[-50%]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl transform scale-100 group-active:scale-110 transition-transform">
          <ChevronsLeftRight className="w-5 h-5 text-stone-900" />
        </div>
      </div>

      {/* Hint */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-500 pointer-events-none z-30 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
        Drag to compare
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-4 md:mb-0">
            <span className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-2 block animate-fade-in">Our Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 animate-fade-in">Featured Transformations</h2>
          </div>

          <a href="#contact" className="hidden md:flex items-center text-stone-600 font-medium hover:text-stone-900 transition-all group animate-fade-in">
            Book a consultation
            <ArrowUpRight className="ml-2 w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white border border-stone-100 animate-fade-up aspect-[4/3] md:aspect-[16/10]"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  if (project.id === 1) {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1200&auto=format&fit=crop";
                  }
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-full uppercase tracking-[0.2em]">
                      {project.category}
                    </span>
                    <Maximize2 className="text-white w-5 h-5 opacity-70" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">{project.title}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    </div>
                    <p className="text-stone-300 text-xs font-medium tracking-wide">
                      {project.video ? 'Watch Comparison Video' : 'View Comparison'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Indicators */}
              <div className="md:hidden absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-stone-900/90 to-transparent">
                <h3 className="text-lg font-serif font-bold text-white mb-1">{project.title}</h3>
                <p className="text-stone-300 text-[10px] uppercase tracking-widest opacity-80">
                  {project.video ? 'Tap for Video comparison' : 'Tap to compare'}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-8">
          <div
            className="absolute inset-0 bg-stone-950/95 backdrop-blur-xl animate-fade-in"
            onClick={() => setSelectedProject(null)}
          ></div>

          <div className="relative bg-white w-full max-w-7xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[90vh] lg:h-[85vh] animate-modal-enter">

            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-40 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:scale-110 active:scale-95 lg:bg-black/20 lg:text-stone-900 lg:border-stone-200 lg:hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Side */}
            <div className="w-full lg:w-[65%] h-[45%] lg:h-full relative bg-stone-950">
              <BeforeAfterSlider
                after={selectedProject.image}
                before={selectedProject.beforeImage}
                afterVideo={selectedProject.video}
                beforeVideo={selectedProject.beforeVideo}
              />
            </div>

            {/* Text Side */}
            <div className="w-full lg:w-[35%] p-8 lg:p-12 flex flex-col h-[55%] lg:h-full overflow-y-auto bg-white border-l border-stone-100">
              <div className="mb-auto">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {selectedProject.category}
                  </span>
                  {selectedProject.video && (
                    <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-widest border border-amber-100">
                      Video Ready
                    </span>
                  )}
                </div>

                <h3 className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mb-4 leading-[1.2]">
                  {selectedProject.title}
                </h3>

                <div className="flex items-center text-stone-500 mb-10 group/loc">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mr-3 group-hover/loc:bg-amber-100 transition-colors">
                    <MapPin className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-semibold tracking-tight">{selectedProject.location}</span>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Project Overview</h4>
                    <p className="text-stone-600 leading-relaxed text-base">
                      {selectedProject.fullDescription}
                    </p>
                  </section>

                  <section className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                    <h5 className="font-bold text-xs text-stone-800 uppercase tracking-wider mb-4">Transformation Metrics</h5>
                    <ul className="grid grid-cols-1 gap-4">
                      <li className="flex items-center text-sm text-stone-600">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        </div>
                        Premium Material Integration
                      </li>
                      <li className="flex items-center text-sm text-stone-600">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        </div>
                        Spatial Flow Optimization
                      </li>
                      <li className="flex items-center text-sm text-stone-600">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        </div>
                        Bespoke Architectural Lighting
                      </li>
                    </ul>
                  </section>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-stone-100">
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center justify-center w-full py-5 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-all group lg:text-lg"
                >
                  Quote This Style
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;