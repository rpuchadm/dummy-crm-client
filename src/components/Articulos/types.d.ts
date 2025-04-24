interface IArticulo {
  id?: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  fecha_creacion?: string
}

interface IIssueRequest {
  id?: number
}

interface IArticuloDatos {
  articulo: IArticulo
  issue_requests: IIssueRequest[]
}

export { IArticulo, IArticuloDatos, IIssueRequest }
