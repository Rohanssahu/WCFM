import React, { Component } from 'react';
import {
    Button,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {actions, defaultActions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

const initHTML = `<br/>
<center><b>Rich Editor</b></center>
<center>
<a href="https://github.com/wxik/react-native-rich-editor">React Native</a>
<span>And</span>
<a href="https://github.com/wxik/flutter-rich-editor">Flutter</a>
</center>
<br/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/120px-React-icon.svg.png" />
<br/><br/><br/><br/>
`;

export default class TinymceEditor extends Component {

    richText = React.createRef();
    linkModal = React.createRef();

    constructor(props) {
        super(props);
        let description = this.props.description
        description = description.replace('\"', '"')
        this.state = {
            value: description
        };
    }

    editorInitializedCallback() {
        this.richText.current?.registerToolbar(function (items) {
            console.log('Toolbar click, selected items (insert end callback):', items);
        });
    }

    handleChange(html) {
        // console.log('editor data:', html);
    }

    render() {
        
        return (
            <View>
                <ScrollView style={[styles.scroll]} keyboardDismissMode={'none'}>                    
                    <RichEditor
                        // initialFocus={true}
                        disabled={false}
                        //editorStyle={contentStyle} // default light style
                        //containerStyle={themeBg}
                        ref={this.richText}
                        style={[styles.rich]}
                        placeholder={'please input content'}
                        initialContentHTML={initHTML}
                        editorInitializedCallback={this.editorInitializedCallback}
                        onChange={this.handleChange}
                    />
                </ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <RichToolbar
                        style={[styles.richBar]}
                        editor={this.richText}
                        disabled={false}
                        //iconTint={color}
                        selectedIconTint={'#2095F2'}
                        disabledIconTint={'#8b8b8b'}
                        iconSize={40} // default 50
                        actions={[
                            ...defaultActions,
                            actions.setStrikethrough,
                            actions.heading1,
                            actions.heading4,
                        ]} // default defaultActions
                        
                    />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    rich: {
        minHeight: 300,
        flex: 1,
    },
    richBar: {
        height: 50,
        backgroundColor: '#F5FCFF',
    },
    scroll: {
        backgroundColor: '#ffffff',
    },
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    input: {
        flex: 1,
    },

    tib: {
        textAlign: 'center',
        color: '#515156',
    },
});
