export interface SaveClientResquest {
  //o que vamos mandar para o back-end para ele poder salvar
  name: string
  email: string
  phone: string
}

export interface UpdateClientResquest {

  name: string
  email: string
  phone: string
}

export interface SaveClientResponse {

  id: number
  name: string
  email: string
  phone: string
}

export interface UpdateClientResponse {

  id: number
  name: string,
  email: string,
  phone: string
}

export interface ListClientResponse {

  id: number
  name: string,
  email: string,
  phone: string
}

export interface DetailClientResponse {

  id: number
  name: string,
  email: string,
  phone: string
}
