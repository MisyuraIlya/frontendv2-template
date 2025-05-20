import { create } from 'zustand'

interface useCatalogState {
  listView: typeMode
  setListView: (value: typeMode) => void

  mobileCategoryDrawver: boolean
  setMobileCategoryDrawver: (value: boolean) => void

  prodsPerPage: string
  setProdsPerPage: (value: string) => void
  prodsPerPageArr: selectObject[]

  sortProdSetting: selectObject
  setSortProdSetting: (value: selectObject) => void
  sortArr: selectObject[]
}

export const useCatalog = create<useCatalogState>((set) => ({
  listView: 'grid',
  setListView: (value: typeMode) => set({ listView: value }),

  mobileCategoryDrawver: false,
  setMobileCategoryDrawver: (mobileCategoryDrawver) =>
    set({ mobileCategoryDrawver }),

  prodsPerPage: '24',
  setProdsPerPage: (prodsPerPage) => set({ prodsPerPage }),
  prodsPerPageArr: [
    { value: '12', label: '12', englishLabel: '12' },
    { value: '24', label: '24', englishLabel: '24' },
    { value: '48', label: '48', englishLabel: '48' },
  ],

  sortProdSetting: { value: 'name', label: 'שם', englishLabel: 'name' },
  setSortProdSetting: (sortProdSetting) => set({ sortProdSetting }),
  sortArr: [
    { value: 'name', label: 'שם', englishLabel: 'name' },
    { value: 'isSpecial', label: 'מומלץ', englishLabel: 'recommended' },
    { value: 'isNew', label: 'חדש', englishLabel: 'new' },
  ],
}))
