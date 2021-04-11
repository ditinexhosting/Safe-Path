import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from 'src/styles'

const style = ({ Colors }) => (StyleSheet.create({
    safe:{
        color: Colors.primary,
        fontSize: Typography.FONT_SIZE_40,
        backgroundColor: Colors.black
    },
    path:{
        color: Colors.black,
        fontSize: Typography.FONT_SIZE_40
    }
})
);


export default style