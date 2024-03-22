import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// interface Genres {
//     genres: [
//         "rock",
//         "rap",
//         "pop",
//         "country",
//         "hip-hop",
//         "jazz",
//         "alternative",
//         "j-pop",
//         "k-pop",
//         "emo"
//       ]
// }

@Injectable({
    providedIn: 'root'
})

export class configService{

    
    // private clueSource = new BehaviorSubject<boolean>(true);
    // currentClueStatus = this.clueSource.asObservable();
    public toggleClueStatus() {
        localStorage.setItem('clueStatus', localStorage.getItem('clueStatus') === 'true' ? 'false' : 'true'); // if already true, change to false 
        // this.clueSource.next(clueStatus);    // Do we still want to use Behavior Subjects? - remove later...
    }
    get clueStatus() { return localStorage.getItem('clueStatus') === 'true' ? true : false; }
    // call this (in game.component.ts?) configService.clueStatus   - how to check clueStatus in game component


    // private gamemodeSource = new BehaviorSubject<boolean>(false);
    // currentGameMode = this.gamemodeSource.asObservable();
    public toggleGameMode() {
        localStorage.setItem('gameMode', localStorage.getItem('gameMode') === 'true' ? 'false' : 'true'); // if already true, change to false 
        // this.gamemodeSource.next(gameMode);    // Do we still want to use Behavior Subjects? - remove later...
    }
    get gameMode() { return localStorage.getItem('gameMode') === 'true' ? true : false; }
    // call this (in game.component.ts?) configService.gameMode   - how to check gameMode in game component


    // still just getting a string
    public selectGenre() {
        localStorage.setItem('genre', localStorage.getItem('genre') === 'true' ? 'false' : 'true');
    }
    get selectedGenre() { return localStorage.getItem('genre') === 'true' ? true : false; }

}  

    // private genreSource = new BehaviorSubject<Genres>({genres: ["rock","rap","pop","country","hip-hop","jazz","alternative","j-pop","k-pop","emo"]});
    // currentGenre = this.genreSource.asObservable();
    // updateGenre(genre: Genres) {
    //     this.genreSource.next(genre);
    // }


// Use local storage if it is only being changed in once spot

// if timed -> show timer logic... html