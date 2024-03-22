import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const {Howl, Howler} = require('howler');
import { dummyService } from 'src/dummy.service';
import { configService } from 'src/services/config.service';
import { leaderboardService } from 'src/services/leaderboard.service';
import { interval, take, Observable } from 'rxjs';
import { map, shareReplay } from "rxjs/operators";


interface access{
 "access_token": string;
 "token_type": string;
 "expires_in": number;

}

interface timeComponents {
  secondsToDday: number;
  minutesToDday: number;
}

interface clue{
  body: string;
  show: boolean
}
interface track{
  title: string;
  url: string;
  artists: string[];
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  

  constructor(private DummyService: dummyService, private ConfigService: configService, private LeaderboardService: leaderboardService, private router: Router) {}



  guess: string = ''

  name: string = '' //for highscore

  newAccess: access = {"access_token": "", "token_type": "", "expires_in": 0}

  token: string = ""

  scoreTotal: number = 0

  score: number = 0

  started: boolean = false 

  gameOver: boolean = false

  guessMade: boolean = false

  next: boolean = false

  highscore: boolean = false

  maxClues: number = 4

  clues: clue[] = [{body: '', show: false}, {body: '', show: false}, {body: '', show: false}]

  clueIndex: number = 0 //Keeps track of how many clues are shown

  index: number = 0 //keeps track of current track index

  stream: typeof Howl = {src: [''], volume: 0.25, ext: ['mp3'], autoplay: true, html5: true}

  currentTrack: track = {title: '', url: '', artists: []}

  gameMode: boolean = this.ConfigService.gameMode

  clueStatus: boolean = this.ConfigService.clueStatus

  lives: number = 5


 



  
  
  

  ngOnInit(): void {
  }


  receiveGuess(valueEmitted: string) {
    this.guess = valueEmitted;
    this.guessMade = false
  }

  receiveName(valueEmitted: string) {
    this.name = valueEmitted;
  }

  async start(){
    //resettin' variables
    this.clueIndex = 0
    this.score = 10
    this.scoreTotal = 0
    this.started = true;
    this.gameOver = false
    this.guessMade = false
    this.lives = 5

    console.log("Clues are " + this.ConfigService.gameMode + " and mode is " + this.ConfigService.clueStatus)
    
    await this.ConfigService.gameInit()
    this.currentTrack = this.ConfigService.tracks[this.index]
    this.makeClues(this.currentTrack)
    let superUrl = this.currentTrack.url
    this.stream = new Howl({src: [superUrl], volume: 0.25, ext: ['mp3'], autoplay: true, html5: true});
    this.stream.play()

  }

  async onSubmit(){
    this.guessMade = true
    if(!this.next){
      if (this.guess === this.currentTrack.title){
        this.next = true
        this.scoreTotal += this.score
        this.score = 10;
      }
  
      else{
        this.lives--
        if(this.lives === 0){
          this.stream.stop()
          this.gameOver = true
          if(this.LeaderboardService.compare(this.scoreTotal)){
            this.highscore = true
          }
        }
      }
    }  
    
  }

  async onNameSubmit(){
    this.LeaderboardService.add(this.scoreTotal, this.name)
    this.highscore = false
  }

  async skip(){
    this.stream.stop()
    this.index++
    this.currentTrack = this.ConfigService.tracks[this.index]
    this.makeClues(this.currentTrack)
    let superUrl = this.currentTrack.url
    this.stream = new Howl({src: [superUrl], volume: 0.25, ext: ['mp3'], autoplay: true, html5: true});
    this.score = 10
    this.clueIndex = 0
    this.stream.play()
    console.log(this.currentTrack.title)
  }

  async onNext(){
    this.stream.stop()
    this.index++
    this.currentTrack = this.ConfigService.tracks[this.index]
    this.makeClues(this.currentTrack)
    let superUrl = this.currentTrack.url
    this.stream = new Howl({src: [superUrl], volume: 0.25, ext: ['mp3'], autoplay: true, html5: true});
    this.score = 10
    this.clueIndex = 0
    this.stream.play()
    console.log(this.currentTrack.title)
    this.next = false
    this.guessMade = false

  }

  async revealClue(){
    if(this.clueIndex <= 2){
      this.clues[this.clueIndex].show = true
      this.clueIndex++
      this.score--
    }

  }

  async makeClues(Track: track){
    this.clues = [{body: '', show: false}, {body: '', show: false}, {body: '', show: false}]
    let special1 = Track.title.match(/\([A-Z\sa-z]+\)/)
    let special2 =  Track.title.match(/feat[A-Za-z]+/)
    let words = Track.title.split(/[ ]+/); //gets the potential words of a title

    let clue1: clue = {body: "Title length: " + Track.title.length + ", Number of words: " + words.length, show: false}
    this.clues[0] = clue1
    
    let clue2: clue = {body: "Artists: " + Track.artists, show: false}
    this.clues[1] = clue2
    
    let clue3: clue = {body: "First Letter: " + Track.title.charAt(0) + ", and contains the following specials: " + special1 + ' ' + special2, show: false}
    this.clues[2] = clue3
    
    //let clue4: clue = {body: "Artist: " + Track.artists, show: false}
  }


}
