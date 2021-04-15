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
        position: 'absolute',
        top: Spacing.SCALE_50,
        right: Spacing.SCALE_20,
        zIndex: 999
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
    }
});

export default styles