import { Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, SIZES, SHADOWS, FONTS } from "../constants"
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeActions } from '../store/like-slice';

export const CircleButton = ({ imgUrl, handlePress, ...props }) => {
    return (
        <TouchableOpacity style={{
            width: 40,
            height: 40,
            backgroundColor: COLORS.white,
            position: "absolute",
            borderRadius: SIZES.extraLarge,
            alignItems: "center",
            justifyContent: "center",
            ...SHADOWS.light,
            ...props
        }}
            onPress={handlePress}
        >
            <Image
                source={imgUrl}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
            />

        </TouchableOpacity>
    )
}

export const RectButton = ({ minWidth, fontSize, handlePress, ...props }) => {
    return (
        <TouchableOpacity style={{

            backgroundColor: COLORS.primary,
            borderRadius: SIZES.extraLarge,
            minWidth: minWidth,
            padding: SIZES.small,
            ...props
        }}
            onPress={handlePress}
        >
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: fontSize, color: COLORS.white, textAlign: "center" }}>Place a bid</Text>
        </TouchableOpacity>
    )
}

export const LikeButton = ({ onPress, image, id, price, creator, size, ...props }) => {
    const liked = useSelector(state => state.like.liked)
    const dispatch = useDispatch();
    const addToLike = () => {
        dispatch(likeActions.addToLike({
            image,
            id,
            price,
            creator
        }))
    }
    // const [liked, setLiked] = useState(false);

    // const fav = (e) => {

    //     if(!liked){
    //         setLiked(true)
    //         console.log(e)
            
    //     }else{
    //         setLiked(false)
    //     }
    // }
    return (
        <Pressable onPress={addToLike} style={{ position: "absolute", ...props }} >
            <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={size}
                color={liked ? "red" : "black"}
            />
        </Pressable>
    )
}
