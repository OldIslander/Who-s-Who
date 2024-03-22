import{ Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


interface access{
    "access_token": string;
    "token_type": string;
    "expires_in": number;
   
   }

interface track{
    title: string;
    url: string;
    artists: string[];
}

@Injectable({
    providedIn: 'root'
})

export class dummyService{

    tracks: track[] = []

    //private tracks = new BehaviorSubject<string[]>([]);
    //currentTracks = this.tracks.asObservable();

    genre : string = '';

    maxClues: number = 4;

    //Generates new access token
  async getToken(){
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': '6dde12d09c434d0a99d0baeb00444d11',
        'client_secret': '955dbccffc34438090b0192211fb15ff'
      })
    });

    return response.json()
  }

  async searchAndGet(genre: string = ''){
    let token = await this.getToken()
    let result = await fetch('https://api.spotify.com/v1/search?q=genret%3A' + genre +'&type=track&limit=50&offset=10', {
    headers: {
    'Authorization': 'Bearer ' + token["access_token"]
            }
    });

    return result.json()
    
  }

  async gameInit(genre: string = ''){
    let searchResults = await this.searchAndGet(genre)
    let songs = searchResults.tracks.items

    this.tracks = []

    for(const song of songs){
        if(song.preview_url != null){
            let Track:track = {title:'', url:'', artists:[]}
            Track.title = song.name
            Track.url = song.preview_url
            for(const artist of song.artists){
                Track.artists.push(artist.name)
            }
            this.tracks.push(Track)
        }
        
    }

    for (let i = this.tracks.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]]; 
      }

    return this.tracks
  }
    
}