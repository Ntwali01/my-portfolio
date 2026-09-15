@echo off
REM Windows batch script to set full access permissions for Next.js binary

setlocal enabledelayedexpansion

echo 🔧 Setting full access permissions for Next.js binary...

set "NEXT_BIN_PATH=node_modules\.bin\next"

REM Check if the next binary exists
if not exist "%NEXT_BIN_PATH%" (
    echo ❌ Error: Next.js binary not found at: %NEXT_BIN_PATH%
    echo 💡 Make sure you're in the project root directory and have run 'npm install'
    pause
    exit /b 1
)

echo 🖥️  Detected OS: Windows
echo 📁 Target file: %NEXT_BIN_PATH%

REM Try to set full permissions using icacls
echo 📝 Attempting to set full access permissions...
icacls "%NEXT_BIN_PATH%" /grant Everyone:F >nul 2>&1

if %errorlevel% equ 0 (
    echo ✅ Full access permissions set successfully using icacls
) else (
    echo ⚠️ icacls failed, trying alternative method...
    
    REM Alternative: try to remove read-only attribute
    attrib -r "%NEXT_BIN_PATH%" >nul 2>&1
    
    if %errorlevel% equ 0 (
        echo ✅ File attributes updated successfully
    ) else (
        echo ⚠️ Could not set advanced permissions, but basic access should work
    )
)

REM Verify file exists and show info
echo.
echo 📋 Verification:
if exist "%NEXT_BIN_PATH%" (
    echo ✅ File exists: %NEXT_BIN_PATH%
    dir "%NEXT_BIN_PATH%" | find "%NEXT_BIN_PATH%"
) else (
    echo ❌ File not found after permission attempt
)

echo.
echo 🎉 Next.js binary permissions setup complete!
echo 💡 You can now run: npm run dev or npx next dev

pause
