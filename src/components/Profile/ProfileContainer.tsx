import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Alert from "react-bootstrap/Alert"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaExclamationTriangle } from "react-icons/fa"

import AppCoinfig from "../../AppConfig"
import { IArticulo, IProfile } from "./types"
import Profile from "./Profile"

const ProfileContainer = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<IProfile | null>({
    id: 0,
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    fecha_registro: "",
    user_id: 0,
  })
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const url = AppCoinfig.API_BASE_URL + "profile/" + id
    const fetchProfile = async () => {
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
        setData(data as IProfile)
      }
      setIsLoading(false)
    }
    const iid = id ? parseInt(id) : 0
    if (iid) {
      setIsLoading(true)
      fetchProfile()
    }
  }, [id])

  return (
    <Container>
      <Row>
        <Col>
          {isLoading || !data ? (
            <Spinner animation="border" role="status" />
          ) : (
            <Profile data={data} />
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
    </Container>
  )
}

export default ProfileContainer
