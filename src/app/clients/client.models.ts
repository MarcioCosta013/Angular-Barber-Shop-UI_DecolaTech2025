export interface ClientModelForm { //Vai ser reutilizado tanto no insert como no update...

  id?: number
  name: string,
  email: string,
  phone: string
}

export interface ClientModelTable {

  id: number
  name: string,
  email: string,
  phone: string
}
