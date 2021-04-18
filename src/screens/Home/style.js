import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from 'src/styles'

const styles = StyleSheet.create({
    container: {
        width: Mixins.scaleSize(350),
        height: Mixins.scaleSize(600),
        position: 'relative'
    },
    logo:{
        resizeMode: 'stretch',
        width: Mixins.scaleSize(350),
        height: Mixins.scaleSize(600),
        //transform: [{rotate: '90deg'}],
        position: 'absolute',
        top: 0,
        left: 0
    },
    svg: {
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 99
    },
    switchView:{
        fontWeight: 'bold',
        fontSize: Typography.FONT_SIZE_18
    },
    toggleSwitchContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    topContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: Spacing.SCALE_50,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 999,
        width: Mixins.DEVICE_WIDTH,
        paddingLeft: Mixins.scaleSize(10)
    },
    fire_selection_container: {
        height: Mixins.scaleHeight(100),
        position: 'absolute',
        bottom: 0
    },
    save_button: {
        backgroundColor: 'tomato',
        padding: Spacing.SCALE_10,
        paddingHorizontal: Spacing.SCALE_25,
        borderRadius: 25,
        position: 'absolute',
        bottom: Spacing.SCALE_25,
        alignSelf: 'center',
        zIndex: 999
    },
    save_button_text: {
        color: 'white',
        fontWeight: 'bold'
    },

    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0
    },
    popup: {
        backgroundColor: '#f1f1f1',
        width: Mixins.DEVICE_WIDTH,
        height: Mixins.scaleHeight(80),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
        paddingHorizontal: Mixins.scaleSize(10),
    },
    nextButton: {
        height: 45,
        width: 45,
        backgroundColor: '#000',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    reset_button: {
        height: 30,
        width: 30,
        backgroundColor: '#000',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    popup_container_title: {
        fontWeight: 'bold',
        fontSize: Typography.FONT_SIZE_18
    },
    keymap_modal: {
        flex: 1,
        alignItems: 'center',
        margin: 0
    },
    close_button: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999
    }
});

export default styles