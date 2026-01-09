# Deploying Malsons Construction & Renovation to Hostinger

This guide explains how to deploy your built website to Hostinger.

## Prerequisites
- You have a Hostinger account and a hosting plan.
- You have successfully built the project (the `dist` folder exists).

## Steps

1.  **Locate the Build Folder**
    - Go to your project folder: `c:\Users\kesev\Downloads\malsons_CR_ website\`
    - Open the `dist` folder. You should see `index.html` and an `assets` folder.

2.  **Login to Hostinger**
    - Go to [Hostinger hPanel](https://hpanel.hostinger.com/) and log in.

3.  **Access File Manager**
    - Click on **Websites** in the top menu.
    - Find your domain (e.g., `malsons.com`) and click **Manage**.
    - On the left sidebar, assume "Files" or search for **File Manager**. Click it.

4.  **Upload Files**
    - Inside File Manager, navigate to the `public_html` folder.
    - **Important:** If there is a default `default.php` or empty `index.php` file, delete it.
    - Click the **Upload** button (usually an arrow icon pointing up).
    - Select **Folder** if supported, or select all files inside your local `dist` folder.
    - **Crucial:** You must upload the *contents* of the `dist` folder directly into `public_html`, NOT the `dist` folder itself.
        - Your `public_html` should look like this:
            - `assets/` (folder)
            - `index.html` (file)
            - `vite.svg` (file, optional)

5.  **Verify Deployment**
    - Open your website URL (e.g., `www.yourdomain.com`).
    - You should see the Malsons Construction & Renovation site.

## Troubleshooting
- **404 Errors on Refresh:** If you navigate to a page and refresh, and get a 404 error, you may need a `.htaccess` file for single-page apps.
    - Create a new file named `.htaccess` in `public_html`.
    - Paste this code:
      ```apache
      <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
      </IfModule>
      ```
