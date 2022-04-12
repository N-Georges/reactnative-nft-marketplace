import { useState, useContext } from "react"
import { View, SafeAreaView, FlatList } from "react-native"
import { COLORS, NFTData } from "../constants"
import { NFTCard, HomeHeader, FocusedStatusBar } from "../components"
import { LikeContext } from '../components/LikeContext';


const Home = ({...props}) => {
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
// define state variable to store favorite items
const [favoriteList, setFavoriteList] = useState([]);

// function to add an item to favorite list
const onFavorite = restaurant => {
  setFavoriteList([...favoriteList, restaurant]);
};

// function to remove an item from favorite list
const onRemoveFavorite = restaurant => {
  const filteredList = favoriteList.filter(
    item => item.id !== restaurant.id
  );
  setFavoriteList(filteredList);
};

// function to check if an item exists in the favorite list or not
const ifExists = (restaurant) => {
  if (favoriteList.filter(item => item.id === restaurant.id).length > 0) {
    return true;
  }
  return false;
};

  // like context
  const [contextValueLike, setContextLike] = useContext(LikeContext)
  const [liked, setLiked] = useState(false);

  console.log(contextValueLike);
  console.log(liked);
  const addToLike = (e) => {
    if(!liked){
      setLiked(true)
      
  }else{
      setLiked(false)
  }
    setContextLike(oldValues => {
      const productIndex = oldValues.findIndex(
        val => val.e === e
      )
      let updatedLikeItems = []

      // Si le produit existe déjà dans le panier, alors mettez à jour la quantité
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
        //Sinon, ajoutez l'élément à la fin du tableau
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
            renderItem={({ item }) => <NFTCard data={item} addToLike={() => addToLike(item)}  />}

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