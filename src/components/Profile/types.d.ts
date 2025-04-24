interface IProfile {
  cliente: ICliente
  corp_user: ICorpUser
  issue_requests: IIssueRequest[]
}
interface ICorpUser {
  person: ICorpUSerPerson
}
interface IIssueRequest {
  id?: number
}
interface ICorpUSerPerson {
  apellidos: string
  dni: string
  email: string
  id: number
  nombre: string
  telefono: string
}
export { ICliente, IProfile }
