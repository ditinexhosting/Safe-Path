import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Modal,
    Alert,
    Dimensions,
    Platform,
    BackHandler,
    StatusBar
} from 'react-native';
import Navigation from 'src/navigation'
import Config from 'src/config'
import { ThemeProvider, LanguageProvider, DduxProvider } from 'src/lib'
import { initialState, initialCache } from 'src/store'
import { GlobalLayouts } from 'src/components'
import { Toast } from 'src/components'
import Icon from 'react-native-vector-icons/FontAwesome';


const icons = {
    Success: ({ color }) => <Icon name="check-circle" size={30} color={color} />,
    Error: ({ color }) => <Icon name="times-circle" size={30} color={color} />,
    Info: ({ color }) => <Icon name="info-circle" size={30} color={color} />
}


const AppContainer = () => {

    return (
        <DduxProvider initialState={initialState} initialCache={initialCache}>
            <ThemeProvider>
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor='transparent' />
                <Navigation />
            </ThemeProvider>
            <Toast ref={(r) => Toast.setRef(r)}
                icons={icons} />
        </DduxProvider>
    )
}


export default AppContainer