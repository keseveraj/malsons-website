export interface EstimateParams {
    size: number;
    type: string;
    property: string;
    condition: string;
    style: string;
    kitchenSize?: string;
    bathrooms?: string;
}

export const calculateRenovationCost = (data: EstimateParams): string => {
    let baseTotal = 0;
    const size = data.size || 0;

    // 1. KITCHEN & BATH PACKAGES (Fixed Estimates)
    if (data.type === 'Kitchen & Bath') {
        const kitchenMap: Record<string, number> = {
            'Compact': 12000,
            'Standard': 18000,
            'Large': 30000
        };
        const bathCount = parseInt(data.bathrooms || '0') || 0;

        const kitchenCost = kitchenMap[data.kitchenSize || ''] || 0;
        const bathCost = bathCount * 7000; // ~RM 7k per bathroom benchmark

        baseTotal = kitchenCost + bathCost;
    }
    // 2. PSF CALCULATIONS (General Renovation)
    else {
        let rate = 90; // Default Base Rate (Standard Renovations)

        // Base Rates per Type
        switch (data.type) {
            case 'Full Renovation': rate = 110; break;
            case 'Partial Renovation': rate = 70; break;
            case 'Office Fit-Out': rate = 100; break;
            default: rate = 90;
        }

        // Property Type Adjustments
        // Condos often have stricter working hours/logistics = slightly higher labor
        if (data.property === 'Condo / Apt') rate += 10;
        if (data.property === 'Shop Lot') rate -= 5; // Easier access sometimes

        baseTotal = size * rate;
    }

    // 3. MULTIPLIERS (Condition & Style)
    let multiplier = 1.0;

    // Condition
    if (data.condition === 'Older / Resale Unit') {
        multiplier += 0.15; // +15% for hacking, piping, rewiring
    }

    // Style
    if (data.style === 'Luxury / Bespoke') {
        multiplier += 0.35; // +35% for premium materials/carpentry
    } else if (data.style === 'Minimalist / Basic') {
        multiplier -= 0.10; // -10% for simpler finishes
    }

    const finalTotal = baseTotal * multiplier;

    // 4. RANGE CALCULATION (±15% Buffer)
    // We floor/ceil to nearest hundred for cleaner numbers
    const min = Math.round((finalTotal * 0.85) / 100) * 100;
    const max = Math.round((finalTotal * 1.15) / 100) * 100;

    if (baseTotal === 0) return "RM 0";

    return `RM ${min.toLocaleString()} - RM ${max.toLocaleString()}`;
};
