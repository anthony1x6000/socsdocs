# Generate the migration files
npx drizzle-kit generate

# Apply the migrations to your local Cloudflare D1 database (for local development)
npx wrangler d1 migrations apply socs-db --local

# Apply the migrations to your remote Cloudflare D1 database (for production)
npx wrangler d1 migrations apply socs-db --remote