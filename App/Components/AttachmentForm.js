import React from 'react'
import { View, Text } from 'react-native'
import {Input} from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './Styles/AttachmentFormStyle'
import RoundedButton from './RoundedButton'
import { Colors } from '../Themes'
import { withNavigation } from 'react-navigation'
import I18n from '../I18n'

class AttachmentForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: this.props.index,
      attachmentCount: this.props.attachmentCount,
      attachmentText: this.props.attachmentText,
      attachmentData: this.props.attachmentData
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.attachmentCount !== prevProps.attachmentCount) {
      this.setState({
        index: this.props.index,
        attachmentCount: this.props.attachmentCount,
        attachmentText: this.props.attachmentText,
        attachmentData: this.props.attachmentData
      })
    }
  }

  handleAttachmentTextChange = (text) => {
    this.setState({ attachmentText: text })
    this.props.onAttachmentChange(text, this.state.attachmentData, this.state.index)
  }

  handleSelectAttachment = (data) => {
    this.setState({ attachmentData: data })
    this.props.onAttachmentChange(this.state.attachmentText, data, this.state.index)
  }

  handlePress = () => {
    this.props.navigation.navigate("MediaListingScreen", { onSelect: this.handleSelectAttachment })
  }

  handleRemoveItem = () => {
    this.props.onRemoveItem(this.props.index)
  }

  render () {
    const { index, attachmentCount, attachmentText, attachmentData } = this.state
    return (
      <View style={styles.attachmentItem}>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>{I18n.t('File')}</Text>

        <Input
          ref='attachmentText'
          keyboardType='default'
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          value={attachmentText}
          onChangeText={this.handleAttachmentTextChange}
          underlineColorAndroid='transparent'
          onSubmitEditing={() => this.refs.attachmentText.focus()}
          placeholderTextColor={Colors.textColorTwo}
          containerStyle= {
            styles.containerStyle
          }
          inputContainerStyle= {
            styles.inputContainerStyle
          }          
          inputStyle={
            styles.inputStyle
          }
          labelStyle={
            styles.labelStyle
          }
        />

        <RoundedButton
          text={I18n.t('Upload')}
          customStyle={styles.customRoundedButtonStyle}
          customTextStyle={styles.customRoundedButtonTextStyle}
          onPress={this.handlePress} />

        {
          attachmentCount > 1 && 
          <MaterialCommunityIcons
            name='close-circle-outline'
            // raised
            size={24}
            style={{ flex: 1 }}
            color={Colors.secondaryColor}
            onPress={this.handleRemoveItem}
          />
        }        
      </View>
    )
  }
}
export default withNavigation(AttachmentForm)
