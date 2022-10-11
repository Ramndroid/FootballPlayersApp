import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';
import { PlayersService } from '../../services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  player: Player = {
    first_name: '',
    last_name: '',
    birth: '',
    number: ''
  }

  constructor(
    private playersService: PlayersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.playersService.getPlayerById(id))
      )
      .subscribe(player => this.player = player);
  }

  save(): void {
    if (this.player.first_name.trim().length === 0) {
      return;
    }

    if (this.player.id) {
      this.playersService.updatePlayer(this.player)
        .subscribe(player => {
          this.showSnackbar('Registro actualizado');
        });
    } else {
      this.playersService.addPlayer(this.player)
        .subscribe(player => {
          this.router.navigate(['/players/edit', player.id]);
          this.showSnackbar('Registro creado');
        })
    }
  }

  deletePlayer(): void {

    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: this.player
    });

    dialog.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.playersService.deletePlayer(this.player.id!)
            .subscribe(resp => {
              this.router.navigate(['/players']);
            });
        }
      });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, "Cerrar", {
      duration: 2000
    });
  }

}
