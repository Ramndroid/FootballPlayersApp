import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Player } from '../../interfaces/player';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  wordToSearch: string = '';

  players: Player[] = [];

  selectedPlayer: Player | undefined;

  constructor(
    private playersService: PlayersService
  ) { }

  ngOnInit(): void {
  }

  searching(): void {
    this.playersService.getSuggestions(this.wordToSearch.trim())
      .subscribe(players => this.players = players);
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.selectedPlayer = undefined;
      return;
    }

    const player: Player = event.option.value;
    this.wordToSearch = player.last_name;

    this.playersService.getPlayerById(player.id!)
      .subscribe(player => this.selectedPlayer = player);
  }

}
