import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Image,
    Text,
    TouchableWithoutFeedback
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
    Mask
} from 'react-native-svg'
import { Mixins, Spacing, Typography } from 'src/styles'
import { Toast } from 'src/components'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'
import FindShortestPath from './shortestPath'

const Splash = ({ navigation }) => {
    const [Colors, styles] = useTheme(style)

    const refugeChambers = [ '4' ]

    const nodes = {
        '1': [328.5, 477],
        '2': [304, 420],
        '3': [286.3, 377],
        '4': [267, 330],
        '5': [260, 312],
        '6': [239, 262],
        // Pink Path
        '13': [311, 367],
        '14': [292, 282],
        '15': [240, 299]
    }

    const paths = {
        '1_2': 'M 328.5 477 L 304 420',
        '2_3': 'M 304 420 L 286.3 377',
        '3_4': 'M 286.3 377 L 267 330',
        '4_5': 'M 267 330 L 260 312',
        '5_6': 'M 260 312 L 239 262',
        // Pink Path
        '3_13': 'M 286.3 377 L 311 367',
        '13_14': 'M 311 367 L 292 282',
        '14_15': 'M 292 282 L 256 295 M 250 296 L 240 299',
    }

    const graph = {
        '1': { '2': 10 },
        '2': { '3': 8, '1': 10 },
        '3': { '4': 8.5, '2': 8, '13': 4.5 },
        '4': { '5': 2.5, '3': 8.5 },
        '5': { '6': 9, '4': 2.5 },
        '6': { '5': 9 },
        '13': { '3': 4.5, '14': 15 },
        '14': { '13': 15, '15': 10 },
        '15': { '14': 10 }
    }

    const onNodePress = (node) => {
        const shortestPath = FindShortestPath(graph,node,refugeChambers[0])
        return Toast.show({ type: 'success', message: 'Node : ' + node + '\nPath to refuge chamber : ' + shortestPath.path.join(' > ') })
    }

    return (
        <Container style={styles.centerAll} isTransparentStatusBar={false}>
            <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={0.5}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                onZoomAfter={null}
            >

                <View style={styles.container}>
                    {<Image
                        style={styles.logo}
                        source={map}
                    />}
                    <Svg height="100%" width="100%" viewBox="0 0 350 600">
                        <Defs>
                            <G id="refugeChamber">
                                <Path
                                d="M 0,4 L 8,4 M 4,0 L 4,8"
                                stroke="#10772C"
                                strokeWidth="3"
                                />
                            </G>
                        </Defs>
                        <Path
                            d={`
                            ${paths['3_13']}
                            ${paths['13_14']}
                            ${paths['14_15']}
                            `}
                            stroke="#F42C71"
                            strokeWidth="1.1"
                        />
                        <Path
                            d={`
                            ${paths['1_2']}
                            ${paths['2_3']}
                            ${paths['3_4']}
                            ${paths['4_5']}
                            ${paths['5_6']}
                            `}
                            stroke="black"
                            strokeWidth="1.5"
                        />
                        {
                            Object.keys(nodes).map(node => {
                                return (
                                    <TouchableWithoutFeedback key={node} onPress={() => onNodePress(node)} >
                                        <G>
                                            <Circle cx={nodes[node][0]} cy={nodes[node][1]} r="4" fill="#0B0A0A" />
                                            <Circle cx={nodes[node][0]} cy={nodes[node][1]} r="3" fill="#FF6276" />
                                        </G>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }

                        <Use href="#refugeChamber" x="255" y="330" />

                    </Svg>
                    {/*<SvgCss xml={xml} width="100%" height="100%" style={styles.svg} />
                */}
                </View>
            </ReactNativeZoomableView>
        </Container>
    )
}

export default Splash


