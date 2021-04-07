import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import style from './style'
import { Mixins } from 'src/styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'src/hooks'
import { HeaderBar } from 'src/components'

const Header = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <HeaderBar navigation={_this.navigation} >
            <Text style={styles.title}> Tow Booking </Text>
        </HeaderBar>
    )
}

export default Header


