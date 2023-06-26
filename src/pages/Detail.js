import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import '../App.css';
import { Context1 } from './../App.js'
import { addCart } from '../store.js';
import { useDispatch } from "react-redux";


export default function Detail(props) {

  let {재고} = useContext(Context1)
  let dispatch = useDispatch()

  const [value, setValue] = useState('')

  useEffect(() => { // mount, update시 코드 실행, 즉, 렌더링 이 후에 실행
    // update는 마지막 인수의 의존성 배열에 변수를 넣고, 해당 변수가 수정될 때, 코드가 수행됨
    // 어려운 연산, 데이터 가져오는 작업, 타이머 기능등을 이 곳에 작성

    let a = setTimeout(() => { setStatus(false) }, 2000);
    let b = isNaN(value) ? alert('경고 : 숫자를 입력하세요') : null

    return () => { // clean up function으로, useEffect의 실행 전에 동작되는데, 주로 기존 코드를 제거 할 때 사용됨
      // ex) 서버에 데이터 요청하고 값을 받아오는 도중에 리렌더링이 된다면 문제가 될 수 있으므로, 기존 데이터 요청 작업을 제거한다.
      // clean up function은 mount시 실행 안되고, unmount시는 실행이 된다
      // 의존성 배열이 없다면 unmount시에만 실행이 되고, 의존성 배열이 있다면 update시에도 실행이 된다.
      // clearTimeout(a)
    }
  }, [value]) // 

  const [status, setStatus] = useState(true)
  const [count, setCount] = useState(0)
  const [탭, 탭변경] = useState(0)
  let {id} = useParams()

  if (id <props.상품정보.length) {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${props.상품정보[id].id + 1}.jpg`} alt="image not found" id="product_image" width="100%" /> 
          </div>
          <div className="col-md-6">
            {/* <h3><label style={{color:"white", backgroundColor:"red"}}> {isNaN(value) ? '숫자를 입력하세요' : null} </label></h3> */}
            {/* <input type="text" className="form-control text-center" id="number" onChange={ (event) => {setValue(event.target.value)} }/> */}
            <h4 className="pt-5">{props.상품정보[id].title}</h4>
            <p>{props.상품정보[id].content}</p>
            <p>{props.상품정보[id].price.toLocaleString()} 원</p>
            <button className="btn btn-danger" onClick={() => { dispatch(addCart( { id: props.상품정보[id].id, title: props.상품정보[id].title, count: 1 } )) }}>주문하기</button> 
          </div>
        </div>
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={() => {탭변경(0)}}>버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={() => {탭변경(1)}}>버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={() => {탭변경(2)}}>버튼2</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent 탭={탭} shoes={props.상품정보}/>
      </div> 
    )
  } else {
    return (
      <div>404 page not found</div>
    )
  }
}

function TabContent({탭, shoes}) {

  let [fade, setFade] = useState('')
  let {재고} = useContext(Context1)

  useEffect(() => {
    // react의 automatic batching 기능은 근접한 위치에 state 변경함수가 여럿 있다면 모아서 한 번만 변경되도록 하는 기능
    // 마지막 state변경 함수가 실행 될 때 re-rendering되게 해주는 기능으로 인해, setTimeout을 써야 한다.
    let a = setTimeout(() => {setFade('end') }, 100)

    return () => {
      clearTimeout(a)
      setFade('')
    }
  }, [탭])

  return <div className={'start' + fade}>
    {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>] [탭]}
    </div>
}

