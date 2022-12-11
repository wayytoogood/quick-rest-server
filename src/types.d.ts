import status, { HttpStatus } from 'http-status'

export type Methods = 'get' | 'post' | 'patch' | 'put' | 'delete'

export interface Configs {
  port?: number
  delay?: number
}

export interface Route<T> {
  method: Methods
  path: string
  data: T[]
  statusInfo?: {
    status: number
    success: boolean
    message: string
  }
  delay?: number
}
