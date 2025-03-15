import { useEffect, useState } from "react"

import dayjs from "dayjs"

import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaEnvelope, FaPhone, FaSuitcaseRolling } from "react-icons/fa"

import AppCoinfig from "../../AppConfig"
import { IArticulo } from "./types"

const ListArticulos = () => {
  const [articulos, setArticulos] = useState<IArticulo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = AppCoinfig.API_BASE_URL + "articulos"
    const fetchArticulos = async () => {
      const lstoken = localStorage.getItem(AppCoinfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        headers: {
          Authorization: `Bearer ${lstoken}`,
        },
      })
      const data = await response.json().then((data) => data as IArticulo[])
      setArticulos(data)
      setLoading(false)
    }

    fetchArticulos()
  }, [])

  return (
    <>
      <h1>
        <FaSuitcaseRolling /> List Articulos
      </h1>
      <p style={{ marginTop: "20px", textAlign: "right" }}>
        <a href="/articulo/0">New Articulo</a>
      </p>
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <ListGroup>
          {articulos.map((articulo) => (
            <ListGroup.Item key={articulo.id}>
              <Card>
                <Card.Header>
                  <FaEnvelope /> Arituclo #{articulo.id} -{" "}
                  {dayjs(articulo.created_at).format("DD/MM/YYYY HH:mm")}
                  <a
                    href={`/articulo/${articulo.id}`}
                    style={{ float: "right" }}
                  >
                    Edit
                  </a>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>{articulo.nombre}</Card.Title>
                      <Card.Text>{articulo.descripcion}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Title>Price</Card.Title>
                      <Card.Text>{articulo.precio}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Title>Stock</Card.Title>
                      <Card.Text>{articulo.stock}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  )
}

export default ListArticulos
