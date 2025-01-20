import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

import styles from './Styles/ButtonBoxStyles'

export default class ButtonBox extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    iconLib: PropTypes.string,
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    text: PropTypes.string
  }

  render () {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
        <View style={styles.iconContainer} >
          {this.props.iconLib === 'MaterialCommunityIcons' && <MaterialCommunityIcons 
            name={this.props.iconName} 
            size={this.props.iconSize} 
            color={this.props.iconColor} />}
          {this.props.iconLib === 'AntDesign' && <AntDesign 
            name={this.props.iconName} 
            size={this.props.iconSize} 
            color={this.props.iconColor} />}
          {this.props.iconLib === 'Feather' && <Feather 
            name={this.props.iconName} 
            size={this.props.iconSize} 
            color={this.props.iconColor} />}
          <Text style={styles.label}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
