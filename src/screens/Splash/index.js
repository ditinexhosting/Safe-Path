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
        //setTimeout(()=>navigation.replace('Home'),2000)
    }, [])
    return (
        <Container isTransparentStatusBar={false}>
            <View style={[styles.flex1, styles.centerAll]}>
                <Text><Text style={styles.safe}> SAFE </Text><Text style={styles.path}> PATH</Text></Text>
            </View>
        </Container>
    )
}

export default Splash


