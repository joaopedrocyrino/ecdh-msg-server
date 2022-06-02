import { Server } from 'socket.io'

class SocketServer {
  private readonly server: Server

  constructor () {
    this.server = new Server(5050)
    this.server.on('connection', (socket) => {
      console.log(`🚀 socket client connected: ${socket.id}`)
    })
  }

  async emit (channel: string, data: any): Promise<void> {
    this.server.emit(channel, data)
  }
}

export default new SocketServer()
