import express from 'express'
import * as http from 'http'
import routes from './routes'
import * as path from 'path'

export class Server {
  private readonly _port: string
  // private readonly _app: express.Express
  _app: express.Express
  private _httpServer?: http.Server

  constructor (port: string) {
    this._port = port
    this._app = express()
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: false }))
    this._app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization')
      next()
    })
    const staticPath = path.join(__dirname, '..', '..', '..', '..', '..', 'client', 'dist') 
    this._app.use(express.static(staticPath))
    this._app.use(routes)
  }

  async listen (): Promise<void> {
    return await new Promise(resolve => {
      this._httpServer = this._app.listen(this._port, () => {
        console.log(
          `Mock Backend App is running at http://localhost:${this._port}`
        )
        console.log('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  async stop (): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this._httpServer != null) {
        this._httpServer.close(error => {
          if (error != null) {
            return reject(error)
          }
          return resolve()
        })
      }

      return resolve()
    })
  }
}
