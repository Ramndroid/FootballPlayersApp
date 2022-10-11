import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this._baseUrl}/players`);
  }

  getPlayerById(id: string): Observable<Player> {
    return this.http.get<Player>(`${this._baseUrl}/players/${id}`);
  }

  getSuggestions(word: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this._baseUrl}/players?q=${word}&_limit=6`);
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this._baseUrl}/players`, player);
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this._baseUrl}/players/${player.id}`, player);
  }

  deletePlayer(id: string): Observable<any> {
    return this.http.delete<any>(`${this._baseUrl}/players/${id}`);
  }
}
