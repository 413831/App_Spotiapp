import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService) 
  {
    this.loading = true;
    this.error = false;

    this.spotify.getToken().add(()=>{
      this.spotify.getNewReleases()
                .subscribe( (data) => {
                  this.nuevasCanciones = data;
                  this.loading = false;
                }, (error) => {
                    this.loading = false;
                    this.error = true;
                    this.mensajeError = error.error.error.message;
                });
    })
    
  }

  ngOnInit(): void {
  }

}
