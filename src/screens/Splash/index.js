import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import style from './style'
import { logo } from 'src/assets'
import { Container } from 'src/components'
import { useTheme } from 'src/hooks'

const Splash = ({ navigation }) => {
    const [Colors, styles] = useTheme(style)
    useEffect(() => {
        setTimeout(()=>navigation.replace('Home'),2000)
    }, [])
    return (
        <Container style={styles.centerAll} isTransparentStatusBar={false}>
            <View style={styles.flex1, styles.centerAll}>
                <Image
                    style={styles.logo}
                    source={logo}
                />
            </View>
        </Container>
    )
}

export default Splash


