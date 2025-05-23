import "bootswatch/dist/united/bootstrap.css"

import React from "react"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import AppConfig from "../../AppConfig"
import {
  FaEnvelope,
  FaIndustry,
  FaRunning,
  FaSuitcaseRolling,
} from "react-icons/fa"
import NavDropdown from "react-bootstrap/esm/NavDropdown"

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

  const user_id = sessionStorage.getItem("user_id")
  const role = sessionStorage.getItem("role")

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">{AppConfig.APP_NAME}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/listarticulos">Artículos</Nav.Link>
              <Nav.Link href="/listprofiles">Clientes</Nav.Link>
              <NavDropdown title="Other Apps" id="collasible-nav-dropdown">
                <NavDropdown.Item href="https://erp.mydomain.com/">
                  <FaIndustry /> Corp ERP
                </NavDropdown.Item>
                <NavDropdown.Item href="https://crm.mydomain.com/">
                  <FaSuitcaseRolling /> CRM
                </NavDropdown.Item>
                <NavDropdown.Item href="https://post.mydomain.com/">
                  <FaEnvelope /> Post Office
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {lstoken ? (
              <Nav>
                {user_id && (
                  <Nav>
                    <Nav.Link href={`/profile/${user_id}`}>
                      Profile: {role}
                    </Nav.Link>
                  </Nav>
                )}
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
