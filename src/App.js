import { useState, props, useEffect, createContext } from 'react';
import './App.css';
import { Container, Nav, Navbar, Row, Col, NavDropdown }  from 'react-bootstrap';
import data from './data.js'
import Detail from './pages/Detail.js'
import Cart from './pages/Cart.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'

export let Context1 = createContext()

function App() {

  const [shoes, setShoes] = useState(data)
  const [count, setCount] = useState(1)
  let [재고] = useState([10, 11, 12])

  let naviagte = useNavigate()

  useEffect(() => {
    
  
    return () => {
      
    }
  }, [shoes])
  

  return (
    <div className="App">

      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">REACT SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { naviagte('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => { naviagte('/cart')}}>Cart</Nav.Link>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="About"
              menuVariant="dark">
              <NavDropdown.Item onClick={() => { naviagte('/about/member')}}>member</NavDropdown.Item>
              <NavDropdown.Item onClick={() => { naviagte('/about/location')}}>location</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Event"
              menuVariant="dark">
              <NavDropdown.Item onClick={() => { naviagte('/event/one')}}>one</NavDropdown.Item>
              <NavDropdown.Item onClick={() => { naviagte('/event/two')}}>two</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'></div>

      <Routes>
        <Route path="/" element={ 
          <>
            <div className="container">
              <div className="row">
                {shoes.map((item) => {
                  return (
                    <Product 상품정보={ item } />
                  )
                })}
              </div>
            </div>
            {/** Ajax 쓰는 방법 3가지
             * 1. XMLHttpRequest
             * 2. fetch()
             * 3. axios 외부 라이브러리
             */}
            {count < 3 ? <button onClick={(event) => {
              axios.get('https://codingapple1.github.io/shop/data'+(count + 1)+'.json')
              .then((result) => { 
                setShoes([...shoes, ...result.data])
                setCount(count + 1)
              })      
              .catch((error) => {
                console.log(error)
              })  
            }} >더보기</button>
          : null}
          </>
          } />
        <Route path="/detail/:id" element={
          <Context1.Provider value={{재고, shoes}}><Detail 상품정보={shoes}/></Context1.Provider> }
        />
        <Route path="/cart" element={ <Cart /> }/>
        {/** Nested Route
         * 장점 1: route 작성이 간단해진다.
         * 2 : element가 2개가 보여진다. 상위 컴포넌트의 지정된 위치(Outlet 컴포넌트)에 하위 컴포넌트가 보여진다.
         * 
         * 쓰임새
         * 1. 여러 유사한 페이지가 필요할 때 사용
         */}
        <Route path="/about" element={ <About/> } >  
          <Route path="member" element={ <div>멤버들</div> } />
          <Route path="location" element={ <div>회사위치</div> } />
        </Route>
        <Route path="/event" element={ <Event /> } >
          <Route path="one" element={ <div>첫 주문시 양배추즙 서비스</div> } />
          <Route path="two" element={ <div>생일 기념 쿠폰 받기</div> } />
        </Route>


        <Route path="*" element={ <div>404 page not found</div> } />
      </Routes>
    </div>
  );
}

export default App;

function Product(props) {

  return (
    <div className="col-md-4" onClick={ () => {window.location.pathname="/detail/"+props.상품정보.id+""} }>
      <img src={`https://codingapple1.github.io/shop/shoes${props.상품정보.id + 1}.jpg`} alt="image not found" id="product_image" width="80%" /> 
      <h4>{props.상품정보.title}</h4>
      <p>{props.상품정보.content}</p>
      <p>{props.상품정보.price.toLocaleString()} 원</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h2>오늘의 이벤트</h2>
      <Outlet></Outlet>
    </div>
  )
}
