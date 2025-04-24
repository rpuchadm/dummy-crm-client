import { useState } from "react"

import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

const IssueForm = () => {
  const [subject, setSubject] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const handleSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  return (
    <Card>
      <Card.Header>Create New Issue</Card.Header>
      <Card.Body>
        <Form>
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
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={handleDescription}
            />
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
      </Card.Body>
    </Card>
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
      <IssueForm />
    </>
  )
}

export default IssuesContainer
