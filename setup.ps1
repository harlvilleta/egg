# Setup script for Harley's Egg Shop

Write-Host "Setting up Harley's Egg Shop..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "npm is not installed. Please install Node.js which includes npm." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing project dependencies..." -ForegroundColor Yellow
npm install

# Create necessary directories
Write-Host "Creating necessary directories..." -ForegroundColor Yellow
if (-not (Test-Path "public/images")) {
    New-Item -ItemType Directory -Path "public/images" -Force
}

# Create a backup
Write-Host "Creating initial backup..." -ForegroundColor Yellow
$backupDir = "../harley_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force
Copy-Item -Path * -Destination $backupDir -Recurse -Force

Write-Host "`nSetup completed successfully!" -ForegroundColor Green
Write-Host "`nTo start the development server, run: npm run dev" -ForegroundColor Cyan
Write-Host "The application will be available at: http://localhost:3000" -ForegroundColor Cyan 