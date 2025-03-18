import { useEffect, useState } from "react"

import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import AppConfig from "../../AppConfig"
import { FaExclamationTriangle } from "react-icons/fa"

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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")

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
  }, [token, code])

  if (isLoading) {
    return <Spinner animation="border" role="status" />
  }
  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>
          <FaExclamationTriangle /> {error}
        </p>
      </Alert>
    )
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
    const redirect_uri = encodeURIComponent(AppConfig.REDIRECT_URI)
    return (
      <>
        <Alert variant="danger">
          <Alert.Heading>Authentication error</Alert.Heading>
          <p>
            <FaExclamationTriangle /> Para poder usar esta aplicación, debes
            autenticarte.
          </p>
          <a
            href={`${AppConfig.AUTH_LINK}?client_id=${AppConfig.CLIENT_ID}&redirect_uri=${redirect_uri}`}
          >
            Continuar
          </a>
        </Alert>
      </>
    )
  }

  return <>{children}</>
}

export default AuthContainer
