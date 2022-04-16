import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
    name: 'like',
    initialState: {
        itemsList: [],
        liked: false
    },

    reducers: {
        addToLike(state, action) {
            const newItem = action.payload
            // console.log(newItem);
            // on regarde si item est deja existant
            const existingItem = state.itemsList.find(
                (item) => item.id === newItem.id
            );
            // trouve l'index de chaque element contenu dans itemList
            const indexOfObject = state.itemsList.findIndex(object => {
                return object.id === newItem.id;
            });
            console.log(indexOfObject);
            if (existingItem) {
                state.itemsList.splice(indexOfObject, 1)
                state.liked = false

            } else {
                state.itemsList.push({
                    id: newItem.id,
                    image: newItem.image,
                    name: newItem.name,
                    price: newItem.price,
                    creator: newItem.creator,
                });
                state.liked = true
            }
        },

    }
})

export const likeActions = likeSlice.actions;
export default likeSlice;