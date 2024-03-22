import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ConfigComponent } from './config/config.component';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { dummyService} from '../dummy.service';
import { configService } from "src/services/config.service";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "game", component: GameComponent },
  { path: "leaderboard", component: LeaderboardComponent }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, ConfigComponent, GameComponent, LeaderboardComponent, TextInputComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [dummyService, configService],
  bootstrap: [AppComponent],
})
export class AppModule {}
