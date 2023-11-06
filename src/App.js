import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Quotes from './page/Quotes'

const client=new QueryClient()
const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Quotes/>
    </QueryClientProvider>
  )
}

export default App