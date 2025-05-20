import moment from 'moment'
import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useAgentStoreState {
  year: string
  setYear: (year: string) => void
}

export const useAgentStore = create(
  persist(
    (set) => ({
      year: moment().year().toString(),
      setYear: (year) => set({ year }),
    }),
    {
      name: 'agent-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useAgentStoreState, useAgentStoreState>
  )
)
