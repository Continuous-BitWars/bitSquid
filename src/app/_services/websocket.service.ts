import {effect, Injectable} from '@angular/core';
import {GameInfoService} from './game-info.service';
import {GameTickService} from './game-tick.service';
import {WEB_SOCKET_URL} from '../config';
import {interval, Subscription} from 'rxjs';
import {Update} from '../_models/communication/update';
import {WebSocketSubscription} from '../_models/communication/WebSocketSubscription'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocket?: WebSocket;
  currentGameId: number = 0;
  pingPongSubscription?: Subscription


  constructor(private gameInfoService: GameInfoService, private gameTickService: GameTickService) {
    this.setupWebSocket(WEB_SOCKET_URL);
    effect(() => this.setTargetGame(this.gameInfoService.currentGameInfo()?.id || 0))
  }

  private setupWebSocket(webSocketURL: string): void {
    this.webSocket = new WebSocket(webSocketURL);

    this.webSocket.onopen = (): void => {
      //console.log("wss connected")
      this.pingPongSubscription = interval(5000).subscribe(() => {
        if (this.webSocket != undefined) {
          this.webSocket.send(JSON.stringify(<WebSocketSubscription>{topic: "PING", message: ""}));
        }
      })
    };

    this.webSocket.onmessage = (msg: MessageEvent) => this.handleGameUpdates(msg);

    this.webSocket.onclose = (): void => {
      //console.log("wss disconnected")
      if (this.pingPongSubscription != undefined) {
        this.pingPongSubscription.unsubscribe()
      }
      this.setupWebSocket(webSocketURL);
    }
  }

  public setTargetGame(gameId: number): void {
    //console.log(`change es game to ${gameId}`)
    if (gameId == this.currentGameId) {
      return
    }
    this.switchTarget(`game_${this.currentGameId}`, `game_${gameId}`);
    this.currentGameId = gameId
  }

  private switchTarget(from: string, to: string): void {
    if (from != "game_0") {
      if (this.webSocket != undefined) {
        this.webSocket.send(JSON.stringify(<WebSocketSubscription>{topic: from, message: "unsubscribe"}));
      }
    }
    if (to != "game_0") {
      if (this.webSocket != undefined) {
        this.webSocket.send(JSON.stringify(<WebSocketSubscription>{topic: to, message: "subscribe"}));
      }
    }
  }

  private handleGameUpdates(msg: MessageEvent): void {

    let update: Update = JSON.parse(<string>msg.data);

    if (update.topic == "PONG") {
      return;
    }

    let gameIdsFromTopic = update.topic.match(/(\d+)/)
    if (!gameIdsFromTopic) {
      return
    }
    let gameId: number = parseInt(gameIdsFromTopic[0])
    this.gameTickService.addGameStateForGame(gameId, update.message)
  }
}
