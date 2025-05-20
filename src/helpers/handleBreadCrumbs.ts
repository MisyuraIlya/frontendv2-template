import { handleErp } from './handleErpDocuments'

export const findCategoryTitleById = (
  categoryId: number | undefined,
  categories: ICategory[],
  dir: 'ltr' | 'rtl'
): string | undefined => {
  const findTitle = (
    id: number | undefined,
    categoryList: ICategory[]
  ): string | undefined => {
    for (const category of categoryList) {
      if (category.id === id) {
        return dir === 'rtl' ? category.title : category.englishTitle
      }

      if (category.categories && category.categories.length > 0) {
        const foundTitle = findTitle(id, category.categories)
        if (foundTitle !== undefined) {
          return foundTitle
        }
      }
    }

    return undefined
  }

  if (categoryId !== undefined && categories.length > 0) {
    return findTitle(categoryId, categories)
  }

  return undefined
}

export const findDocumentTypeTitle = (
  value: IDocumentTypes | undefined,
  dir: 'rtl' | 'ltr'
): string => {
  let result = ''
  handleErp()?.map((item) => {
    if (value === item.value) {
      result = dir === 'rtl' ? item.label : item.englishLabel
    }
  })
  return result
}
