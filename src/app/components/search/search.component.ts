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

  constructor( private spotify: SpotifyService ) 
  {
    
  }

  buscar(termino: string)
  { 
    this.loading = true;

    console.log(termino);
    this.spotify.getArtists(termino)
                .subscribe( data => {
                  this.artistas = data;
                  this.loading = false;
                }, (error) => {
                  this.loading = false;
                  this.error = true;
                  this.mensajeError = error.error.error.message;
              });
  }

}
