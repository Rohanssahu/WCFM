// a library to wrap and simplify api calls
import axios from 'axios'
import apisauce from 'apisauce'
import ApiEndpoints from '../Constants/ApiEndpoints'
import {
  toUrlParams
} from './UrlHelper'

import Config from 'react-native-config'

const u = (url, params = {}) => toUrlParams(url, {
  wpApiPrefix: Config.WP_API_PREFIX,
  version: Config.API_VERSION,
  ...params
})

// our "constructor"
const create = (baseURL = 'http://') => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json'

    },
    // 10 second timeout...
    timeout: 30000,
    transformResponse: [].concat(
      (s) => (typeof s === 'string' && s.trim()) ? s.trim() : s,
      axios.defaults.transformResponse
    )
  })

  api.addResponseTransform(response => {
    if (response.status < 200 || response.status > 300 || !response.data) {
      throw (response)
    }
    return response
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  // const getRoot = () => api.get('')
  // const getRate = () => api.get('rate_limit')
  // const getUser = (username) => api.get('search/users', {q: username})
  const getAuthToken = (username, password, baseURL) => api.post(
    u(ApiEndpoints.getAuthToken), {
      username,
      password
    }, {
      baseURL
    }
  )

  const getProducts = (params) => api.get(u(ApiEndpoints.products), params)
  const getProduct = (productId) => api.get(`${u(ApiEndpoints.products)}${productId}`)
  const createProduct = (data) => api.post(u(ApiEndpoints.products), data)
  const updateProduct = (productId, data) => api.put(`${u(ApiEndpoints.quickEdit)}${productId}`, data)

  const getCategories = () => api.get(u(ApiEndpoints.categories))
  const createCategory = (data) => api.post(u(ApiEndpoints.categories), data)

  const getOrders = (params) => api.get(u(ApiEndpoints.orders), params)
  const getOrder = (orderId) => api.get(`${u(ApiEndpoints.orders)}/${orderId}`)
  const updateOrderStatus = (orderId, status) => api.put(`${u(ApiEndpoints.orders)}/${orderId}`, { status })
  const getOrderNotes = (orderId) => api.get(`${u(ApiEndpoints.orders)}/note/${orderId}`)
  const createOrderNote = (orderId, data) => api.post(`${u(ApiEndpoints.orders)}/note/${orderId}`, data)
  //const getOrderNotes = (orderId) => api.get(`${u(ApiEndpoints.orderNotes)}/${orderId}/notes`)
  //const createOrderNote = (orderId, data) => api.post(`${u(ApiEndpoints.orderNotes)}/${orderId}/notes`, data)
  const updateShipmentTracking = (data) => api.put(`${u(ApiEndpoints.orders)}/shipment_tracking`, data)

  const getBookings = (params) => api.get(u(ApiEndpoints.bookings), params)
  const getBooking = (bookingId) => api.get(`${u(ApiEndpoints.bookings)}/${bookingId}`)
  const updateBooking = (bookingId, data) => api.put(`${u(ApiEndpoints.bookings)}/${bookingId}`, data)
  const updateBookingStatus = (bookingId, status) => api.put(`${u(ApiEndpoints.bookings)}/update-status/${bookingId}`, { status })

  const getNotifications = (params) => api.get(u(ApiEndpoints.notifications), params)

  const getEnquiries = (params) => api.get(u(ApiEndpoints.enquiries), params)
  const getEnquiry = (EnquiryId) => api.get(`${u(ApiEndpoints.enquiries)}/${EnquiryId}`)
  const updateEnquiry = (EnquiryId, enquiry_reply) => api.post(`${u(ApiEndpoints.enquiries)}/${EnquiryId}/reply`, { enquiry_reply }) // eslint-disable-line

  const getCapabilities = () => api.get(u(ApiEndpoints.capabilities))
  const getSiteDetails = () => api.get(u(ApiEndpoints.siteDetails))
  const getSalesStats = () => api.get(u(ApiEndpoints.salesStats))

  const getReviews = (params) => api.get(u(ApiEndpoints.reviews), params)
  const updateReviewStatus = (reviewID, review_status) => api.post(`${u(ApiEndpoints.reviews)}/${reviewID}`, review_status) // eslint-disable-line

  const getMedias = (params) => api.get(u(ApiEndpoints.medias), params)
  const createMedia = (data) => api.post(u(ApiEndpoints.medias), data, {
    headers: { 'Content-Type': 'multipart/form-data;' }
  })

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    // getRoot,
    // getRate,
    // getUser
    getAuthToken,
    getProducts,
    getProduct,
    updateProduct,
    createProduct,
    getCategories,
    createCategory,
    getOrders,
    getOrder,
    updateOrderStatus,
    getOrderNotes,
    createOrderNote,
    updateShipmentTracking,
    getNotifications,
    getCapabilities,
    getSiteDetails,
    getBookings,
    getBooking,
    updateBooking,
    updateBookingStatus,
    getEnquiries,
    getEnquiry,
    updateEnquiry,
    getSalesStats,
    getReviews,
    updateReviewStatus,
    getMedias,
    createMedia,
    api
  }
}

// let's return back our create method as the default.
export default {
  create
}
