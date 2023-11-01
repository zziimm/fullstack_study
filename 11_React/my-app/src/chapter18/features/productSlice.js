import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  item: []
}
console.log(initialState);

export const items = createSlice({
  name: 'item',
  initialState,
  reducers: {
    // pushItem: (state, action) => {
    //   console.log(action);
    //   state.item.push(action.payload)
    // }

    // action 으로만 쓰면 어떤 값을 가져오는지 모르니까
    // action을 구조 분해 할당을 통해서 별칭을 붙여줄 수 있음
    pushItem: (state, { payload: item99 }) => {
      state.item.push(item99)
    }
  }
});


export const { pushItem } = items.actions;

// 매번 길게 쓸 수 없으니까 함수로 export해서 받을때도
// const ?? = useSelector(selectProductList);
// 이런 식으로 받을 수 있음 
export const selectProductList = state => state.item.item



export default items.reducer;