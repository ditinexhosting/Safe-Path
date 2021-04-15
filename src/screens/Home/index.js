import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    Switch,
    TouchableOpacity
} from 'react-native';
import style from './style'
import { map } from 'src/assets'
import { Container } from 'src/components'
import { useTheme } from 'src/hooks'
import Svg, {
    SvgCss,
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
    Text as SVGText
} from 'react-native-svg'
import { Mixins, Spacing, Typography } from 'src/styles'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Toast } from 'src/components'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'
import FindShortestPath from './shortestPath'

const Home = ({ navigation }) => {
    const [Colors, styles] = useTheme(style)
    const [isShowOnlyMap, setIsShowOnlyMap] = useState(true)
    const [isSelectingOwnNode, setIsSelectingOwnNode] = useState(false)
    const [isSelectingFireNode, setIsSelectingFireNode] = useState(false)
    const [isSelectionMode, setIsSelectionMode] = useState(false)
    const [selectedNode, setselectedNode] = useState({own: null,fire: null})

    const refugeChambers = [ '4', '16', '7', '8', '9', '11', '12', '22', '23', '25', '26', '27', '28', '30', '32', '33', '36', '38', '39' ]

    const nodes = {
        '1': [328.5, 477],
        '2': [304, 420],
        '3': [286.3, 377],
        '4': [267, 330],
        '5': [260, 312],
        '6': [239, 262],
        '7': [222, 222],
        '8': [200, 169],
        '9': [165, 210],
        '10': [133, 247],
        '11': [50, 340.5],
        '12': [9, 386.8],
        // Pink Path
        '13': [311, 367],
        '14': [292, 282],
        '15': [240, 299],
        '16': [226, 279],
        '17': [220, 270],
        '18': [280, 286.5],
        '19': [325, 288],
        '20': [267, 224],
        '21': [250, 205],
        '22': [104, 148],
        '23': [155, 102],
        '24': [90, 138],
        '25': [53, 109],
        '26': [91.4, 170],
        '27': [100, 398],
        '28': [89.5, 443],
        '29': [48, 433],
        '30': [58, 396],
        '31': [81, 311],
        '32': [35, 485],
        '33': [196, 300],
        '34': [189, 272],
        '35': [164, 162],
        '36': [134, 314],
        '37': [225, 398],
        '38': [237, 457],
        '39': [260, 508],
    }

    const paths = {
        '1_2': 'M 328.5 477 L 304 420',
        '2_3': 'M 304 420 L 286.3 377',
        '3_4': 'M 286.3 377 L 267 330',
        '4_5': 'M 267 330 L 260 312',
        '5_6': 'M 260 312 L 239 262',
        '6_7': 'M 239 262 L 222 222',
        '7_8': 'M 222 222 L 200 169',
        '8_9': 'M 200 169 L 165 210',
        '9_10': 'M 165 210 L 133 247',
        '10_11': 'M 133 247 L 50 340.5',
        '11_12': 'M 50 340.5 L 9 386.8',
        // Pink Path
        '3_13': 'M 286.3 377 L 311 367 M 305 369 L 310 382',
        '13_14': 'M 311 367 L 292 282',
        '14_15': 'M 292 282 L 256 295 M 250 296 L 240 299',
        '15_16': 'M 240 299 C 220,295 226,280 226,279',
        '16_17': 'M 226,279 S 228,272 237,265 M 235,267 L 229.5,261 L 220,270',
        '14_18': 'M 292 282 L 280 286.5',
        '18_19': 'M 280 286.5 S 284,296 292.5,293.5 M 298,292.5 L 325,288 M 306,290.5 L 301,272 S 292,260 291.5,277',
        // Greenish Path
        '5_20': 'M 260 312 L 266.5 304 L 268.5 292 M 269 288 L 276.5 232 L 267 224',
        '7_21': 'M 222 222 L 229.5 207 L 250 205 M 229.5 207 L 231 196 M 226 214 L 218 195',
        // Purple
        '8_22': 'M 200 169 L 104 148',
        '22_23': 'M 104 148 L 155 102',
        '23_24': 'M 104 148 L 90 138',
        '24_25': 'M 90 138 L 53 109',
        //Orange
        '24_26': 'M 90 138 L 91.4 170',
        '26_27': 'M 91.4 170 L 95 264 M 95 268 L 95.4 274 M 95.5 278 L 95.7 285 M 96.5 295 L 96.8 301 M 97 304 L 97 311 M 97.4 314 L 97.4 321 M 97.4 323.5 L 100 398',
        '27_28': 'M 100 398 L 89.5 443',
        '28_29': 'M 89.5 443 L 48 433',
        '29_30': 'M 48 433 L 58 396',
        '30_31': 'M 58 396 L 81 311',
        '29_32': 'M 48 433 L 35 485',
        '32_33': 'M 267 330 S 264,314 277.5,320 S 294.5,340 293,340 L 293,350 L 284,362 M 280,368 S 274,380 255,400 C 245,407 230,410 220,390 C 220,390 217,385 213,370 L 196 300',
        '33_34': 'M 196 300 L 190 272',
        '34_35': 'M 190 272 L 174 205 M 172 197 L 163 160',
        '35_36': 'M 190 272 L 135 313',
        '36_37': 'M 133 313 L 134 246 M 133 313 L 125 330',
        // yellow
        '37_38': 'M 223 398 L 229 415 M 229 415 L 220 420 M 220 420 L 238 458 M 238 455 L 226 465',
        '38_39': 'M 237 458 L 261 510 M 261 507 L 275 495 M 240 465 L 250 456',
    }

    const graph = {
        '1': { '2': 10 },
        '2': { '3': 8, '1': 10 },
        '3': { '4': 8.5, '2': 8, '13': 4.5 },
        '4': { '5': 2.5, '3': 8.5, '37': 20 },
        '5': { '6': 9, '4': 2.5, '20': 21 },
        '6': { '5': 9, '7': 8 },
        '7': { '6': 8, '8': 9, '21': 9 },
        '8': { '7': 9, '9': 9 },
        '9': { '8': 9, '10': 9 },
        '10': { '9': 9, '11': 20, '36': 10 },
        '11': { '10': 20, '12': 12 },
        '12': { '11': 12 },
        '13': { '3': 4.5, '14': 15 },
        '14': { '13': 15, '15': 10, '18': 1.5 },
        '15': { '14': 10, '16': 3 },
        '16': { '15': 3, '17': 4, '6': 2.5 },
        '17': { '16': 4, '6': 3 },
        '18': { '14': 1.5, '19': 11 },
        '19': { '18': 11 },
        '20': { '5': 21 },
        '21': { '7': 9, '22': 14 },
        '22': { '21': 14, '23': 11, '24': 1 },
        '23': { '22': 11 },
        '24': { '22': 1, '25': 9, '26': 6 },
        '25': { '24': 9 },
        '26': { '24': 6, '27': 45 },
        '27': { '26': 45, '28': 10 },
        '28': { '27': 10, '29': 9 },
        '29': { '28': 9, '30': 9, '32': 15 },
        '30': { '29': 9, '31': 22 },
        '31': { '30': 22 },
        '32': { '29': 15 },
        '33': { '37': 14, '34': 4 },
        '34': { '33': 4, '35': 18, '36': 10 },
        '35': { '34': 18 },
        '36': { '34': 10, '10': 10 },
        '37': { '4': 20, '33': 14, '38': 8 },
        '38': { '37': 8, '39': 8 },
        '39': { '38': 8 },
    }

    const onNodePress = (node) => {
        const shortestPath = FindShortestPath(graph,node,refugeChambers[0])
        return Toast.show({ type: 'success', message: 'Node : ' + node + '\nPath to refuge chamber : ' + shortestPath.path.join(' > ') })
    }

    return (
        <Container isTransparentStatusBar={false}>
            <View style={[styles.flex1,styles.centerAll]}>
            <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={0.5}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                onZoomAfter={null}
            >

                <View style={styles.container}>
                    <Image
                        style={styles.logo}
                        source={map}
                    />
                    {isShowOnlyMap &&
                    <Svg height="100%" width="100%" viewBox="0 0 350 600">
                        <Defs>
                            <G id="refugeChamber">
                                <Path
                                d="M 0,3 L 6,3 M 3,0 L 3,6"
                                stroke="#10772C"
                                strokeWidth="2.5"
                                />
                            </G>
                            <G id="mypoint">
                                <Path
                                d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
                                stroke="#ba2710"
                                strokeWidth="3"
                                />
                            </G>
                            <G id="firepoint">
                                <Path
                                d="M10.031 32c-2.133-4.438-0.997-6.981 0.642-9.376 1.795-2.624 2.258-5.221 2.258-5.221s1.411 1.834 0.847 4.703c2.493-2.775 2.963-7.196 2.587-8.889 5.635 3.938 8.043 12.464 4.798 18.783 17.262-9.767 4.294-24.38 2.036-26.027 0.753 1.646 0.895 4.433-0.625 5.785-2.573-9.759-8.937-11.759-8.937-11.759 0.753 5.033-2.728 10.536-6.084 14.648-0.118-2.007-0.243-3.392-1.298-5.312-0.237 3.646-3.023 6.617-3.777 10.27-1.022 4.946 0.765 8.568 7.555 12.394z"
                                stroke="#fa9400"
                                strokeWidth="3"
                                />
                            </G>
                        </Defs>
                        <Path
                            d={`
                            ${paths['3_13']}
                            ${paths['13_14']}
                            ${paths['14_15']}
                            ${paths['15_16']}
                            ${paths['16_17']}
                            ${paths['14_18']}
                            `}
                            stroke="#F42C71" //Pink
                            strokeWidth="1.1"
                        />
                        <Path
                            d={`
                            ${paths['1_2']}
                            ${paths['2_3']}
                            ${paths['3_4']}
                            ${paths['4_5']}
                            ${paths['5_6']}
                            ${paths['6_7']}
                            ${paths['7_8']}
                            ${paths['8_9']}
                            ${paths['9_10']}
                            ${paths['10_11']}
                            ${paths['11_12']}
                            `}
                            stroke="black" //Black
                            strokeWidth="1.5"
                        />
                        <Path
                            d={`
                            ${paths['18_19']}
                            `}
                            stroke="#A56EA6" //Violet
                            strokeWidth="1.1"
                        />
                        <Path
                            d={`
                            ${paths['5_20']}
                            ${paths['7_21']}
                            `}
                            stroke="#61BFB1" //Greenish
                            strokeWidth="1.1"
                        />
                        <Path
                            d={`
                            ${paths['8_22']}
                            ${paths['22_23']}
                            ${paths['23_24']}
                            ${paths['24_25']}
                            `}
                            stroke="#8D77FE" //Purple
                            strokeWidth="1.5"
                        />
                        <Path
                            d={`
                            ${paths['24_26']}
                            ${paths['26_27']}
                            ${paths['27_28']}
                            ${paths['28_29']}
                            ${paths['29_30']}
                            ${paths['30_31']}
                            ${paths['29_32']}
                            `}
                            stroke="#B67734" //Orange
                            strokeWidth="1.5"
                        />
                        <Path
                            d={`
                            ${paths['32_33']}
                            ${paths['33_34']}
                            ${paths['34_35']}
                            ${paths['35_36']}
                            ${paths['36_37']}
                            `}
                            stroke="#42A0C4" //Blue
                            strokeWidth="1.5"
                        />
                        <Path
                            d={`
                            ${paths['37_38']}
                            ${paths['38_39']}
                            `}
                            stroke="#FFD000" //Yellow
                            strokeWidth="1.5"
                        />
                        {
                            Object.keys(nodes).map(node => {
                                return (
                                    <TouchableWithoutFeedback key={node} onPress={() => onNodePress(node)} >
                                        <G>
                                            <Circle cx={nodes[node][0]} cy={nodes[node][1]} r="4" fill="#0B0A0A" />
                                            <Circle cx={nodes[node][0]} cy={nodes[node][1]} r="3" fill="#FF6276" />
                                            <SVGText x={nodes[node][0]} y={nodes[node][1]} stroke="#8000FF" dy="-8" dx="-5" fontSize="8px">{node}</SVGText>
                                            {/* <Path d={"M "+nodes[node][0]+" "+nodes[node][1]+" A 10 10 0 0 0 120 60"} stroke="black" /> */}
                                        </G>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                        {selectedNode.own && <Use href="#mypoint" x={nodes[selectedNode.own][0]-16} y={nodes[selectedNode.own][1]-30} />}
                        {selectedNode.fire && <Use href="#firepoint" x={nodes[selectedNode.fire][0]-17} y={nodes[selectedNode.fire][1]-25} />}

                        <Use href="#refugeChamber" x="255" y="330" />
                        <Use href="#refugeChamber" x="231" y="273" />
                        <Use href="#refugeChamber" x="227" y="215" />
                        <Use href="#refugeChamber" x="190" y="168.5" />
                        <Use href="#refugeChamber" x="161" y="214.5" />
                        <Use href="#refugeChamber" x="36" y="357" />
                        <Use href="#refugeChamber" x="28" y="366" />
                        <Use href="#refugeChamber" x="44" y="348" />
                        <Use href="#refugeChamber" x="56" y="336" />
                        <Use href="#refugeChamber" x="111" y="155" />
                        <Use href="#refugeChamber" x="137" y="120" />
                        <Use href="#refugeChamber" x="70" y="127" />
                        <Use href="#refugeChamber" x="81" y="162" />
                        <Use href="#refugeChamber" x="101" y="400" />
                        <Use href="#refugeChamber" x="71" y="431" />
                        <Use href="#refugeChamber" x="62" y="396" />
                        <Use href="#refugeChamber" x="40" y="470" />
                        <Use href="#refugeChamber" x="42" y="483" />
                        <Use href="#refugeChamber" x="44" y="455" />
                        <Use href="#refugeChamber" x="202" y="298" />
                        <Use href="#refugeChamber" x="122" y="295" />
                        <Use href="#refugeChamber" x="145" y="308" />
                        <Use href="#refugeChamber" x="222" y="455" />
                        <Use href="#refugeChamber" x="270" y="502" />
                    </Svg>
                    }
                    {/*<SvgCss xml={xml} width="100%" height="100%" style={styles.svg} />
                */}
                </View>
            </ReactNativeZoomableView>
            </View>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isShowOnlyMap ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=>setIsShowOnlyMap(!isShowOnlyMap)}
                value={isShowOnlyMap}
                style={styles.toggleSwitch}
            />
            <TouchableOpacity
                style={[styles.save_button,styles.flexRow,styles.alignCenter]}
            >
                <Icon name="exclamation-triangle" size={20} color="white"/>
                <Text style={[styles.marginLeft8,styles.save_button_text]}>Save Me</Text>
            </TouchableOpacity>
            <View style={styles.fire_selection_container}>

            </View>
        </Container>
    )
}

export default Home


