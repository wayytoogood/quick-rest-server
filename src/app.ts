import express, { RequestHandler } from 'express'

// export type Methods = 'get' | 'post' | 'patch' | 'put' | 'delete'
export type Methods = 'get'

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
    message?: string
  }
  delay?: number
}

class Server {
  private app: express.Express = express()
  private router: express.Router = express.Router()
  private port: number = 5000
  private delay: number = 0

  constructor() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))

    this.app.use(this.router)
  }

  config = ({ port, delay }: Configs): void => {
    this.port = port || this.port
    this.delay = delay || this.delay
  }

  generateRoutes = <T>(routes: Route<T>[]) => {
    routes.forEach((route) => {
      const { method, path, statusInfo, data, delay } = route

      const status = statusInfo ? statusInfo.status : 200
      const success = statusInfo ? statusInfo.success : true
      const message =
        statusInfo && statusInfo.message
          ? statusInfo.message
          : success
          ? 'request was successfull'
          : 'request was failed'

      const currentDelay = delay ?? this.delay ?? 0

      const requestHandler: RequestHandler = async (req, res) => {
        try {
          const returnedData = await new Promise((resolve, reject) => {
            setTimeout(() => {
              if (status) {
                resolve({ message, data })
              } else {
                reject({ message, data: null })
              }
            }, currentDelay)
          })

          return res.status(status).json(returnedData)
        } catch (error) {
          return res.status(status).json(error)
        }
      }

      this.router[method](path, requestHandler)
    })
  }

  start = async () => {
    try {
      this.app.listen(this.port, () => {
        console.log(`Server listens on port ${this.port}...`)
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default new Server()
