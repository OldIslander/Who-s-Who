import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  guess: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  setGuess(name: string) {
    this.guess = name;
    this.guessChange.emit(this.guess);
  }

  @Output() guessChange: EventEmitter<string> = new EventEmitter<string>();

}
