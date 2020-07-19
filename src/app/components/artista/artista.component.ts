import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {
  artista: any = {};
  topTracks: any[] = [];
  loading: boolean;
  trackURL: string = SpotifyService.trackURL;
  error: boolean;
  mensajeError: string;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) 
  {
    this.route.params.subscribe( params => {
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtist( id: string )
  {
    this.loading = true;

    this.spotify.getArtist(id)
                .subscribe( artista => {
                  console.log(artista);
                  this.artista = artista;
                  this.loading = false;
                }, (error) => {
                  this.loading = false;
                  this.error = true;
                  this.mensajeError = error.error.error.message;
                });
  }

  getTopTracks( id: string )
  {
    this.spotify.getTopTracks(id)
                .subscribe( topTracks => {
                  this.topTracks = topTracks;
                  console.log(topTracks);
                }, (error) => {
                  this.loading = false;
                  this.error = true;
                  this.mensajeError = error.error.error.message;
                });
  }

}
