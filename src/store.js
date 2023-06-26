import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './store/userSlice.js'


let stock = createSlice({ // 하나의 state를 slice라고 부름
  name: 'stock',
  initialState: [10, 11, 12]
})

let product = createSlice({
  name: 'product',
  initialState: [
    {
      id : 0,
      title : "White and Black",
      count : 2,
    },
  
    {
      id : 1,
      title : "Red Knit",
      count : 1,
    },
  
    {
      id : 2,
      title : "Grey Yordan",
      count : 1,
    }
  ],
  reducers: {
    increaseCount(state, a) {
      // alert("action : ", action.payload)
      // let { index, value } = action
      // state[index].count += value.payload
      state[a.payload].count++
    },
    addCart(state, a) {
      state.push(a.payload)
    }
  }
})

export let { increaseCount, addCart } = product.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    stock: stock.reducer,
    product: product.reducer
  }
})