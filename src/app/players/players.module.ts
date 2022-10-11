import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { PlayersRoutingModule } from './players-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { PlayerComponent } from './pages/player/player.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { ImagePipePipe } from './pipes/image-pipe.pipe';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';



@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    SearchComponent,
    PlayerComponent,
    HomeComponent,
    PlayerCardComponent,
    ImagePipePipe,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    PlayersRoutingModule
  ]
})
export class PlayersModule { }
