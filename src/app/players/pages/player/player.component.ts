import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Player } from '../../interfaces/player';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  player!: Player;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playersService: PlayersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.playersService.getPlayerById(id))
      )
      .subscribe(player => this.player = player);
  }

  goBack() {
    this.router.navigate(['/players/list']);
  }

}
