interface IProfile {
  cliente: ICliente
  corp_user: ICorpUser
}
interface ICorpUser {
  person: ICorpUSerPerson
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
