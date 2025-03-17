import React, { useState } from "react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaCheckCircle, FaExclamationTriangle, FaUser } from "react-icons/fa"

import AppCoinfig from "../../AppConfig"

import { IProfile } from "./types"
interface ProfileProps {
  data: IProfile
}

const Profile = ({ data }: ProfileProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [nombre, setNombre] = useState<string>(data.nombre)
  const [email, setEmail] = useState<string>(data.email)
  const [telefono, setTelefono] = useState<string>(data.telefono)
  const [direccion, setDireccion] = useState<string>(data.direccion)
  const [user_id, setUserId] = useState<number>(data.user_id)
  const handleNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value)
  }
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefono(e.target.value)
  }
  const handleDireccion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDireccion(e.target.value)
  }
  const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(parseInt(e.target.value))
  }

  const id = data?.id ? data.id : 0
  const method = id ? "PUT" : "POST"
  const handleSave = (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    setIsLoading(true)

    const url = AppCoinfig.API_BASE_URL + "profile/" + id
    const profile = { id, nombre, email, telefono, direccion, user_id }
    const sendProfile = async (profile: IProfile) => {
      const lstoken = localStorage.getItem(AppCoinfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
        body: JSON.stringify(profile),
      })
      const data = await response.json()
      if (response.status !== 200 || data.error) {
        setError(data.error)
      } else {
        setMessage("Profile saved")
      }
      setIsLoading(false)
    }
    sendProfile(profile)
  }

  return (
    <Form onSubmit={handleSave}>
      <Card>
        <Card.Header>
          <FaUser /> Profile
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={handleNombre}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Telefono"
                  value={telefono}
                  onChange={handleTelefono}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Direccion"
                  value={direccion}
                  onChange={handleDireccion}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formUserId">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="number"
                  value={user_id}
                  min={0}
                  readOnly={!!data.user_id}
                  onChange={handleUserId}
                />

                <Form.Text className="text-muted">
                  Integración con Corp ERP
                  {!!data.user_id && (
                    <small style={{ color: "red" }}>
                      <br />
                      User ID cannot be changed
                    </small>
                  )}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button type="submit" variant="primary">
            <FaCheckCircle /> Save
          </Button>
          {error && (
            <Alert variant="danger">
              <FaExclamationTriangle size={20} /> {error}
            </Alert>
          )}
          {message && (
            <Alert variant="success">
              <FaCheckCircle size={20} /> {message}
            </Alert>
          )}
          {isLoading && <Spinner animation="border" role="status" />}
        </Card.Footer>
      </Card>
    </Form>
  )
}

export default Profile
