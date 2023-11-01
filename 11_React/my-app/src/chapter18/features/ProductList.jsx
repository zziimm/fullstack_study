import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushItem, selectProductList } from './productSlice';

function ProductSlice(props) {
  const [itemName, setItemName] = useState('값');

  // const it = useSelector(state => state.item.item);
  // slice에서 함수로 만든 후 export 하고 가져오면 정리 가능
  const it = useSelector(selectProductList);
  console.log(it);

  const dispatch = useDispatch();


  const handleAddProduct = () => {
    dispatch(pushItem(itemName))
    setItemName('')
  }

  return (
    <>
      <p>
        상품 추가:
        <input 
          type="text" 
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleAddProduct();
            }
          }}
        />
        <button
          type='button'
          onClick={handleAddProduct}
        >
          추가
        </button>
      </p>
      <p>상품 목록</p>
      <ul>
        {it.map((it, index) => {
          return <li key={index}>{it}</li>
        })}
      </ul>
    </>
  );
}

export default ProductSlice;  

// default로 내보내면 import 할때 {} 못침 대신 마음대로 작명할 수 있음(import할때)
// 안쓰면 {} 꼭쳐야하고 못바꿈
