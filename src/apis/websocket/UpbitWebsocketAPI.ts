class UpbitWebsocketAPI {
  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('wss://api.upbit.com/websocket/v1');
    this.socket.binaryType = 'arraybuffer';
  }

  getSocket = () => this.socket;
}

export default UpbitWebsocketAPI;
