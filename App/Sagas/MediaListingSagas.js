/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select, delay } from 'redux-saga/effects'
import MediaListingActions, { MediaListingSelectors } from '../Redux/MediaListingRedux'
import Toast from 'react-native-simple-toast'
import { Platform } from 'react-native'
import I18n from '../I18n'

export function * getMediaList (api, action) {
  const { data = {} } = action
  // console.log(data)
  try {
    const response = yield call(api.getMedias, data)
    //console.log(response.headers['x-wp-totalpages'])
    yield put(MediaListingActions.mediaListSuccess(response.data || [], { page: data.page, totalpage: response.headers['x-wp-totalpages'] }))
  } catch (e) {
    // console.log(e)
    // if(e.data.code == "rest_post_invalid_page_number") {
    //   yield put(MediaListingActions.mediaListSuccess( [] ) )
    // } else {
      yield put(MediaListingActions.mediaListFailure())
    //}
  }
}

export function * createMedia (api) {
  // console.log('here...')
  try {
    const updateURL = yield select(MediaListingSelectors.mediaUpdateURL)
    // console.log(updateURL)
    let path = updateURL.uri
    let filename = updateURL.fileName
    if (Platform.OS === "ios") {
      path = "~" + path.substring(path.indexOf("/Documents"));
      if (!updateURL.fileName) filename = path.split("/").pop();
    }

    var photo = {
      uri: updateURL.uri,
      type: updateURL.type || 'image/jpeg',
      name: filename
    }

    // use formdata
    var formData = new FormData()
    // append created photo{} to formdata
    formData.append('file', photo)
    formData.append('title', updateURL.fileName)
    // formData.append('caption', 'caption')

    // let formData = new FormData();

    // dynamically get file type
    // let uriParts = updateURL.uri.split('.');
    // let fileType = uriParts[uriParts.length - 1];

    // //generate some random number for the filename
    // var randNumber1 = Math.floor(Math.random() * 100);
    // var randNumber2 = Math.floor(Math.random() * 100);

    // formData.append('file', updateURL.uri);

    // let fileUrl = (!updateURL.path.match(/^file:/) ? 'file://' : '') + updateURL.path
    // console.log(formData)

    const response = yield call(api.createMedia, formData)
    // console.log(response)
    if (response.ok) {
      yield put(MediaListingActions.createMediaSuccess())
      //yield put(ProductListingActions.updateProductInList(response.data))
      Toast.show(I18n.t('Media Uploaded Successfully'))
    } else {
      yield put(MediaListingActions.errorUploadingMedia())
      Toast.show(I18n.t('Error Uploading Media'))
    }
  } catch (e) {
    // console.log(e)
    yield put(MediaListingActions.errorUploadingMedia())
    Toast.show(I18n.t('Error Uploading Media'))
  }
}

// export function * searchMedia (action) {
//   yield delay(1000)
//   const { searchTerm = '' } = action
//   yield put(MediaListingActions.mediaListRequest({ page: 1, search: searchTerm }))
// }

// export function * updateStatus (api, action) {
//   try {
//     const { id, status } = action
//     const response = yield call(api.updateOrderStatus, id, status)
//     if (response.ok) {
//       yield put(OrderListingActions.updatedStatus(id, status))
//     } else {
//       yield put(OrderListingActions.errorUpdatingStatus(response.data))
//     }
//   } catch (e) {
//     yield put(OrderListingActions.errorUpdatingStatus(e))
//   }
// }
