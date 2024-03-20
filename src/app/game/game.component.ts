import { Component, OnInit } from '@angular/core';

interface access{
 "access_token": string;
 "token_type": string;
 "expires_in": number;

}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }


  guess: string = ''

  newAccess: access = {"access_token": "", "token_type": "", "expires_in": 0}

  token: string = ""
  
  
  

  ngOnInit(): void {
  }


  receiveGuess(valueEmitted: string) {
    this.guess = valueEmitted;
  }

  async onSubmit(){
    

    this.newAccess = await this.getToken();
    this.token = this.newAccess["access_token"]

    let fartist = "Radiohead"

    let result = await this.searchAndGet(fartist, '', this.token) 

    console.log(result)
  }

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

  //This will generate a search term, retrieve an indefinite number of track ids and store them in an array
  async searchAndGet(artist: string = '', genre: string = '', token: string = ''){

    let result = await fetch('https://api.spotify.com/v1/search?q=artist%3A' + artist +'&type=track&offset=10', {
    headers: {
    'Authorization': 'Bearer ' + token
            }
    });

    return result.json()
    
  }
  

}
