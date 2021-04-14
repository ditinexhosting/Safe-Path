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
        zIndex: 9
    }
});

export default styles