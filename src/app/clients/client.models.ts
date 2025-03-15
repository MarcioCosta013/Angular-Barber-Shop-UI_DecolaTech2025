export interface ClientModelForm { //Vai ser reutilizado tanto no insert como no update...

  id?: number
  nome: string,
  email: string,
  phone: string
}

export interface ClientModelTable {

  id: number
  nome: string,
  email: string,
  phone: string
}
