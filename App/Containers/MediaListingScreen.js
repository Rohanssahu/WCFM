import React from 'react'
import { View, Text, FlatList, ActivityIndicator, 
  LayoutAnimation, UIManager, Modal, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { Colors, Fonts } from '../Themes'
import MediaListingActions, { MediaListingSelectors } from '../Redux/MediaListingRedux'
import { LoginSelectors } from '../Redux/LoginRedux'
import MediaListItem from '../Components/MediaListing/MediaListItem'
import FloatingAddButton from '../Components/FloatingAddButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

import RoundedButton from '../Components/RoundedButton'
import ImagePicker from 'react-native-image-picker'
import I18n from '../I18n'
// Styles
import styles from './Styles/MediaListingScreenStyle'

class MediaListing extends React.PureComponent {
  static navigationOptions = {
    title: `${I18n.t('All Media')}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
    // headerTitleStyle: { color: 'green' },
  }

  constructor () {
    super()
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  state = {
    isActionButtonVisible: true,
    modalVisible: false,
    avatarSource: '',
    imageLoading: false
  }

  setModalVisible(visible) {
    //console.log(visible)
    this.setState({modalVisible: visible});

  }

  componentDidMount () {
    //console.log(this.props)
    //console.log(this.props.vendorId)
    if (!this.props.page ) {
      this.props.getMedias({ page: 1, author: this.props.vendorId, media_type: 'image' })
    }
  }

  handleRefresh = () => {
    this.props.getMedias({ page: 1, author: this.props.vendorId, media_type: 'image' })
  };

  handleLoadMore = () => {
    const { page, hasError, isLoading, isAllLoaded, vendorId } = this.props
    if (!isAllLoaded && !hasError && !isLoading) {
      this.props.getMedias({ page: page + 1, author: vendorId, media_type: 'image' })
    }
  };

  // handleOnPress = (media) => {
  //   this.props.navigation.navigate(
  //     'MediaEditScreen',
  //     { media }
  //   )
  // }

  renderHeader = () => {
    return null
  };

  renderFooter = () => {
    if (!this.props.isLoading) return null

    return (
      <View
        style={{
          paddingVertical: 20
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    )
  };

  renderRow = ({ item, index }) => {
    //console.log(item)
    return (
      <MediaListItem media={item} index={index} onPress={this.handleOnPress} navigation={this.props.navigation} />
    )
  }

  renderEmpty = () => this.props.isLoading ? null : (
    <View style={styles.messagesContainer}>
      <Text style={styles.label}> 
        {this.props.hasError ? I18n.t('Error Loading Media') : '- ' + I18n.t('No Media Found') + ' -'} 
      </Text>
    </View> )

  keyExtractor = (item, index) => item.id + '' + index

  stickyHeaderIndices = [0]

  _listViewOffset = 0

  _onScroll = (event) => {
    const CustomLayoutLinear = {
      duration: 100,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
    }
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
      ? 'down'
      : 'up'
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({ isActionButtonVisible })
    }
    // Update your scroll position
    this._listViewOffset = currentOffset
  }

  openImageUploader = () => {
    const { changeMediaField } = this.props
    //console.log(this.props)
    //console.log('aaa');
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: '',
      mediaType: 'photo',
      chooseFromLibraryButtonTitle: I18n.t('Choose from Gallery'),
      takePhotoButtonTitle: I18n.t('Open Camera'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    this.setState({ imageLoading: true })

    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      this.setState({ imageLoading: false })
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const sourceUrl = 'data:image/jpeg;base64,' + response.data
        const sourceUri = {
          fileName: response.fileName,
          uri: response.uri,
          data:  response.data,
          path: response.path
        }
        changeMediaField(sourceUri)
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ avatarSourceUrl: sourceUrl })
      }
    });

  }

  // renderAddMediaModal = () => {
  //   const { salesStats, salesStatsError, capabilities } = this.props
  //   if (salesStatsError || !salesStats) return
  //   if (capabilities.view_reports) return
  //   console.log(this.state)
  //   return (
      
  //   )
  // }

  render () {
    //console.log(this.props)
    //console.log(this.state)
    const { medias, isLoading, createMedia, isUpdating, updateSuccess } = this.props
    const { isActionButtonVisible, avatarSourceUrl, imageLoading } = this.state
    // console.log(medias);
    
    return (
      <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
            this.props.getMedias({ page: 1, author: this.props.vendorId, media_type: 'image' })
          }}>
          <View style={styles.mediaModalContainer}>
            <View style={styles.mediaModalInnerContainer}>
              <Text style={styles.mediaUploaderHeading}>{I18n.t('Upload Media in Library')}</Text>
              <TouchableOpacity onPress={this.openImageUploader} style={styles.mediaUploadButtonContainer} >
                <View style={styles.mediaUploadImageContainer}>
                  {/* <MaterialCommunityIcons name="plus" color={Colors.background} />  */}
                  { avatarSourceUrl && !imageLoading && !updateSuccess &&
                    <Image
                      source={{ uri: avatarSourceUrl }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode={"contain"}
                    />
                  }
                  { imageLoading &&
                    <ActivityIndicator animating size='large' />
                  }
                  { ( ( !avatarSourceUrl && !imageLoading  ) || updateSuccess ) && <FontAwesome name="file-image-o" size={90} color={Colors.textColorTwo} /> }
                </View>
                <View style={styles.selectImageTextContainer}>
                  <View style={styles.selectImageTextIconContainer}>
                    <Feather name="plus" size={30} color={Colors.background} />
                  </View>
                  <Text style={styles.selectImageText}>{I18n.t('Select Image')}</Text>
                </View>
                
              </TouchableOpacity>
              <RoundedButton 
                disabled={!avatarSourceUrl || imageLoading || isUpdating || updateSuccess } 
                customStyle={(!avatarSourceUrl || imageLoading || isUpdating || updateSuccess ) ? styles.updateButtonDisabled : styles.updateButton}
                isDisabled={!avatarSourceUrl || imageLoading || isUpdating || updateSuccess } 
                onPress={createMedia} 
                text={I18n.t('Upload Image')} 
              />
              <View style={styles.mediaUploadButtonContainer}>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={styles.gobackText}>{'< Back'}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.InnerFlatListContainer}>
          <FlatList
            data={medias}
            renderItem={this.renderRow}
            numColumns={2}
            horizontal={false}
            keyExtractor={this.keyExtractor}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            refreshing={isLoading}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.4}
            stickyHeaderIndices={this.stickyHeaderIndices}
            ListEmptyComponent={this.renderEmpty}
            onRefresh={this.handleRefresh}
            onScroll={this._onScroll}
          />
          {isActionButtonVisible && !isLoading && <FloatingAddButton customStyle={ !medias.length ? styles.floatingAddButton : null } handlePress={() => this.setModalVisible(true)} />}
        </View>
        
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    medias: MediaListingSelectors.medias(state),
    isLoading: MediaListingSelectors.isLoading(state),
    page: MediaListingSelectors.page(state),
    hasError: MediaListingSelectors.hasError(state),
    isAllLoaded: MediaListingSelectors.isAllLoaded(state),
    vendorId: LoginSelectors.getVendorId(state),

    isUpdating: MediaListingSelectors.isUpdating(state),
    updateSuccess: MediaListingSelectors.updateSuccess(state),
    //updateError: MediaListingSelectors.updateError(state)
  }
}

const mapDispatchToProps = {
  getMedias: MediaListingActions.mediaListRequest,
  changeMediaField: MediaListingActions.changeMediaField,
  createMedia: MediaListingActions.createMedia
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(MediaListing)
