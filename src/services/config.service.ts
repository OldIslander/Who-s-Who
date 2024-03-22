import { Injectable } from '@angular/core';

interface track{
    title: string;
    url: string;
    artists: string[];
}

@Injectable({
    providedIn: 'root'
})

export class configService{

    tracks: track[] = []

    public toggleGameMode() {
        localStorage.setItem('gameMode', localStorage.getItem('gameMode') === 'true' ? 'false' : 'true'); // if already true, change to false 
    } // call  \/  this (in game.component.ts?) configService.gameMode   - how to check gameMode in game component
    get gameMode() { return localStorage.getItem('gameMode') === 'true' ? true : false; } // return true if true, false if false
            
    public toggleClueStatus() {
        localStorage.setItem('clueStatus', localStorage.getItem('clueStatus') === 'true' ? 'false' : 'true'); // if already true, change to false 
    } // call  \/  this (in game.component.ts?) configService.clueStatus   - how to check clueStatus in game component
    get clueStatus() { return localStorage.getItem('clueStatus') === 'true' ? true : false; } // return true if true, false if false


    // still just getting a string
    public selectGenre(genre: string) {
        localStorage.setItem('genre', genre);
    }
    get foundSelectedGenre() { 
        return localStorage.getItem('genre'); 
    }

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

    async searchAndGet(){
        let token = await this.getToken()
        let result = await fetch('https://api.spotify.com/v1/search?q=genret%3A' + this.foundSelectedGenre +'&type=track&limit=50&offset=10', {
        headers: {
        'Authorization': 'Bearer ' + token["access_token"]
                }
        });
    
        return result.json()
        
      }
    
      async gameInit(){
        console.log(this.foundSelectedGenre)
        let searchResults = await this.searchAndGet()
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
// Use local storage if it is only being changed in once spot
// if timed -> show timer logic... html


    // Do we still want to use Behavior Subjects?   
    // private gamemodeSource = new BehaviorSubject<boolean>(false);    
    // currentGameMode = this.gamemodeSource.asObservable();    
    // this.gamemodeSource.next(gameMode); 

    // private clueSource = new BehaviorSubject<boolean>(true);         
    // currentClueStatus = this.clueSource.asObservable();
    // this.clueSource.next(clueStatus);    

    // private genreSource = new BehaviorSubject<Genres>({genres: ["rock","rap","pop","country","hip-hop","jazz","alternative","j-pop","k-pop","emo"]});
    // currentGenre = this.genreSource.asObservable();
    // public updateGenre(genre: Genres) {
    //     this.genreSource.next(genre);
    // }