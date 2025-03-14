export interface SaveClientResquest {
  //o que vamos mandar para o back-end para ele poder salvar
  nome: string
  email: string
  phone: string
}

export interface UpdateClientResquest {

  nome: string
  email: string
  phone: string
}

export interface SaveClientResponse {

  id: number
  nome: string
  email: string
  phone: string
}

export interface UpdateClientResponse {

  id: number
  nome: string,
  email: string,
  phone: string
}

export interface ListClientResponse {

  id: number
  nome: string,
  email: string,
  phone: string
}

export interface DetailClientResponse {

  id: number
  nome: string,
  email: string,
  phone: string
}
