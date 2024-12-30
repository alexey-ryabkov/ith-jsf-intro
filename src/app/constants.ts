export const enum APP_ROUTES {
  MAIN = '/',
  CATEGORIES = '/categories',
  PRODUCTS = '/products',
  SALES = '/sales',
  CART = '/cart',
  UNKNOWN = '/404',
}

export const API_BASE_URL = 'http://localhost:3333';
export const enum API_ENDPOINTS {
  CATEGORY = '/categories',
  PRODUCT = '/products',
  SALE = '/sale',
  ORDER = '/order',
}

export const enum STORE_REDUCERS {
  CART = 'cart',
  CATEGORIES = 'categories',
  PRODUCTS = 'products',
  PRODUCT_DATA = 'product_data',
  NOTIFICATION = 'notification',
}
