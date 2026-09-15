#!/usr/bin/env bash

# Exit on any error
set -e

# Install dependencies
npm ci

# Build the Next.js app
npm run build

# Deploy to Vercel (production) without interactive prompts
npx vercel --prod --confirm
