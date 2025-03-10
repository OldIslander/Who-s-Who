import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import { Router } from '@angular/router';
import { configService } from "src/services/config.service";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";



@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private ConfigService: configService, private router: Router) {}

  genres: String[] = ["House", "Alternative", "J-Rock", "R&B"];
  selectedGenre: String = "";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";

  gameMode: boolean = false;  // False=Normal, True=Timed
  clueStatus: boolean = true; //   False=Off,  True=On
  

  ngOnInit(): void {
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.loadGenres(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.loadGenres(newToken.value);
    });
    localStorage.setItem('clueStatus', this.clueStatus + ''); // or .toString()
    // Don't need to check what it is, just tell it what it is

    // localStorage.setItem('gameStateTwo', 'timed');
  }

  loadGenres = async (t: any) => {
    this.configLoading = true;

    // #################################################################################
    // DEPRECATED!!! Use only for example purposes
    // DO NOT USE the recommendations endpoint in your application
    // Has been known to cause 429 errors
    // const response = await fetchFromSpotify({
    //   token: t,
    //   endpoint: "recommendations/available-genre-seeds",
    // });
    // console.log(response);
    // #################################################################################
    
    this.genres = [
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
    this.configLoading = false;
  };

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    console.log(this.selectedGenre);
    console.log(TOKEN_KEY);
    localStorage.setItem('genre',selectedGenre);
  }

  updateClueStatus() {
    this.ConfigService.toggleClueStatus()
    var x = document.getElementById("on-off");
    if ( x != null) { // wrap in if statment to make sure it is not null
      if (x.innerHTML === "On") {
        x.innerHTML = "Off";
      } else {
        x.innerHTML = "On";
      }
    }
  }

  updateGameMode() {
    this.ConfigService.toggleGameMode()
    var x = document.getElementById("normal-timed");
    if ( x != null) { // wrap in if statment to make sure it is not null
      if (x.innerHTML === "Normal") {
        x.innerHTML = "Endless";
      } else {
        x.innerHTML = "Normal";
      }
    }
  }

}
