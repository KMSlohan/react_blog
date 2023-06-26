import { createSlice } from "@reduxjs/toolkit"


let user = createSlice({ // 하나의 state를 slice라고 부름
  name: 'user',
  initialState: { name : 'kim', age: 20 },
  reducers: {
    changeName(state) { // state는 기존의 state를 뜻함
      state.name = 'park'
    },
    increase(state, a) {
      state.age += a.payload
    }
  }
})

export let { changeName, increase } =  user.actions // actions에는 reducers에 정의한 state 변경 함수가 담겨 있음.

export default user