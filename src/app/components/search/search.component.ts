import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  artistas: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;
  searching: boolean;

  constructor( private spotify: SpotifyService ) 
  {
    this.searching = true;
  }

  buscar(termino: string)
  { 
    this.searching = false;
    
    if(termino.length > 0)
    {
      this.loading = true;

      this.spotify.getArtists(termino)
                  .subscribe( data => {
                    this.artistas = data;
                    this.loading = false;
                    this.searching = this.artistas.length > 0 ? false : true;
                  });
    }

  }

}
