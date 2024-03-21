import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const {Howl, Howler} = require('howler');
import { dummyService } from 'src/dummy.service';


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

  constructor(private DummyService: dummyService, private router: Router) { }


  guess: string = ''

  newAccess: access = {"access_token": "", "token_type": "", "expires_in": 0}

  token: string = ""

  scoreTotal: number = 0

  score: number = 0

  started: boolean = false

  index: number = 0

  stream: typeof Howl = {src: [''], volume: 0.25, ext: ['mp3'], autoplay: true, html5: true}
  
  
  

  ngOnInit(): void {
  }


  receiveGuess(valueEmitted: string) {
    this.guess = valueEmitted;
  }

  async onSubmit(){
    if(!this.started){
      await this.DummyService.gameInit("rock")
      console.log(this.DummyService.tracks[this.index].url)
      let superUrl = this.DummyService.tracks[this.index].url
      console.log(superUrl)
      this.stream = new Howl({src: [superUrl], volume: 0.25, ext: ['mp3'], autoplay: true, html5: true});
      this.started = true
      this.index++
      await this.stream.play()
    }
    
     else{
      this.stream.stop()
      this.stream = await new Howl({src: [this.DummyService.tracks[this.index].url], volume: 0.25, ext: ['mp3'], autoplay: true, html5: true})
      this.index++
      await this.stream.play()
     }

     
  }

  

}
