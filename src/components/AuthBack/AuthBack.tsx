import { useParams } from "react-router-dom"

const AuthBack = () => {
  const { code } = useParams()

  return (
    <div>
      <h1>AuthBack</h1>
      code: {code}
    </div>
  )
}

export default AuthBack
