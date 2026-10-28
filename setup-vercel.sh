#!/usr/bin/env bash

# Exit on any error
set -e

# Ensure Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel
fi

# Log in to Vercel (will open browser if not already logged in)
# This may require user interaction.
vercel login || true

# Directory of the project (assumed current working directory)
PROJECT_DIR="$(pwd)"

# Read .env.local and add each variable to Vercel for both production and preview
if [[ -f "$PROJECT_DIR/.env.local" ]]; then
  while IFS='=' read -r KEY VALUE; do
    # Skip empty lines or comments
    [[ -z "$KEY" ]] && continue
    echo "Adding env $KEY to Vercel (production)..."
    echo "$VALUE" | vercel env add "$KEY" production --yes
    echo "Adding env $KEY to Vercel (preview)..."
    echo "$VALUE" | vercel env add "$KEY" preview --yes
  done < "$PROJECT_DIR/.env.local"
fi

# Deploy to Vercel (production) with automatic project creation
# Replace "my-portfolio" with the desired project name if needed.
vercel --prod --yes --confirm --name my-portfolio

echo "Deployment triggered. Check your Vercel dashboard for status."
