import { View, SafeAreaView, FlatList } from "react-native"
import { COLORS } from "../constants"
import { NFTCard, FocusedStatusBar } from "../components"
import { useSelector } from "react-redux"


const Like = () => {
  const likeItems = useSelector(state => state.like.itemsList)
  console.log(likeItems);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={likeItems}
            
            renderItem={({ item }) => <NFTCard 
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                creator={item.creator}
              style={{ height: 100 }} />}
              
            keyExtractor={(index) => index.id}
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