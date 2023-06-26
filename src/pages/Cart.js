import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from './../store/userSlice.js';
import { increaseCount } from '../store.js';


function Cart() {

  let state = useSelector( state => state )
  let dispatch = useDispatch()

  return (
    <div>

      {state.user.name}의 장바구니 {state.user.age} <button onClick={() => { dispatch(increase(10)) }}>버튼</button>

      <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>수량변경</th>
        </tr>
      </thead>
      <tbody>
        {state.product.map((item, i) => {
          return (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.count}</td>
              <td>
                <button onClick={() => { dispatch(increaseCount(item.id)) }}>+</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    </div>
  )
}

export default Cart