import { useState, useContext } from "react"
import { View, SafeAreaView, FlatList } from "react-native"
import { COLORS, NFTData } from "../constants"
import { NFTCard, HomeHeader, FocusedStatusBar } from "../components"
import { LikeContext } from '../components/LikeContext';


const Home = () => {
  const [nftData, setNftData] = useState(NFTData)

  const handleSearch = (value) => {
    if (value.length === 0) {
      setNftData(NFTData);

    }

    const filteredData = NFTData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setNftData(NFTData);
    } else {
      setNftData(filteredData);
    }
  };

  // like context
  const [contextValueLike, setContextLike] = useContext(LikeContext)
  console.log(contextValueLike);
  const addToLike = (e) => {
    setContextLike(oldValues => {
      const productIndex = oldValues.findIndex(
        val => val.e === e
      )

      let updatedLikeItems = []

      // If the product already exists in cart, then update the quantity
      if (productIndex !== -1) {
        updatedLikeItems = [
          ...oldValues.slice(0, productIndex),
          {
            e,
            count: oldValues[productIndex].count + 1,
          },
          ...oldValues.slice(productIndex + 1),
        ]
      } else {
        //Otherwise add the item to the end of the array
        updatedLikeItems = [...oldValues, { e, count: 1 }]
      }



      return updatedLikeItems
    })
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={nftData}
            renderItem={({ item }) => <NFTCard data={item} addToLike={() => addToLike(item)} />}

            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
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
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home