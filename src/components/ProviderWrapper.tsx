'use client'

import { useRef } from 'react'

import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import type { ChildrenType } from '@core/types'
import { getQueryClient } from '@/lib/react-query'
import { makePersistor, makeStore, type AppStore } from '@/store'

const ProviderWrapper = ({ children }: ChildrenType) => {
  const storeRef = useRef<AppStore>()
  const persistorRef = useRef<ReturnType<typeof makePersistor>>()
  const queryClientRef = useRef<QueryClient>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
    persistorRef.current = makePersistor(storeRef.current)
  }

  if (!queryClientRef.current) {
    queryClientRef.current = getQueryClient()
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current!}>
        <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}
export default ProviderWrapper
