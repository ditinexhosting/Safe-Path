import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import style from './style'
import { useTheme } from 'src/hooks'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BottomPopUp = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    return (
        <Modal
            style={styles.modal}
            onBackButtonPress={()=>_this.setModalVisible(false)}
            isVisible={_this.modalVisible}
            animationInTiming={700}
            animationOutTiming={700}
            hasBackdrop={false}
            coverScreen={false}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}>
            <View style={[styles.popup,styles.paddingTop10]}>
                <View style={[styles.flexRow,styles.spaceBetween,styles.alignCenter]}>
                    {_this.isSelectingOwnNode && <Text style={styles.popup_container_title}>Tap On Your Near About Node</Text>}
                    {!_this.isSelectingOwnNode && <Text style={styles.popup_container_title}>Tap On The Fire Node</Text>}
                    <TouchableOpacity onPress={()=>_this.modalNext()} style={styles.nextButton}>
                        <Icon name="arrow-right" size={20} color="white"/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>_this.modalReset()} style={[styles.reset_button,styles.marginRight5,styles.marginTop5]}>
                    <Icon name="sync-alt" size={15} color="white"/>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}


export default BottomPopUp


