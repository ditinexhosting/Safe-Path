import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import style from './style'
import { Mixins, Typography } from 'src/styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from 'src/config'
import { useTheme } from 'src/hooks'
import { hamburger } from 'src/assets'

const Header = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => _this.navigation.toggleDrawer()}>
                <Image
                    style={styles.hamburger}
                    source={hamburger}
                />
            </TouchableOpacity>
            {!_this.rideDetails && <GooglePlacesAutocomplete
                fetchDetails={true}
                minLength={4}
                enablePoweredByContainer={false}
                enableHighAccuracyLocation={true}
                styles={{
                    textInputContainer: styles.searchContainer,
                    textInput: styles.searchInput,
                    row: styles.searchResultContainer
                }}
                placeholder='Destination Place ...'
                onPress={(data, details = null) => {
                    _this.onDestinationSet({ name: details.name, address: details.formatted_address, location: details.geometry.location });
                }}
                query={{
                    key: GOOGLE_MAP_API_KEY,
                    language: 'en',
                }}
            />}
            {
                _this.rideDetails && <TouchableOpacity onPress={()=>_this.navigation.navigate('Home_Booking', { destination: _this.rideDetails.destination, source: _this.rideDetails.source })} style={[styles.flexRow, styles.continueButton]}>
                <Text style={styles.continueButtonText}>In-progress Booking</Text>
                <View style={styles.continueButtonIcon}>
                    <Icon name='ios-arrow-forward-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                </View>
            </TouchableOpacity>
            }
        </View>
    )
}

export default Header


