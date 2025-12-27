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

const contactPhpContent = `<?php
// Contact form handler for static hosting
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit();
}

$name = htmlspecialchars($data['name']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : '-';
$message = htmlspecialchars($data['message']);
$timestamp = date('Y-m-d H:i:s');

// Validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit();
}

// Email configuration
$to = 'info@ra-alislam.sch.id'; // Email tujuan
$subject = 'Pesan Baru dari Website RA Al-Islam';
$body = "Timestamp: $timestamp\\n";
$body .= "---\\n";
$body .= "Nama: $name\\n";
$body .= "Email: $email\\n";
$body .= "Telepon: $phone\\n";
$body .= "---\\n\\n";
$body .= "Pesan:\\n";
$body .= $message;

// IMPORTANT: Use a domain-based sender to improve deliverability
$from = 'no-reply@ra-alislam.sch.id';
$headers = "From: $from\\r\\n";
$headers .= "Reply-To: $email\\r\\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\\r\\n";

// Pass envelope sender (-f) for better SPF alignment
if (mail($to, $subject, $body, $headers, "-f $from")) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Pesan terkirim']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>`;

async function buildStatic() {
  const distDir = path.resolve(__dirname, "..", "dist");

  console.log("🧹 Cleaning dist folder...");
  await rm(distDir, { recursive: true, force: true });

  console.log("🔨 Building static site with Vite...");
  await viteBuild();

  console.log("📄 Creating .htaccess for Apache...");
  await writeFile(path.join(distDir, ".htaccess"), htaccessContent);

  console.log("📧 Creating contact.php handler...");
  await writeFile(path.join(distDir, "contact.php"), contactPhpContent);

  console.log(
    "✅ Static build complete! Ready for deployment.",
  );
  console.log(
    `📂 Output directory: ${distDir}`,
  );
  console.log("🚀 Next steps:");
  console.log("   1. Upload contents of 'dist/' to your hosting");
  console.log("   2. Update email in contact.php if needed");
  console.log(
    "   3. Ensure .htaccess is uploaded (important for SPA routing)",
  );
}

buildStatic().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
