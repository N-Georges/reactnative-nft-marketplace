import { useState, useContext } from "react"
import { View, SafeAreaView, FlatList } from "react-native"
import { COLORS, NFTData } from "../constants"
import { NFTCard, HomeHeader, FocusedStatusBar } from "../components"
import { LikeContext } from "../components/LikeContext"

const Like = () => {
  const [contextValueLike, setContextLike] = useContext(LikeContext)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={contextValueLike}
            renderItem={({ item }) => <NFTCard data={item.e} style={{ height: 100 }} />}
            keyExtractor={(item) => item.e.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1,
        }}>
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Like