#!/bin/bash

# Cross-platform script to set executable permissions for Next.js binary
# Works on Linux, macOS, and Windows (with Git Bash/WSL)

set -e

NEXT_BIN_PATH="node_modules/.bin/next"

echo "🔧 Setting executable permissions for Next.js binary..."

# Check if the next binary exists
if [ ! -f "$NEXT_BIN_PATH" ]; then
    echo "❌ Error: Next.js binary not found at: $NEXT_BIN_PATH"
    echo "💡 Make sure you're in the project root directory and have run 'npm install'"
    exit 1
fi

# Detect operating system
OS="$(uname -s)"
case "$OS" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGW;;
    MSYS*)      MACHINE=MSYS;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo "🖥️  Detected OS: $MACHINE"

# Set permissions based on OS
case "$MACHINE" in
    Linux|Mac)
        echo "📝 Setting executable permissions (755)..."
        chmod 755 "$NEXT_BIN_PATH"
        echo "✅ Permissions set successfully"
        ;;
    Cygwin|MinGW|MSYS)
        echo "📝 Setting executable permissions for Windows environment..."
        chmod 755 "$NEXT_BIN_PATH"
        echo "✅ Permissions set successfully"
        ;;
    *)
        echo "⚠️  Unknown OS, attempting generic chmod..."
        chmod 755 "$NEXT_BIN_PATH" || {
            echo "❌ Failed to set permissions"
            exit 1
        }
        echo "✅ Permissions set successfully"
        ;;
esac

# Verify permissions
echo ""
echo "📋 Verification:"
ls -la "$NEXT_BIN_PATH"

echo ""
echo "🎉 Next.js binary permissions setup complete!"
echo "💡 You can now run: npx next dev or npm run dev"
