#!/bin/sh
set -e

echo "Running admin bootstrap..."
node src/scripts/createAdmin.js

echo "Starting server..."
node src/server.js