#!/bin/bash

echo "Starting local Better Auth edge server on port 8787..."

cd "$(dirname "$0")"

npx wrangler dev --port 8787