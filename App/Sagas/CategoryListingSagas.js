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

import { call, put, select } from 'redux-saga/effects'
import _ from 'lodash'
import CategoryListingActions from '../Redux/CategoryListingRedux'
import Toast from 'react-native-simple-toast'

export function * getCategoryList (api, action) {
  const { data = {} } = action
  try {
    const response = yield call(api.getCategories, data)
    yield put(CategoryListingActions.categoryListSuccess(response.data || [], data))
  } catch (e) {
    // console.log(e)
    yield put(CategoryListingActions.categoryListFailure())
  }
}

export function * createCategory (api, action) {
  try {
    const { categoryData } = action
    //console.log(categoryData)

    const response = yield call(api.createCategory, categoryData)
    if (response.ok) {
      yield put(CategoryListingActions.addCategoryInList(response.data))
      Toast.show(I18n.t('Category Created Successfully'))
    } else {
      yield put(CategoryListingActions.errorAddingCategory())
      Toast.show(I18n.t('Error Creating Category'))
    }
  } catch (e) {
    console.log(e)
    yield put(CategoryListingActions.errorAddingCategory())
    Toast.show(I18n.t('Error Creating Category'))
  }
}
