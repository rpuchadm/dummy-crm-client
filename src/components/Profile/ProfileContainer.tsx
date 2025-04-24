import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Alert from "react-bootstrap/Alert"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { FaExclamationTriangle } from "react-icons/fa"

import AppCoinfig from "../../AppConfig"
import { IProfile } from "./types"
import Profile from "./Profile"
import { Card } from "react-bootstrap"
import IssuesContainer from "../Issues/IssuesContainer"

const ProfileContainer = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<IProfile | null>(null)
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
            <>
              <Profile data={data.cliente} />
              <br />
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {error && (
            <>
              <Alert variant="danger">
                <FaExclamationTriangle /> {error}
              </Alert>
              <br />
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Integración de CRM con ERP</Card.Title>
            </Card.Header>
            <Card.Body>
              {data?.corp_user?.person?.id && (
                <>
                  id: {data.corp_user.person.id} <br />
                  dni: {data.corp_user.person.dni} <br />
                  nombre: {data.corp_user.person.nombre} <br />
                  apellidos: {data.corp_user.person.apellidos} <br />
                  email: {data.corp_user.person.email} <br />
                  telefono: {data.corp_user.person.telefono} <br />
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {id && (
        <Row>
          <Col>
            <IssuesContainer type="cliente" id={parseInt(id)} />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default ProfileContainer
