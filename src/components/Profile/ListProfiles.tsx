import { useEffect, useState } from "react"

import dayjs from "dayjs"

import Alert from "react-bootstrap/Alert"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import {
  FaEnvelope,
  FaExclamationTriangle,
  FaPhone,
  FaUser,
} from "react-icons/fa"

import AppCoinfig from "../../AppConfig"
import { IProfile } from "./types"

const ListProfiles = () => {
  const [profiles, setProfiles] = useState<IProfile[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const url = AppCoinfig.API_BASE_URL + "profiles"
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
      const data = await response.json().then((data) => data as IProfile[])
      setProfiles(data)
      setIsLoading(false)
    }
    fetchArticulos()
  }, [])

  return (
    <>
      <h1>
        <FaUser /> Clientes
      </h1>
      <p style={{ marginTop: "20px", textAlign: "right" }}>
        <a href="/profile/0">New Profile</a>
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
              <Row xs={1} md={2} lg={3} className="g-4">
                {profiles.map((profile) => (
                  <Col key={profile.id}>
                    <Card>
                      <Card.Header>
                        {profile.nombre} -
                        {profile.fecha_registro && (
                          <small>
                            {dayjs(profile.fecha_registro).format("DD/MM/YYYY")}
                          </small>
                        )}
                        <a
                          href={`/profile/${profile.id}`}
                          style={{ float: "right" }}
                        >
                          Edit
                        </a>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>
                            <Card.Title>
                              <FaEnvelope />{" "}
                            </Card.Title>
                            <Card.Text>{profile.email}</Card.Text>
                          </Col>
                          <Col>
                            <Card.Title>
                              <FaPhone />
                            </Card.Title>
                            <Card.Text>{profile.telefono}</Card.Text>
                          </Col>
                          <Col>
                            <Card.Text>{profile.direccion}</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </>
      )}
    </>
  )
}

export default ListProfiles
