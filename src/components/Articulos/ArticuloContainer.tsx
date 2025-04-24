import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Alert from "react-bootstrap/Alert"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaExclamationTriangle } from "react-icons/fa"

import AppCoinfig from "../../AppConfig"
import { IArticulo, IArticuloDatos } from "./types"
import Articulo from "./Articulo"
import IssuesContainer from "../Issues/IssuesContainer"

const ArticuloContainer = ({}) => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<IArticuloDatos | null>({
    articulo: {
      id: 0,
      nombre: "",
      descripcion: "",
      precio: 0,
      stock: 0,
    } as IArticulo,
    issue_requests: [],
  })
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const url = AppCoinfig.API_BASE_URL + "articulo/" + id
    const fetchArticulo = async () => {
      const lstoken = localStorage.getItem(AppCoinfig.TOKEN_ITEM_NAME)
      const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        headers: {
          Authorization: `Bearer ${lstoken}`,
        },
      })
      const data = await response.json()

      if (response.status !== 200 || data.error) {
        setError(data.error)
      } else {
        setData(data as IArticuloDatos)
      }
      setIsLoading(false)
    }
    const iid = id ? parseInt(id) : 0
    if (iid) {
      setIsLoading(true)
      fetchArticulo()
    }
  }, [id])

  return (
    <Container>
      <Row>
        <Col>
          {isLoading || !data ? (
            <Spinner animation="border" role="status" />
          ) : (
            <Articulo data={data.articulo} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {error && (
            <Alert variant="danger">
              <FaExclamationTriangle /> {error}
            </Alert>
          )}
        </Col>
      </Row>
      {id && (
        <Row>
          <Col>
            <IssuesContainer type="articulo" id={parseInt(id)} />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default ArticuloContainer
