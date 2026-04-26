rm -rf .wrangler/state/v3/d1
rm -rf drizzle

npx drizzle-kit generate --name=init

MIGRATION_FILE=$(ls drizzle/*.sql | head -n 1)

if [ -f "$MIGRATION_FILE" ]; then
  echo "Applying migration ($MIGRATION_FILE) to local D1 database..."
  npx wrangler d1 execute socs-db --local --file="$MIGRATION_FILE"
else
  echo "Error: No migration file found in ./drizzle/"
fi
