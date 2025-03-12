import React from "react"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

import AppConfig from "../../AppConfig"

const Header = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const logout = () => {
    setModalVisible(true)
  }
  const logoutdefinitivo = () => {
    localStorage.removeItem(AppConfig.TOKEN_ITEM_NAME)
    window.location.href = "/"
  }
  const hideModal = () => {
    setModalVisible(false)
  }
  const lstoken = localStorage.getItem(AppConfig.TOKEN_ITEM_NAME)

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">{AppConfig.APP_NAME}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/list">List Persons</Nav.Link>
              <Nav.Link href="/person">New Person</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {lstoken ? (
              <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} onClick={logout}>
                  Log Out
                </Nav.Link>
              </Nav>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={modalVisible} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure? Do you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button onClick={logoutdefinitivo}>Log Out</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Header
