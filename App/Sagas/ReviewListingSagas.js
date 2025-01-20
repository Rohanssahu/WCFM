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

import { call, put } from 'redux-saga/effects'
import ReviewListingActions from '../Redux/ReviewListingRedux'

// import { ReviewListingSelectors } from '../Redux/ReviewListingRedux'

export function * getReviewList (api, action) {
  const { data = {} } = action
  try {
    const response = yield call(api.getReviews, data)
    yield put(ReviewListingActions.reviewListSuccess(response.data || [], data))
  } catch (e) {
    yield put(ReviewListingActions.reviewListFailure())
  }
}

// export function * searchReview (action) {
//   yield call(delay, 300)
//   const { searchTerm = '' } = action
//   yield put(ReviewListingActions.reviewListRequest({ page: 1, search: searchTerm }))
// }

export function * updateReviewStatus (api, action) {
  try {
    const { id, review_status } = action
    // console.log(review_status)
    const response = yield call(api.updateReviewStatus, id, { review_status })
    // console.log(response)
    if (response.ok) {
      // console.log(response)
      yield put(ReviewListingActions.updatedStatus(id, review_status))
    } else {
      // yield put(ReviewListingActions.errorUpdatingStatus(response.data))
    }
  } catch (e) {
    yield put(ReviewListingActions.errorUpdatingStatus(e))
  }
}
