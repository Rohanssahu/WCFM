import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { CapabilitiesSelectors } from '../../Redux/CapabilitiesRedux'
import { View, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
//import { Image } from 'react-native-elements'
import styles from './Styles/MediaListItemStyle'
import get from 'lodash/get'

class MediaListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    media: PropTypes.object,
    index: PropTypes.number,
    onPress: PropTypes.func,
    capabilities: PropTypes.object
  }

  selectImage = () => {
    const { navigation, media } = this.props;
    if(navigation && get(navigation, 'state.params.onSelect', false)) {
      navigation.goBack();
      //console.log(navigation)
      navigation.state.params.onSelect(media);
    }
    //navigation.state.params.onSelect({ selected: true });
  }


  render () {
    const { media } = this.props

    return (
      <TouchableOpacity style={styles.listItemContainer} onPress={this.selectImage}>
        <View style={styles.listItemRow}>
          <Image
            source={{ uri: get(media, 'media_details.sizes.thumbnail.source_url', false) ? media.media_details.sizes.thumbnail.source_url : media.source_url }}
            style={{ width: "100%", height: "100%" }}
            resizeMode={"contain"}
          />
          
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    capabilities: CapabilitiesSelectors.getData(state)
  }
}

export default compose(
  connect(mapStateToProps)
)(MediaListItem)
