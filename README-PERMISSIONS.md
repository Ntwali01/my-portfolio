# Next.js Binary Permissions Setup

This repository includes cross-platform scripts to set executable permissions for the Next.js binary (`node_modules/.bin/next`) on all operating systems.

## 🚀 Quick Start

### Option 1: Using npm script (Recommended)
```bash
npm run setup-permissions
```

### Option 2: Direct script execution
Choose the appropriate script for your operating system:

#### Windows
```powershell
# PowerShell (recommended)
.\setup-next-permissions.ps1

# Command Prompt
setup-next-permissions.bat

# Node.js (cross-platform)
node setup-next-permissions.js
```

#### macOS / Linux
```bash
# Bash script
chmod +x setup-next-permissions.sh
./setup-next-permissions.sh

# Node.js (cross-platform)
node setup-next-permissions.js
```

## 📁 Available Scripts

| Script | Platform | Description |
|--------|----------|-------------|
| `setup-next-permissions.js` | Cross-platform | Node.js script that works on all OS |
| `setup-next-permissions.sh` | macOS/Linux | Bash script with Unix permissions |
| `setup-next-permissions.bat` | Windows | Batch script for Command Prompt |
| `setup-next-permissions.ps1` | Windows | PowerShell script with ACL management |

## 🔧 What the scripts do

### Windows
- Uses `icacls` to grant full access to Everyone group
- Falls back to `attrib` command if needed
- Handles file permissions through PowerShell ACL

### macOS/Linux
- Sets executable permissions using `chmod 755`
- Provides read, write, and execute access for owner
- Provides read and execute access for group and others

### Cross-platform (Node.js)
- Automatically detects the operating system
- Applies appropriate permission settings for each platform
- Provides detailed feedback and error handling

## ✅ Verification

Each script includes verification steps that show:
- Current file permissions
- File existence and location
- Permission status after changes

## 🛠️ Troubleshooting

### Permission Denied Errors
- **Windows**: Run PowerShell as Administrator
- **macOS/Linux**: Use `sudo` if needed: `sudo ./setup-next-permissions.sh`
- **All platforms**: Ensure you're in the project root directory

### File Not Found
- Make sure you've run `npm install` first
- Verify you're in the correct project directory
- Check that `node_modules/.bin/next` exists

### Still Having Issues?
1. Try the Node.js version: `node setup-next-permissions.js`
2. Manually set permissions:
   - Windows: `icacls "node_modules\.bin\next" /grant Everyone:F`
   - macOS/Linux: `chmod 755 node_modules/.bin/next`

## 📝 Notes

- These scripts only affect the Next.js binary in `node_modules/.bin/next`
- They don't modify any other files or system settings
- Scripts are safe to run multiple times
- Changes persist until `npm install` is run again

## 🎯 After Setup

Once permissions are set, you can run:
```bash
npm run dev
# or
npx next dev
# or
node_modules/.bin/next dev
```

All should work without permission errors!
