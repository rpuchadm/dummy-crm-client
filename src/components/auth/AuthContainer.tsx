import { useEffect, useState } from "react"

import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import AppConfig from "../../AppConfig"
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"

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
  const [sesionIniciada, setSesionIniciada] = useState(false)
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
        const redirect = localStorage.getItem(
          AppConfig.TOKEN_ITEM_NAME + "_redirect"
        )
        if (redirect) {
          localStorage.removeItem(AppConfig.TOKEN_ITEM_NAME + "_redirect")
          window.location.href
        } else {
          setSesionIniciada(true)
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
      const data = (await response.json()) as {
        status: string
        error: string
        user_id?: number
        attributes?: Record<string, string>
      }
      if (data.status === "success") {
        setToken(token)
        setIsAuthenticated(true)
        if (data.user_id) {
          sessionStorage.setItem("user_id", data.user_id.toString())
        }
        if (data.attributes && Object.keys(data.attributes).length > 0) {
          Object.keys(data.attributes).forEach((key) => {
            const value = data.attributes ? data.attributes[key] : ""
            console.log("fetchAuth attributes key:", key, "value:", value)
            if (value && typeof value === "string") {
              sessionStorage.setItem(key, value)
              console.log("sessionStorage.setItem:", key, value)
            }
          })
        }
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
        if (window.location.pathname !== "/") {
          const uri = window.location.pathname + window.location
          localStorage.setItem(AppConfig.TOKEN_ITEM_NAME + "_redirect", uri)
        }
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
  if (sesionIniciada) {
    return (
      <Alert variant="success">
        <Alert.Heading>Sesión iniciada</Alert.Heading>
        <p>
          <FaCheckCircle /> La sesion ha sido iniciada correctamente.
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
