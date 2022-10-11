import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../../interfaces/player';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  players: Player[] = [];

  constructor(
    private playersService: PlayersService
  ) { }

  ngOnInit(): void {
    this.playersService.getPlayers()
      .subscribe(players => this.players = players);
  }

}
