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
    super('db')

    this.version(1).stores({
      users: 
        '++id, username, password, extId, email, isRegistered, isBlocked, name, phone, recovery, refreshToken, role, isAllowOrder, isAllowAllClients, payCode, PayDes, maxCredit, maxObligo, hp, taxCode, parent, agent, city, address, isVatEnabled, salesCurrency, oneSignalAppId, createdAt, updatedAt',

      products: 
        '++id, sku, group, title, titleEnglish, defaultImagePath, remoteDefaultImagePath, description, barcode, isPublished, categoryLvl1, categoryLvl2, categoryLvl3, productAttributes, basePrice, finalPrice, stock, packQuantity, discount, orden, isNew, isSpecial, multiCategory, createdAt, updatedAt',

      categories:
        '++id, extId, title, description, isPublished, orden, lvlNumber, parentId, englishTitle, integrationGroups',

      attributeMain:
        '++id, extId, title, isPublished, orden, isInProductCard, isInFilter, SubAttributes',

      attributeSub:
        '++id, attributeId, title, productCount, isPublished, orden',

      productAttribute:
        '++id, product, attributeSub',

      history:
        '++id, documentNumber, documentType, userName, userExId, agentExId, agentName, status, createdAt, updatedAt, total, error, user, agent, agentApproved, orderComment, tax, comment',

      historyDetailed:
        '++id, historyId, sku, title, quantity, priceByOne, total, discount, product, tax, comment',
    })

    // Bind tables
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
    searchParams: string
  ): Promise<GetCatalogResponse> {
    const n1 = Number(lvl1) || 0
    const n2 = Number(lvl2) || 0
    const n3 = Number(lvl3) || 0

    const params = new URLSearchParams(
      searchParams.startsWith('?') ? searchParams.slice(1) : searchParams
    )
    const page = parseInt(params.get('page') || '1', 10)
    const limit = 20
    const offset = (page - 1) * limit

    const subFilterIds: number[] = []
    for (const [key, val] of params.entries()) {
      const m = key.match(/^filter\[(\d+)\]$/)
      if (m && val) {
        const subId = parseInt(val, 10)
        if (!isNaN(subId)) subFilterIds.push(subId)
      }
    }

    const rawSearch = params.get('search') || ''
    const searchTerm = decodeURIComponent(rawSearch).trim().toLowerCase()

    let coll = db.products.toCollection().filter((p: IProduct) =>
      p.isPublished &&
      (n1 === 0 || p.categoryLvl1.id === n1) &&
      (n2 === 0 || p.categoryLvl2.id === n2) &&
      (n3 === 0 || p.categoryLvl3.id === n3)
    )

    if (searchTerm) {
      coll = coll.filter(p =>
        p.sku.toLowerCase().includes(searchTerm) ||
        p.title.toLowerCase().includes(searchTerm) ||
        (p.titleEnglish || '').toLowerCase().includes(searchTerm)
      )
    }

    if (subFilterIds.length > 0) {
      const allPAs = await db.productAttribute.toArray()
      const matchingProductIds = new Set<number>()
      for (const pa of allPAs) {
        if (subFilterIds.includes(pa.attributeSub.id)) {
          matchingProductIds.add(pa.product.id)
        }
      }
      coll = coll.filter(p => matchingProductIds.has(p.id))
    }

    const allFiltered = await coll.toArray()
    const total = allFiltered.length
    const pageItems = allFiltered.slice(offset, offset + limit)
    const pageCount = Math.ceil(total / limit)

    const presentSubIds = new Set<number>()
    const presentMainIds = new Set<number>()
    allFiltered.forEach(p => {
      p.productAttributes.forEach((pa: any) => {
        const sub = pa.attributeSub
        presentSubIds.add(sub.id)
        presentMainIds.add(sub.attribute.id)
      })
    })

    const mains: IAttributeMain[] = await db.attributeMain.toArray()

    const filters = mains
      .filter(main => main.isInFilter && presentMainIds.has(main.id))
      .map(main => {
        const subAttrs = main.SubAttributes
          .filter(sub => {
            const appears = presentSubIds.has(sub.id)
            const allowed = subFilterIds.length === 0 || subFilterIds.includes(sub.id)
            return appears && allowed
          })
          .map(sub => {
            const count = allFiltered.filter(p =>
              p.productAttributes.some((pa: any) => pa.attributeSub.id === sub.id)
            ).length

            return {
              id: sub.id,
              title: sub.title,
              productCount: count,
              attribute: main,            
              isPublished: !!sub.isPublished,
              orden: sub.orden,
            }
          })

        return {
          id: main.id,
          extId: main.extId,
          title: main.title,
          isPublished: !!main.isPublished,
          ordern: main.ordern,           
          isInProductCard: !!main.isInProductCard,
          isInFilter: !!main.isInFilter,
          SubAttributes: subAttrs,
        }
      })
      .filter(f => f.SubAttributes.length > 0)

    return {
      data: pageItems,
      filters,
      total,
      size: pageItems.length,
      page,
      pageCount,
    }
  }
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
   * Find history entries by a date range, paginated.
   * @param dateFrom ISO date string
   * @param dateTo   ISO date string
   * @param page     1-based page index
   * @param size     number of items per page
   * @returns Promise<DocumentsResponse>
   */
  async findHistoryByDateRange(
    dateFrom: string,
    dateTo: string,
    page = 1,
    size = 10
  ): Promise<DocumentsResponse> {
    try {
      // fetch all matching records
      const all = await db.history
        .filter((h) => {
          const created = new Date(h.createdAt);
          return created >= new Date(dateFrom) && created <= new Date(dateTo);
        })
        .toArray();

      const total = all.length;
      const pageCount = Math.ceil(total / size);
      const currentPage = Math.min(Math.max(1, page), pageCount);

      // slice out this page
      const start = (currentPage - 1) * size;
      const documents = all.slice(start, start + size);

      return { documents, total, pageCount, page: currentPage, size };
    } catch (error) {
      console.error('Error in findHistoryByDateRange:', error);
      return { documents: [], total: 0, pageCount: 0, page: 1, size };
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
