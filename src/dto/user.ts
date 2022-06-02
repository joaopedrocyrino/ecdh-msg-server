export interface login {
  login: string
  password: string
}

export interface createUser {
  pubKey: string
  login: string
  password: string
}

export interface getOneUser {
  token: string
}
