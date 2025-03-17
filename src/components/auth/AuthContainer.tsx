import { useEffect, useState } from "react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import AppConfig from "../../AppConfig"
import { FaExclamationTriangle } from "react-icons/fa"

interface AuthFormProps {
  token: string
  error: string
  isLoading: boolean
  handleToken: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => Promise<void>
}

const AuthForm = ({
  token,
  error,
  isLoading,
  handleToken,
  handleSubmit,
}: AuthFormProps) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col>
            <h1>Unauthorized</h1>
            <p>
              In order to access this page, you need to provide a valid token.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicToken">
              <Form.Label>Token</Form.Label>
              <Form.Control
                value={token}
                onChange={handleToken}
                type="text"
                placeholder="Enter token"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {error && (
              <>
                <Alert variant="danger">
                  <FaExclamationTriangle size={25}> </FaExclamationTriangle>{" "}
                  {error}.
                </Alert>
              </>
            )}
            <Button
              variant="primary"
              type="submit"
              disabled={!token || isLoading}
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

interface FetchTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  // refresh_token: string
  // scope: string
  // created_at: number
}

interface AuthContainerProps {
  children: React.ReactNode
}

const AuthContainer = ({ children }: AuthContainerProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string>(
    localStorage.getItem(AppConfig.TOKEN_ITEM_NAME) || ""
  )
  const [isLoading, setIsLoading] = useState(true)
  const [refetch, setRefetch] = useState<number>(0)
  const [error, setError] = useState<string>("")
  const handleToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value)
  }
  const handleSubmit = async (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    localStorage.setItem(AppConfig.TOKEN_ITEM_NAME, token)
    setRefetch((prev) => prev + 1)
  }

  const code = new URLSearchParams(window.location.search).get("code")

  useEffect(() => {
    const fetchTokenFromCode = async () => {
      const url = AppConfig.API_BASE_URL + "authback/" + code
      const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status == 200) {
        const data = (await response.json()) as FetchTokenResponse
        if (data.access_token) {
          localStorage.setItem(AppConfig.TOKEN_ITEM_NAME, data.access_token)
        }
        if (data.expires_in) {
          const expires = new Date().getTime() + data.expires_in * 1000
          localStorage.setItem(
            AppConfig.TOKEN_ITEM_NAME + "_expires",
            expires.toString()
          )
        }
      } else {
        setError(
          "Error fetching token from code, status: " +
            response.status +
            " body: " +
            (await response.text())
        )
      }
      setIsLoading(false)
    }
    const fetchAuth = async () => {
      const url = AppConfig.API_BASE_URL + "auth"
      const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = (await response.json()) as { status: string; error: string }
      if (data.status === "success") {
        setToken(token)
        setIsAuthenticated(true)
      } else {
        if (isAuthenticated) {
          setIsAuthenticated(false)
        }
        if (data.error) {
          setError(data.error)
        } else {
          setError("An error occurred")
        }
        localStorage.removeItem(AppConfig.TOKEN_ITEM_NAME)
        localStorage.removeItem(AppConfig.TOKEN_ITEM_NAME + "_expires")
      }
      setIsLoading(false)
    }

    if (token) {
      console.log("AuthContainer token:", token)
      setIsLoading(true)
      fetchAuth()
    } else if (code) {
      console.log("AuthContainer code:", code)
      setIsLoading(true)
      fetchTokenFromCode()
    }
  }, [token, code, refetch])

  if (isLoading) {
    return <Spinner animation="border" role="status" />
  }
  if (!isAuthenticated) {
    if (code) {
      return (
        <>
          {" "}
          <h1>AuthBack</h1>
          code: {code}
        </>
      )
    }
    return (
      <>
        <AuthForm {...{ token, isLoading, error, handleToken, handleSubmit }} />
      </>
    )
  }

  return <>{children}</>
}

export default AuthContainer
