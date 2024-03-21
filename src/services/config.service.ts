import{ Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class configService{

    private gamemodeSource = new BehaviorSubject<boolean>(false);
    currentGameMode = this.gamemodeSource.asObservable();

    private clueSource = new BehaviorSubject<boolean>(true);
    currentClueStatus = this.clueSource.asObservable();

    updateGameMode(gameMode: boolean) {
        this.gamemodeSource.next(gameMode);
    }

    updateClueStatus(clueStatus: boolean) {
        this.clueSource.next(clueStatus);
    }

    private genreSource = new BehaviorSubject<Genres>({genres: ["rock","rap","pop","country","hip-hop","jazz","alternative","j-pop","k-pop","emo"]});
    currentGenre = this.genreSource.asObservable();

    updateGenre(genre: Genres) {
        this.genreSource.next(genre);
    }
    
}

interface Genres {
    genres: [
        "rock",
        "rap",
        "pop",
        "country",
        "hip-hop",
        "jazz",
        "alternative",
        "j-pop",
        "k-pop",
        "emo"
      ]
}