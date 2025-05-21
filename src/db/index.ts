/*  eslint-disable import/no-named-as-default,
    @typescript-eslint/ban-ts-comment,
    @typescript-eslint/no-unused-vars 
*/
import Dexie from 'dexie'

class MyDatabase extends Dexie {
  users
  products
  categories
  attributeMain
  attributeSub
  productAttribute
  history
  historyDetailed

  constructor() {
    super('MyDatabase')

    this.version(2).stores({
      users:
        '++id, extId, email, isRegistered, isBlocked, name, phone, city, address, createdAt, updatedAt, discount, role',
      products:
        '++id, sku, title, categoryLvl1Id, categoryLvl2Id, categoryLvl3Id, barcode, defaultImagePath, isPublished, createdAt, updatedAt, basePrice, finalPrice, discount, stock, ordern, isNew, isSpecial, orden, packQuantity',
      categories:
        '++id,lvlNumber, parentId, extId, title, description, isPublished, orden',
      attributeMain:
        '++id,extId,title,isPublished,orden,isInProductCard,isInFilter',
      attributeSub: '++id,attributeId,title',
      productAttribute: '++id,productId,attributeSubId',
      history:
        '++id, documentNumber, documentType, userName, userExId, agentExId, agentName, status, createdAt, updatedAt, total, error, user, orderComment, tax',
      historyDetailed:
        '++id, historyId, sku, title, quantity, priceByOne, total, discount, product, tax',
    })

    this.users = this.table('users')
    this.products = this.table('products')
    this.categories = this.table('categories')
    this.attributeMain = this.table('attributeMain')
    this.attributeSub = this.table('attributeSub')
    this.productAttribute = this.table('productAttribute')
    this.history = this.table('history')
    this.historyDetailed = this.table('historyDetailed')
  }
}

const db = new MyDatabase()
export default db

// Repositories

export const UserRepository = {
  /**
   * Get filtered users from the database with pagination.
   * @param {number} agentId - The ID of the agent to filter by.
   * @param {string} page - The page number for pagination (default is '1').
   * @param {string} search - A search term to filter by user name or email.
   * @param {string} status - The status to filter by.
   * @returns {Promise<{ users: IUser[], totalItems: number, currentPage: number, lastPage: number }>} - Paginated user data.
   */
  async getUsers(agentId: number, page = '1', search: string, status: string) {
    try {
      const pageSize = 24
      const currentPage = parseInt(page, 10)
      const offset = (currentPage - 1) * pageSize
      const agent = await this.findByUserId(agentId)

      let query: Dexie.Collection = db.users.toCollection()

      if (agentId && agent?.role !== 'ROLE_SUPER_AGENT') {
        query = db.users.where('agentId').equals(agentId)
      }

      if (status === 'active') {
        query = query.filter((user) => user.isRegistered === 1)
      } else if (status === 'inactive') {
        query = query.filter((user) => user.isRegistered === 0)
      }

      if (search) {
        const lowerSearch = search.toLowerCase()
        query = query.filter(
          (user) =>
            user.name?.toLowerCase().includes(lowerSearch) ||
            user.email?.toLowerCase().includes(lowerSearch)
        )
      }

      const excludedExtIds = [
        '48a147e2-29b5-46e1-928c-dbb8d9d2e207',
        '2cca2cd6-2d37-4809-9520-cae76474113e',
      ]
      query = query.filter((user) => !excludedExtIds.includes(user.extId))

      const totalItems = await query.count()
      const lastPage = Math.ceil(totalItems / pageSize)
      const users = await query.offset(offset).limit(pageSize).toArray()

      return {
        users,
        totalItems,
        currentPage,
        lastPage,
      }
    } catch (error) {
      console.error('Error in getUsers:', error)
      return {
        users: [],
        totalItems: 0,
        currentPage: 0,
        lastPage: 0,
      }
    }
  },

  async findByUserId(userId: number): Promise<IUser | null> {
    try {
      if (!userId) {
        throw new Error('Invalid userId')
      }

      return await db.users.get(userId)
    } catch (error) {
      console.error('Error in findByUserId:', error)
      return null
    }
  },
}

export const ProductRepository = {
  async getCatalog(
    lvl1: string | number,
    lvl2: string | number,
    lvl3: string | number,
    searchParams: string,
  ) {
    try {
      const urlParams = new URLSearchParams(searchParams)
      const page = parseInt(urlParams.get('page') || '1', 10)
      const itemsPerPage = parseInt(urlParams.get('itemsPerPage') || '24', 10)
      const filters: Record<string, string[]> = {}
      Array.from(urlParams.entries()).forEach(([key, value]) => {
        const match = key.match(/^filter\[(\d+)\]$/)
        if (match) {
          const attributeSubId = match[1]
          if (!filters[attributeSubId]) {
            filters[attributeSubId] = []
          }
          filters[attributeSubId].push(value)
        }
      })

      const offset = (page - 1) * itemsPerPage
      let query = db.products.toCollection()

      if (lvl1 && lvl1 !== '0') {
        query = query.filter((product) => product.categoryLvl1Id == lvl1)
      }

      if (lvl2 && lvl2 !== '0') {
        query = query.filter((product) => product.categoryLvl2Id == lvl2)
      }

      if (lvl3 && lvl3 !== '0') {
        query = query.filter((product) => product.categoryLvl3Id == lvl3)
      }
      if (filters) {
        for (const [attributeMainId, attributeSubIds] of Object.entries(
          filters
        )) {
          const subAttributes = await db.attributeSub
            .filter((sub) => sub.attributeId === parseInt(attributeMainId, 10))
            .toArray()
          const validSubIds = subAttributes.map((sub) => sub.id)
          const matchingProductAttributes = await db.productAttribute
            .filter(
              (attr) =>
                validSubIds.includes(attr.attributeSubId) &&
                attributeSubIds.includes(String(attr.attributeSubId))
            )
            .toArray()

          const matchingProductIds = matchingProductAttributes.map(
            (attr) => attr.productId
          )
          query = query.filter((product) =>
            matchingProductIds.includes(product.id)
          )
        }
      }

      const orderBy = urlParams.get('orderBy')
      if (orderBy) {
        //@ts-ignore
        query = query.sortBy(orderBy)
      }

      const searchValue = urlParams.get('search')
      if (searchValue) {
        query = query.filter((product) => {
          const lowerSearchValue = searchValue.toLowerCase()
          return (
            product.title.toLowerCase().includes(lowerSearchValue) ||
            product.sku.toLowerCase().includes(lowerSearchValue)
          )
        })
      }

      const totalItems = await query.count()
      const items = await query.offset(offset).limit(itemsPerPage).toArray()
      const itemsWithAttributes = await this.getProductAttributes(items)
      const allItemsForFiter = await this.getCatalogForFilter(
        lvl1,
        lvl2,
        lvl3,
        searchParams,
      )
      return {
        items: itemsWithAttributes,
        totalItems,
        currentPage: page,
        lastPage: Math.ceil(totalItems / itemsPerPage),
        filters: await this.getFilters(allItemsForFiter),
      }
    } catch (error) {
      console.error('Error in getCatalog:', error)
      return { items: [], totalItems: 0, currentPage: 1, lastPage: 1 }
    }
  },

  async getCatalogForFilter(
    lvl1: string | number,
    lvl2: string | number,
    lvl3: string | number,
    searchParams: string,
  ) {
    try {
      const urlParams = new URLSearchParams(searchParams)
      const filters: Record<string, string[]> = {}
      Array.from(urlParams.entries()).forEach(([key, value]) => {
        const match = key.match(/^filter\[(\d+)\]$/)
        if (match) {
          const attributeSubId = match[1]
          if (!filters[attributeSubId]) {
            filters[attributeSubId] = []
          }
          filters[attributeSubId].push(value)
        }
      })

      let query = db.products.toCollection()
      if (lvl1 && lvl1 !== '0') {
        query = query.filter((product) => product.categoryLvl1Id == lvl1)
      }

      if (lvl2 && lvl2 !== '0') {
        query = query.filter((product) => product.categoryLvl2Id == lvl2)
      }

      if (lvl3 && lvl3 !== '0') {
        query = query.filter((product) => product.categoryLvl3Id == lvl3)
      }

      if (filters) {
        for (const [attributeMainId, attributeSubIds] of Object.entries(
          filters
        )) {
          const subAttributes = await db.attributeSub
            .filter((sub) => sub.attributeId === parseInt(attributeMainId, 10))
            .toArray()
          const validSubIds = subAttributes.map((sub) => sub.id)
          const matchingProductAttributes = await db.productAttribute
            .filter(
              (attr) =>
                validSubIds.includes(attr.attributeSubId) &&
                attributeSubIds.includes(String(attr.attributeSubId))
            )
            .toArray()

          const matchingProductIds = matchingProductAttributes.map(
            (attr) => attr.productId
          )
          query = query.filter((product) =>
            matchingProductIds.includes(product.id)
          )
        }
      }

      const orderBy = urlParams.get('orderBy')
      if (orderBy) {
        //@ts-ignore
        query = query.sortBy(orderBy)
      }

      const searchValue = urlParams.get('search')
      if (searchValue) {
        query = query.filter((product) => {
          const lowerSearchValue = searchValue.toLowerCase()
          return (
            product.title.toLowerCase().includes(lowerSearchValue) ||
            product.sku.toLowerCase().includes(lowerSearchValue)
          )
        })
      }

      const items = await query.toArray()
      return items
    } catch (error) {
      console.error('Error in getCatalog:', error)
      return []
    }
  },

  async getFilters(items: IProduct[]): Promise<IAttributeMain[]> {
    const productIds = items.map((item) => item.id)
    const productAttributes = await db.productAttribute
      .filter((attr) => productIds.includes(attr.productId))
      .toArray()

    //@ts-ignore
    const attributeSubIds = [
      //@ts-ignore
      ...new Set(productAttributes.map((attr) => attr.attributeSubId)),
    ]
    const attributeSubs = await db.attributeSub
      .filter((sub) => attributeSubIds.includes(sub.id))
      .toArray()

    //@ts-ignore
    const attributeMainIds = [
      //@ts-ignore
      ...new Set(attributeSubs.map((sub) => sub.attributeId)),
    ]
    const attributeMains = await db.attributeMain
      .filter((main) => attributeMainIds.includes(main.id))
      .toArray()

    const filters: IAttributeMain[] = attributeMains.map((main) => {
      const subAttributes: ISubAttributes[] = attributeSubs
        .filter((sub) => sub.attributeId === main.id)
        .map((sub) => ({
          id: sub.id,
          title: sub.title,
          orden: sub.orden,
          isPublished: sub.isPublished,
          productCount: productAttributes.filter(
            (attr) => attr.attributeSubId === sub.id
          ).length,
          attribute: {
            id: main.id,
            extId: main.extId,
            orden: main.orden,
            title: main.title,
            isPublished: main.isPublished,
            ordern: main.orden,
            isInProductCard: main.isInProductCard,
            isInFilter: main.isInFilter,
            SubAttributes: [],
          },
        }))

      return {
        id: main.id,
        extId: main.extId,
        title: main.title,
        isPublished: main.isPublished,
        ordern: main.orden,
        isInProductCard: main.isInProductCard,
        isInFilter: main.isInFilter,
        SubAttributes: subAttributes,
      }
    })

    return filters
  },

  async getAllCatalog({
    lvl1 = null,
    lvl2 = null,
    lvl3 = null,
    showAll = false,
    orderBy = null,
    filters = null,
    searchValue = null,
    skusForSearch = null,
  }) {
    try {
      let query = db.products.toCollection()

      if (!showAll) {
        query = query.filter((product) => product.isPublished)
      }

      //@ts-ignore
      if (skusForSearch && skusForSearch.length > 0) {
        //@ts-ignore
        query = query.filter((product) => skusForSearch.includes(product.sku))
      }

      if (lvl1) {
        query = query.filter((product) => product.categoryLvl1 === lvl1)
      }

      if (lvl2) {
        query = query.filter((product) => product.categoryLvl2 === lvl2)
      }

      if (lvl3) {
        query = query.filter((product) => product.categoryLvl3 === lvl3)
      }

      if (filters) {
        for (const [attributeSubId, values] of Object.entries(filters)) {
          query = query.filter((product) => {
            return (
              db.productAttribute
                .where({
                  productId: product.id,
                  attributeSubId: parseInt(attributeSubId, 10),
                })
                //@ts-ignore
                .anyOf(values)
                .count() > 0
            )
          })
        }
      }

      if (searchValue) {
        query = query.filter((product) => {
          //@ts-ignore
          const lowerSearchValue = searchValue.toLowerCase()
          return (
            product.title.toLowerCase().includes(lowerSearchValue) ||
            product.sku.toLowerCase().includes(lowerSearchValue)
          )
        })
      }

      if (orderBy) {
        //@ts-ignore
        query = query.sortBy(orderBy)
      }

      return query.toArray()
    } catch (error) {
      console.error('Error in getAllCatalog:', error)
      return []
    }
  },

  async getProductAttributes(items: IProduct[]): Promise<IProduct[]> {
    try {
      const enrichedProducts = await Promise.all(
        items.map(async (product) => {
          const productAttributes = await db.productAttribute
            .filter((attr) => attr.productId === product.id)
            .toArray()

          const attributeSubs = await db.attributeSub
            .filter((sub) =>
              productAttributes
                .map((attr) => attr.attributeSubId)
                .includes(sub.id)
            )
            .toArray()

          //@ts-ignore
          const attributeMainIds = [
            //@ts-ignore
            ...new Set(attributeSubs.map((sub) => sub.attributeId)),
          ]
          const attributeMains = await db.attributeMain
            .filter((main) => attributeMainIds.includes(main.id))
            .toArray()

          //@ts-ignore
          const mappedProductAttributes: IProductAttributes[] =
            attributeSubs.map((sub) => {
              const mainAttribute = attributeMains.find(
                (main) => main.id === sub.attributeId
              )
              return {
                attributeSub: {
                  id: sub.id,
                  title: sub.title,
                  productCount: productAttributes.filter(
                    (attr) => attr.attributeSubId === sub.id
                  ).length,
                  attribute: {
                    id: mainAttribute?.id || 0,
                    extId: mainAttribute?.extId || '',
                    title: mainAttribute?.title || '',
                    orden: mainAttribute?.orden || 0,
                    isInProductCard: mainAttribute?.isInProductCard || false,
                    isInFilter: mainAttribute?.isInFilter || false,
                  },
                },
              }
            })

          const imagePath = [
            {
              id: product.id,
              mediaObject: {
                filePath: product.defaultImagePath,
              },
            },
          ]

          return {
            ...product,
            isPublished: !!product.isPublished,
            imagePath,
            productAttributes: mappedProductAttributes,
            isNew: !!product.isNew,
            isSpecial: !!product.isSpecial,
          }
        })
      )
      //@ts-ignore
      return enrichedProducts
    } catch (error) {
      console.error('Error in getProductAttributes:', error)
      return []
    }
  },

  findOrCreateProductBySku: async (product: IProduct) => {
    try {
      const { sku, ...newData } = product
      const existingProduct = await db.products.where({ sku }).first()

      if (existingProduct) {
        await db.products.update(existingProduct.id, newData)
        return existingProduct.id
      } else {
        return db.products.add(product)
      }
    } catch (error) {
      console.error('Error in findOrCreateProductBySku:', error)
    }
  },

  getProducts: async () => {
    return db.products.toArray()
  },
}

export const CategoryRepository = {
  findOrCreateCategoryById: async (
    category: ICategory
  ): Promise<number | undefined> => {
    try {
      const { extId, ...newData } = category
      const existingCategory = await db.categories.where({ extId }).first()

      if (existingCategory) {
        await db.categories.update(existingCategory.id, newData)
        return existingCategory.id
      } else {
        const newId = await db.categories.add(category)
        if (typeof newId === 'number') {
          return newId
        }
        throw new Error(`Unexpected primary key type: ${typeof newId}`)
      }
    } catch (error) {
      console.error('Error in findOrCreateCategoryById:', error)
      return undefined
    }
  },

  getCategories: async (): Promise<ICategory[]> => {
    return db.categories.toArray()
  },

  /**
   * Recursively fetch subcategories for a given category.
   */
  fetchSubcategories: async (parentId: number): Promise<ICategory[]> => {
    const subcategories = await db.categories
      .where('parentId')
      .equals(parentId)
      .and((subcategory: ICategory) => subcategory.isPublished)
      .sortBy('orden')

    const subcategoriesWithChildren = await Promise.all(
      subcategories.map(
        async (subcategory: ICategory): Promise<ICategory> => ({
          ...subcategory,
          categories: await CategoryRepository.fetchSubcategories(
            subcategory.id
          ),
        })
      )
    )

    return subcategoriesWithChildren
  },

  /**
   * Fetch categories with level 1, published categories, and their nested subcategories.
   */
  getAppCategories: async (): Promise<ICategory[]> => {
    try {
      const level1Categories = await db.categories
        .where('lvlNumber')
        .equals(1)
        .and((category: ICategory) => category.isPublished)
        .sortBy('orden')

      const categoriesWithSubcategories = await Promise.all(
        level1Categories.map(
          async (category: ICategory): Promise<ICategory> => ({
            ...category,
            categories: await CategoryRepository.fetchSubcategories(
              category.id
            ),
          })
        )
      )

      return categoriesWithSubcategories
    } catch (error) {
      console.error('Error in getAppCategories:', error)
      return []
    }
  },
}

export const HistoryRepository = {
  /**
   * Create a new history entry.
   * @param {IDocument} history - The history data to create.
   * @returns {Promise<number | undefined>} - The ID of the created history entry.
   */
  async createHistory(history: IDocument) {
    try {
      return await db.history.add(history)
    } catch (error) {
      console.error('Error in createHistory:', error)
      return undefined
    }
  },

  /**
   * Update an existing history entry by its ID.
   * @param {number} id - The ID of the history entry to update.
   * @param {Partial<IDocument>} updates - The updates to apply to the history entry.
   * @returns {Promise<boolean>} - True if the update was successful, otherwise false.
   */
  async updateHistoryById(
    id: number,
    updates: Partial<IDocument>
  ): Promise<boolean> {
    try {
      const count = await db.history.update(id, updates)
      return count > 0
    } catch (error) {
      console.error('Error in updateHistoryById:', error)
      return false
    }
  },

  /**
   * Find history entries by a date range.
   * @param {string} dateFrom - The starting date (ISO format).
   * @param {string} dateTo - The ending date (ISO format).
   * @returns {Promise<IDocument[]>} - A list of history entries within the date range.
   */
  async findHistoryByDateRange(
    dateFrom: string,
    dateTo: string
  ): Promise<IDocument[]> {
    try {
      return await db.history
        .filter((history) => {
          const createdAt = new Date(history.createdAt)
          return (
            createdAt >= new Date(dateFrom) && createdAt <= new Date(dateTo)
          )
        })
        .toArray()
    } catch (error) {
      console.error('Error in findHistoryByDateRange:', error)
      return []
    }
  },

  /**
   * Find a history entry by its ID.
   * @param {number} id - The ID of the history entry to find.
   * @returns {Promise<IDocument | undefined>} - The history entry if found, or undefined.
   */
  async findHistoryById(id: number): Promise<IDocument | undefined> {
    try {
      return await db.history.get(id)
    } catch (error) {
      console.error('Error in findHistoryById:', error)
      return undefined
    }
  },
}

export const HistoryDetailedRepository = {
  /**
   * Create a new detailed history entry.
   * @param {IDocumentItem} detailed - The detailed history data to create.
   * @returns {Promise<number | undefined>} - The ID of the created detailed history entry.
   */
  async createHistoryDetailed(detailed: IDocumentItem) {
    try {
      return await db.historyDetailed.add(detailed)
    } catch (error) {
      console.error('Error in createHistoryDetailed:', error)
      return undefined
    }
  },

  /**
   * Update an existing detailed history entry by its ID.
   * @param {number} id - The ID of the detailed history entry to update.
   * @param {Partial<IDocumentItem>} updates - The updates to apply to the detailed history entry.
   * @returns {Promise<boolean>} - True if the update was successful, otherwise false.
   */
  async updateHistoryDetailedById(
    id: number,
    updates: Partial<IDocumentItem>
  ): Promise<boolean> {
    try {
      const count = await db.historyDetailed.update(id, updates)
      return count > 0
    } catch (error) {
      console.error('Error in updateHistoryDetailedById:', error)
      return false
    }
  },

  /**
   * Find detailed history entries by history ID.
   * @param {number} historyId - The ID of the history entry to find detailed entries for.
   * @returns {Promise<IDocumentItem[]>} - A list of detailed history entries for the given history ID.
   */
  async findHistoryDetailedByHistoryId(
    historyId: string
  ): Promise<IDocumentItem[]> {
    try {
      return await db.historyDetailed
        .where('historyId')
        .equals(historyId)
        .toArray()
    } catch (error) {
      console.error('Error in findHistoryDetailedByHistoryId:', error)
      return []
    }
  },
}
