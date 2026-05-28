#!/bin/sh
set -e

echo "Bootstrapping admin..."
node src/scripts/createAdmin.js

echo "Starting server..."
exec node src/server.js