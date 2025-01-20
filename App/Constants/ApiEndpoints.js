const wcfmmpPrefix = '/:wpApiPrefix/wcfmmp/:version'
export default {
  getAuthToken: '/:wpApiPrefix/jwt-auth/:version/token/',

  medias: '/:wpApiPrefix/wp/v2/media',
  orderNotes: '/:wpApiPrefix/wc/v3/orders',

  products: `${wcfmmpPrefix}/products/`,
  categories: `${wcfmmpPrefix}/products/categories`,
  orders: `${wcfmmpPrefix}/orders`,
  quickEdit: `${wcfmmpPrefix}/products/quick-edit/`,
  notifications: `${wcfmmpPrefix}/notifications`,
  capabilities: `${wcfmmpPrefix}/restricted-capabilities`,
  siteDetails: `${wcfmmpPrefix}/site-details`,
  bookings: `${wcfmmpPrefix}/bookings`,
  enquiries: `${wcfmmpPrefix}/enquiries`,
  reviews: `${wcfmmpPrefix}/reviews`,
  salesStats: `${wcfmmpPrefix}/sales-stats`
  
}
