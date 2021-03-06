import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-osom",
  templateUrl: "./osom.component.html",
  styleUrls: ["./osom.component.css"],
})
export class OsomComponent implements OnInit {
  thinking = false;
  scores = [0, 0];
  weapons = ["rock", "paper", "scissors"];
  playerSelected = -1;
  isResultShow = false;
  theResult = 0;
  enemySelected = -1;

  constructor() {}

  ngOnInit(): void {}

  // Game on!
  pick(weapon: number): void {
    // return immediately when still loading. You don't want
    // the user to spam the button.
    if (this.thinking) return;
    this.thinking = true;
    this.playerSelected = weapon;

    //create a delay to simulate enemy's turn.
    setTimeout(() => {
      this.thinking = false;
      // generate a number from 0 -2
      const randomNum = Math.floor(Math.random() * 3);
      this.enemySelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    }, Math.floor(Math.random() * 500) + 200);
  }

  checkResult(): void {
    const playerPick = this.playerSelected;
    const enemyPick = this.enemySelected;
    // if you and the enemy have the same weapon, then it is a tie.
    if (playerPick == enemyPick) {
      this.theResult = 2;
    }
    // let's say you picked rock ( 0 )
    // and the enemy picked paper ( 1 )
    // you lose because ( 0 - 1 + 3 ) % 3  is equal to 2.

    // when you picked rock ( 0 )
    // and the enemy picked scissor ( 2 )
    // you win because ( 0 - 2 + 3) % 3 is equal to 1.

    // when you picked scissor ( 2 )
    // and the enemy picked paper ( 1 )
    // you win because ( 2 - 1 + 3 ) % 3 is equal to 1. 4 % 3 is 1.
    // Hope you get the picture.
    else if ((playerPick - enemyPick + 3) % 3 == 1) {
      // YOU WIN
      this.theResult = 0;
      this.scores[0] = this.scores[0] + 1;
    } else {
      // YOU LOSE
      this.theResult = 1;
      this.scores[1] = this.scores[1] + 1;
    }
  }

  reset(): void {
    this.scores = [0, 0];
  }
}
