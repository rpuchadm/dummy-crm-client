import { useEffect, useState } from "react"

import dayjs from "dayjs"

import Alert from "react-bootstrap/Alert"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaExclamationTriangle, FaSuitcaseRolling } from "react-icons/fa"

import AppCoinfig from "../../AppConfig"
import { IArticulo } from "./types"

const ListArticulos = () => {
  const [articulos, setArticulos] = useState<IArticulo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const url = AppCoinfig.API_BASE_URL + "articulos"
    setIsLoading(true)
    const fetchArticulos = async () => {
      const lstoken = localStorage.getItem(AppCoinfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        headers: {
          Authorization: `Bearer ${lstoken}`,
        },
      })
      if (!response.ok) {
        setError(new Error(`HTTP error! status: ${response.status}`))
      }
      const data = await response.json().then((data) => data as IArticulo[])
      setArticulos(data)
      setIsLoading(false)
    }
    fetchArticulos()
  }, [])

  return (
    <>
      <h1>
        <FaSuitcaseRolling /> Artículos
      </h1>
      <p style={{ marginTop: "20px", textAlign: "right" }}>
        <a href="/articulo/0">New Artículo</a>
      </p>
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <>
          {error ? (
            <Alert>
              <FaExclamationTriangle /> Error: {error.message}
            </Alert>
          ) : (
            <>
              {!articulos.length ? (
                <Alert>
                  <FaExclamationTriangle /> No hay artículos
                </Alert>
              ) : (
                <ListGroup>
                  {articulos.map((articulo) => (
                    <ListGroup.Item key={articulo.id}>
                      <Card>
                        <Card.Header>
                          <FaSuitcaseRolling /> Artículo #{articulo.id} -{" "}
                          {articulo.fecha_creacion && (
                            <>
                              {dayjs(articulo.fecha_creacion).format(
                                "DD/MM/YYYY"
                              )}
                            </>
                          )}
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
          )}
        </>
      )}
    </>
  )
}

export default ListArticulos
