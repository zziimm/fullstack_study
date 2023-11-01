import React from 'react';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap CSS 추가 (import하는거 중요!)
import { Outlet } from 'react-router-dom';

function Layout(props) {
  return (
    <>
      {/* 헤더 영역: 네비게이션 영역 */}
      <header>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#">지민지</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link>홈</Nav.Link>
                <Nav.Link>장바구니</Nav.Link>
              </Nav>
            </Container>
        </Navbar>
      </header>

      <Outlet />

      {/* <footer>푸터 영역</footer> */}
    </>
  );
}

export default Layout;