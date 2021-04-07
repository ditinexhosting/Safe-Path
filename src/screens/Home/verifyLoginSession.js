import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Image,
    Text,
    Animated,
    Easing,
    PermissionsAndroid,
} from 'react-native';
import Config from 'src/config'
import API from 'src/services/api'
import { Container, Toast } from 'src/components'

var isInitialTokenCheckCompleted = false

const VerifyLoginSession = async (userDetails,Ddux) => {
    if(!userDetails || isInitialTokenCheckCompleted)
        return
    try {
        /*
         * API LoginByToken
         */
        let response = await API.loginByToken(userDetails.mobile,userDetails.active_session_refresh_token)
        if (!response.status) {
            return Toast.show({ type: 'error', message: response.error })
        }
        isInitialTokenCheckCompleted = true
        if(!response.data.isUserExists){
            Ddux.setCache('user',null)
            return false
        }
        response.data.token_expiry = new Date().getTime() + 45 * 60000;
        Config.session = { mobile: response.data.mobile, active_session_refresh_token: response.data.active_session_refresh_token, access_token: response.data.access_token, token_expiry: response.data.token_expiry }
        return true
        
    }
    catch (e) {
        console.error(e)
    }
}

export default VerifyLoginSession


