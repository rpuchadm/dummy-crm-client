import React, { useState } from "react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaSuitcaseRolling,
  FaUser,
} from "react-icons/fa"

import AppCoinfig from "../../AppConfig"
import { IArticulo } from "./types"
interface ArticuloProps {
  articulo: IArticulo
}

const Articulo = ({ articulo }: ArticuloProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [nombre, setNombre] = useState<string>(articulo.nombre)
  const [descripcion, setDescripcion] = useState<string>(articulo.descripcion)
  const [precio, setPrecio] = useState<number>(articulo.precio)
  const [stock, setStock] = useState<number>(articulo.stock)
  const handleNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value)
  }
  const handleDescripcion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescripcion(e.target.value)
  }
  const handlePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecio(parseFloat(e.target.value))
  }
  const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStock(parseInt(e.target.value))
  }

  const id = articulo?.id ? articulo.id : 0
  const method = id ? "PUT" : "POST"
  const handleSave = (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    setIsLoading(true)

    const url = AppCoinfig.API_BASE_URL + "articulo/" + id
    const articulo = { id, nombre, descripcion, precio, stock }
    const sendArticulo = async (articulo: IArticulo) => {
      const lstoken = localStorage.getItem(AppCoinfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
        body: JSON.stringify(articulo),
      })
      const data = await response.json()
      if (response.status !== 200 || data.error) {
        setError(data.error)
      } else {
        setMessage("Articulo saved")
      }
      setIsLoading(false)
    }
    sendArticulo(articulo)
  }

  return (
    <Form onSubmit={handleSave}>
      <Card>
        <Card.Header>
          <FaSuitcaseRolling /> Articulo
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Enter Nombre"
                    value={nombre}
                    onChange={handleNombre}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formDescripcion">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    placeholder="Enter Descripcion"
                    value={descripcion}
                    onChange={handleDescripcion}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPrecio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    placeholder="Enter Precio"
                    value={precio}
                    onChange={handlePrecio}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formStock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    placeholder="Enter Stock"
                    value={stock}
                    onChange={handleStock}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>
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
          <Button
            disabled={!!(isLoading || message || error)}
            onClick={handleSave}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : <FaUser />}{" "}
            {articulo.id ? <>Update</> : <>Create</>}
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  )
}

export default Articulo
