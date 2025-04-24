import { useState } from "react"

import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Spinner from "react-bootstrap/Spinner"
import { FaCheckCircle, FaExclamationTriangle, FaPlus } from "react-icons/fa"
import AppConfig from "../../AppConfig"

interface IssueFormProps {
  type: string
  id: number
}
const IssueForm = ({ type, id }: IssueFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const handleSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  const handleSave = (
    ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault()
    setIsLoading(true)

    const url = AppConfig.API_BASE_URL + "issue/" + type + "/" + id
    const issue = { subject, description }
    const sendIssue = async (issue: any) => {
      const lstoken = localStorage.getItem("token")
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
        body: JSON.stringify(issue),
      })
      if (response.status !== 200 && response.status !== 201) {
        setError("Error creating issue")
      } else {
        setMessage("Issue created successfully")
      }
      setIsLoading(false)
    }
    sendIssue(issue)
  }
  return (
    <Form>
      <Card>
        <Card.Header>
          <strong>Create New Issue </strong>
          {type === "articulo" ? (
            <span>related to this Articulo</span>
          ) : (
            <span>related to this Usuario</span>
          )}
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={handleSubject}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={handleDescription}
            />
          </Form.Group>
        </Card.Body>
        <Card.Footer>
          {isLoading && <Spinner animation="border" role="status" />}
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
            {isLoading ? <Spinner animation="border" size="sm" /> : <FaPlus />}{" "}
            Create Issue
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  )
}

interface IssuesContainerProps {
  type: string
  id: number
}

const IssuesContainer = ({ type, id }: IssuesContainerProps) => {
  return (
    <>
      <br />
      <br />
      <strong>List Issues</strong>
      <br />
      type: {type} id: {id}
      <hr />
      <IssueForm {...{ type, id }} />
    </>
  )
}

export default IssuesContainer
