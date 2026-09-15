#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const nextBinPath = path.join(process.cwd(), 'node_modules', '.bin', 'next');

console.log('Setting executable permissions for Next.js binary...');

try {
  // Check if the next binary exists
  if (!fs.existsSync(nextBinPath)) {
    console.error('Error: Next.js binary not found at:', nextBinPath);
    process.exit(1);
  }

  // Get current platform
  const platform = process.platform;

  switch (platform) {
    case 'win32':
      // Windows - use icacls to grant full permissions
      console.log('Windows detected: Setting full access permissions...');
      try {
        execSync(`icacls "${nextBinPath}" /grant Everyone:F`, { stdio: 'inherit' });
        console.log('✅ Windows permissions set successfully');
      } catch (error) {
        console.warn('⚠️ icacls failed, trying attrib command...');
        execSync(`attrib +r "${nextBinPath}"`, { stdio: 'inherit' });
        console.log('✅ Windows file attributes set');
      }
      break;

    case 'darwin':
    case 'linux':
      // macOS and Linux - use chmod
      console.log(`${platform === 'darwin' ? 'macOS' : 'Linux'} detected: Setting executable permissions...`);
      fs.chmodSync(nextBinPath, '755');
      console.log('✅ Executable permissions set (755)');
      break;

    default:
      console.warn(`⚠️ Unknown platform: ${platform}`);
      console.log('Attempting to set permissions with chmod...');
      try {
        fs.chmodSync(nextBinPath, '755');
        console.log('✅ Executable permissions set (755)');
      } catch (error) {
        console.error('❌ Failed to set permissions:', error.message);
      }
  }

  // Verify permissions were set
  const stats = fs.statSync(nextBinPath);
  console.log(`\n📋 Current file permissions: ${stats.mode.toString(8)}`);
  console.log(`📁 File path: ${nextBinPath}`);

} catch (error) {
  console.error('❌ Error setting permissions:', error.message);
  process.exit(1);
}

console.log('\n🎉 Next.js binary permissions setup complete!');
