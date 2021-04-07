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



const AppContainer = () => {

    return (
        <DduxProvider initialState={initialState} initialCache={initialCache}>
            <ThemeProvider>
            <LanguageProvider>
                <GlobalLayouts>
                    <StatusBar barStyle={'light-content'} translucent={true} backgroundColor='transparent' />
                    <Navigation />
                </GlobalLayouts>
            </LanguageProvider>
            </ThemeProvider>
        </DduxProvider>
    )
}


export default AppContainer