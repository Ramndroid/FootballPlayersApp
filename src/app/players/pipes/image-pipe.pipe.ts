import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interfaces/player';

@Pipe({
  name: 'image'
})
export class ImagePipePipe implements PipeTransform {

  transform(player: Player): string {
    if (!player.id && !player.image) {
      return 'assets/img/escudoBarcelona.png';
    } else if (player.image) {
      return player.image;
    } else {
      return `assets/players/${player.id}.webp`;
    }
  }

}
