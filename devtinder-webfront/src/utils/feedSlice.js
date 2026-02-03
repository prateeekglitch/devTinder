import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState : null,
    reducers:{
        addFeed: (state,action)=> action.payload,
        removeFeed: ()=>null,
        removeUserFromFeed :(state, action)=>{
            const newFeed = state.filter((i)=>i._id!=action.payload);
            return newFeed;  
        }
    },
})

export const {addFeed, removeFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;