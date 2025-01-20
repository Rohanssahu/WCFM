import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../Themes'
import FullScreenLoader from '../FullScreenLoader'
import moment from 'moment'
import AntDesign from 'react-native-vector-icons/AntDesign'
import HTML from 'react-native-render-html'

import styles from './Styles/NoteListItemStyle'

//const { SlideInMenu } = renderers

export default class NoteListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    note: PropTypes.object,
    index: PropTypes.number
  }

  render () {
    if (this.props.loading) {
      return (<FullScreenLoader />)
    }
    const { note, index } = this.props
    //console.log(note)
    const date = moment(note.date_created.date).format('DDMMM YYYY')
    const time = moment(note.date_created.date).format('hh:mmA')
    return (
      <View style={styles.listItemContainer} key={index}>
        <View style={note.customer_note ? styles.listCustomerNote : ''}>
          <View style={styles.listItemRow}>
            <View style={styles.noteDateContainer}>
              <AntDesign size={16.5} name={'clockcircleo'} color={Colors.secondaryColor} /><Text style={styles.noteDate}>{ date + ' | ' + time }</Text>
            </View>
            <View style={styles.noteDetailsContainer}>
              <HTML html={note.content} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
