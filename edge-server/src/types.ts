import { betterAuth } from 'better-auth'
import { QueryClient } from '@tanstack/query-core'

export type Bindings = {
  socs_db: D1Database
  socs_r2: R2Bucket
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL: string
  FRONTEND_URL: string
  NODE_ENV?: string 
}

export type Variables = {
  auth: ReturnType<typeof betterAuth>
  queryClient: QueryClient
  session: any
}
