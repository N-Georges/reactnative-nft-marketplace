import React from "react";
import { View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES, SHADOWS } from "../constants"
import { RectButton, LikeButton } from './Button'
import { SubInfo, EthPrice, NFTTitle } from './SubInfo'
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { likeActions } from '../store/like-slice';


const NFTCard = ({ image, name, price, creator, id }) => {

    const liked = useSelector(state => state.like.liked)
    const dispatch = useDispatch();
    const addToLike = () => {
        dispatch(likeActions.addToLike({
            id,
            image,
            price,
            creator,
            name,
        }))
    }
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
                    source={{ uri: 'https://img.phonandroid.com/2021/11/bitcoin-record.jpg' }}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: SIZES.font,
                        borderTopRightRadius: SIZES.font,
                    }}
                />
                
                <Pressable onPress={() => addToLike()} style={{ position: "absolute" }} right={10} top={10}>
                    <MaterialCommunityIcons
                        name={liked ? "heart" : "heart-outline"}
                        size={32}
                        color={liked ? "red" : "black"}
                    />
                </Pressable>

            </View>

            <SubInfo />
            <View style={{ width: "100%", padding: SIZES.font }}>
                <NFTTitle
                    name={name}
                    creator={creator}
                />

                <View style={{ marginTop: SIZES.font, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <EthPrice price={price} />
                    <RectButton
                        minWidth={120}
                        fontSize={SIZES.font}
                    // handlePress={() => navigation.navigate("Details", { data })}
                    />
                </View>
            </View>
        </View>
    )
}

export default NFTCard
