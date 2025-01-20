import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, TextInput } from 'react-native'
// import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import moment from 'moment'
// import { connect } from 'react-redux'
// import { compose } from 'redux'
import styles from './Styles/EnquirySendReplyStyle'
import { Colors } from '../../Themes'
import I18n from '../../I18n'

class EnquirySendReply extends Component {
  // // Prop type warnings
  static propTypes = {
    replyMsg: PropTypes.string,
    replyMsgChange: PropTypes.func,
    handlePressReply: PropTypes.func
  }

  static defaultProps = {
    replyMsg: ''
  }

  render () {
    const { replyMsg, replyMsgChange, handlePressReply } = this.props
    // console.log(this.props)
    return (
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            ref='replymsg'
            keyboardType='default'
            value={replyMsg}
            onChangeText={replyMsgChange}
            placeholder={I18n.t('Write a message') + '...'}
            placeholderTextColor={Colors.text}
            underlineColorAndroid='transparent'
          />
        </View>
        <TouchableOpacity
          style={styles.btnSend}
          onPress={handlePressReply} >
          <Icon size={22} name={'send'} color={Colors.background} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default EnquirySendReply
