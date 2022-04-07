import React from "react";
import { View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES, SHADOWS } from "../constants"
import { RectButton, LikeButton } from './Button'
import { SubInfo, EthPrice, NFTTitle } from './SubInfo'

const NFTCard = ({ data }) => {
    const navigation = useNavigation();

    return (
        <View style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.base,
            ...SHADOWS.dark
        }}>
            <View style={{ width: "100%", height: 250, position: "relative" }}>
                <Image
                    source={data.image}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: SIZES.font,
                        borderTopRightRadius: SIZES.font,
                    }}
                />
                <LikeButton right={10} top={10} size={32}/>
            </View>

            <SubInfo />
            <View style={{ width: "100%", padding: SIZES.font }}>
                <NFTTitle
                    title={data.name}
                    subTitle={data.creator}
                    titleSize={SIZES.large}
                    subTitleSize={SIZES.small}
                />

                <View style={{ marginTop: SIZES.font, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <EthPrice price={data.price} />
                    <RectButton
                        minWidth={120}
                        fontSize={SIZES.font}
                        handlePress={() => navigation.navigate("Details", { data })}
                    />
                </View>
            </View>
        </View>
    )
}

export default NFTCard