import React from "react"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import AppConfig from "../../AppConfig"
import { FaRunning } from "react-icons/fa"

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
              <Nav.Link href="/listarticulos">Artículos</Nav.Link>
              <Nav.Link href="/person">New Person</Nav.Link>
            </Nav>
            {lstoken ? (
              <Nav>
                <Nav.Link eventKey={2} onClick={logout}>
                  <FaRunning /> Log Out
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
