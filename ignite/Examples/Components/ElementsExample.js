// @flow

import React from 'react'
import { View } from 'react-native'
import ExamplesRegistry from '../../../App/Services/ExamplesRegistry'
import {
  Button
} from 'react-native-elements'

// Example
ExamplesRegistry.addPluginExample('Elements', () =>
  <View>
    <Button
      title='RN Elements Button'
    />
  </View>
)
