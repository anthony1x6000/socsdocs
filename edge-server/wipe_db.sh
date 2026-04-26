rm -rf .wrangler/state/v3/d1
rm -rf drizzle

printf "now run\n"
printf "pnpm drizzle-kit generate \n and then \n npx wrangler d1 execute socs-db --local --file=./drizzle/0000_faithgul_butterfly.sql\n" 
