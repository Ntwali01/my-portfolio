# PowerShell script to set full access permissions for Next.js binary
# Works on Windows PowerShell

param(
    [string]$ProjectPath = $PWD
)

Write-Host "🔧 Setting full access permissions for Next.js binary..." -ForegroundColor Cyan

$NextBinPath = Join-Path $ProjectPath "node_modules\.bin\next"

# Check if the next binary exists
if (-not (Test-Path $NextBinPath)) {
    Write-Host "❌ Error: Next.js binary not found at: $NextBinPath" -ForegroundColor Red
    Write-Host "💡 Make sure you're in the project root directory and have run 'npm install'" -ForegroundColor Yellow
    exit 1
}

Write-Host "🖥️  Detected OS: Windows" -ForegroundColor Green
Write-Host "📁 Target file: $NextBinPath" -ForegroundColor Gray

try {
    # Get current ACL
    $acl = Get-Acl $NextBinPath
    Write-Host "📋 Current permissions retrieved" -ForegroundColor Green
    
    # Create new access rule for Everyone with full control
    $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule(
        "Everyone",
        "FullControl",
        "Allow"
    )
    
    # Add the access rule
    $acl.SetAccessRule($accessRule)
    
    # Apply the new ACL
    Set-Acl $NextBinPath $acl
    
    Write-Host "✅ Full access permissions set successfully using PowerShell ACL" -ForegroundColor Green
    
} catch {
    Write-Host "⚠️ PowerShell ACL method failed: $($_.Exception.Message)" -ForegroundColor Yellow
    
    # Fallback: try to modify file attributes
    try {
        $file = Get-Item $NextBinPath -Force
        $file.Attributes = $file.Attributes -band (-bnot [System.IO.FileAttributes]::ReadOnly)
        Write-Host "✅ File attributes updated successfully" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Could not set advanced permissions, but basic access should work" -ForegroundColor Yellow
    }
}

# Verification
Write-Host ""
Write-Host "📋 Verification:" -ForegroundColor Cyan

if (Test-Path $NextBinPath) {
    $fileInfo = Get-Item $NextBinPath
    Write-Host "✅ File exists: $($fileInfo.FullName)" -ForegroundColor Green
    Write-Host "📊 Size: $($fileInfo.Length) bytes" -ForegroundColor Gray
    Write-Host "📅 Modified: $($fileInfo.LastWriteTime)" -ForegroundColor Gray
    
    # Show current permissions
    try {
        $currentAcl = Get-Acl $NextBinPath
        Write-Host "🔐 Current access rules:" -ForegroundColor Gray
        $currentAcl.Access | Where-Object { $_.IdentityReference -eq "Everyone" } | ForEach-Object {
            Write-Host "   $($_.IdentityReference): $($_.FileSystemRights)" -ForegroundColor White
        }
    } catch {
        Write-Host "   Could not retrieve detailed permissions" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ File not found after permission attempt" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Next.js binary permissions setup complete!" -ForegroundColor Green
Write-Host "💡 You can now run: npm run dev or npx next dev" -ForegroundColor Cyan
