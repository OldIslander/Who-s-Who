import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class configService{

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