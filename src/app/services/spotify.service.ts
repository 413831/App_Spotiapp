import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  static albumURL = 'https://open.spotify.com/embed/album/';
  static trackURL = 'https://open.spotify.com/embed/track/';
  token: string;

  constructor(private http: HttpClient) 
  {
    console.log("Spotify Service Listo");
    this.getToken();
  }

  getToken()
  {
    return this.http.get(`${environment.middleware_url}/${environment.client_id}/${environment.client_secret}`)
              .subscribe( (data:any) => {
                console.log(data.access_token);
                this.token = data.access_token;
              });
  }

  getQuery( query: string )
  {
    const url = `https://api.spotify.com/v1/${ query }`;
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(url, {headers});
  }

  getNewReleases()
  {
    return this.getQuery("browse/new-releases")
                .pipe( map( data => data['albums'].items));
  }

  getArtists( termino: string )
  {
    return this.getQuery(`search?q=${termino}&type=artist`)
                .pipe( map( data => data['artists'].items));                
  }

  getArtist( id: string )
  {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks( id: string )
  {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
                .pipe( map( data => data['tracks'] ));
  }
  
}

