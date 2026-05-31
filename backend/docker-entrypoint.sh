#!/bin/sh
set -e

echo "Bootstrapping admin..."
node src/scripts/createAdmin.js

echo "Bootstrapping VAPID keys..."
node src/scripts/createVapidKeys.js

echo "Starting server..."
exec node src/server.js