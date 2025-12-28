import { build as viteBuild } from "vite";
import { rm, cp, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>
`;

// contact.php generation removed — using FormSubmit for static hosting

async function buildStatic() {
  const distDir = path.resolve(__dirname, "..", "dist");

  console.log("🧹 Cleaning dist folder...");
  await rm(distDir, { recursive: true, force: true });

  console.log("🔨 Building static site with Vite...");
  await viteBuild();

  console.log("📄 Creating .htaccess for Apache...");
  await writeFile(path.join(distDir, ".htaccess"), htaccessContent);

  // Create 404.html as a copy of index.html for GitHub Pages SPA fallback
  try {
    await cp(path.join(distDir, "index.html"), path.join(distDir, "404.html"));
    console.log("📄 Created 404.html for GitHub Pages fallback");
  } catch (err) {
    console.warn("⚠️ Could not create 404.html:", err);
  }

  console.log(
    "✅ Static build complete! Ready for deployment.",
  );
  console.log(
    `📂 Output directory: ${distDir}`,
  );
  console.log("🚀 Next steps:");
    console.log("   1. Upload contents of 'dist/' to your hosting");
    console.log(
      "   2. Ensure .htaccess is uploaded (important for SPA routing)",
    );
}

buildStatic().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
