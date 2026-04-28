import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import { DopamineProvider } from './store/DopamineProvider'
import { SongProvider } from './utils/SongProvider'

const queryClient = new QueryClient()

// Create a new router instance
const router = createRouter({ 
  routeTree,
  context: {
    queryClient,
  },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DopamineProvider>
        <SongProvider>
          <RouterProvider router={router} />
        </SongProvider>
      </DopamineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
