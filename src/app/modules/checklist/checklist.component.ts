import { TemplateRef } from "@angular/core";
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "app/services/authentication/authentication.service";
import { ChecklistService } from "./checklist.service";

@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ChecklistComponent implements OnInit {
  public userChecklist;

  loading = false;

  pageNumber = 1;
  pageTotal = 3;

  // Game
  thinking = false;

  scores = [0, 0];
  weapons = ["rock", "paper", "scissors"];
  playerSelected = -1;
  isResultShow = false;

  theResult = 0;
  enemySelected = -1;

  @ViewChild("start", { static: true }) start: TemplateRef<any>;

  constructor(private checklist: ChecklistService, private router: Router, private modalService: NgbModal,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    console.log(this.authenticationService.currentUserValue.game)
    if (this.authenticationService.currentUserValue.game == true) {
      this.router.navigate(['/gamification']);
    } else {
      this.open(this.start);
    }
    this.loading = true;

    this.checklist.getUserChecklist().subscribe(data => {
      this.userChecklist = data;
      this.loading = false;
    });
  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
    });
  }

  konami(id) {
    let element = document.getElementById(id);
    if (element) {
      element.classList.toggle("konami");
      element.querySelector("#userChecklist").classList.toggle("d-none");
      element.querySelector("#gameOn").classList.toggle("d-none");

      let logo = element.querySelector("#logo");
      if (logo.innerHTML.includes("logo-celcom.svg")) {
        logo.innerHTML =
          '<img alt="Celcom Onboarding" src="https://celcomdesign.gitlab.io/system/iconography/svg/logo/logo-celcom-white.svg" style="height: inherit;" title="Celcom Onboarding">';
        console.log(
          `%c
       ___
      |[_]|
      |+ ;|
      '---'
          `,
          "font-family: monospace; font-size: 12px; color: #33ff33"
        );
        console.log(
          "%cKONAMI CODE ACTIVATED",
          "font-family: monospace; font-size: 12px; color: #33ff33"
        );
        element.querySelector("h1").innerHTML = "An Awesome/Osom Game";
        element.querySelector("h5").innerHTML = "Uh oh, you've found this.";
      } else {
        logo.innerHTML =
          '<img alt="Celcom Onboarding" src="https://celcomdesign.gitlab.io/system/iconography/svg/logo/logo-celcom.svg" style="height: inherit;" title="Celcom Onboarding">';
        console.log(
          "%cKONAMI CODE DEACTIVATED",
          "font-family: monospace; font-size: 12px; color: #FF6347"
        );
        element.querySelector(
          "h1"
        ).innerHTML = this.userChecklist[0].checklist.header.title;
        element.querySelector(
          "h5"
        ).innerHTML = this.userChecklist[0].checklist.header.description;
      }
    } else {
      console.log(
        "%cINSERT COIN",
        "font-family: terminal, monospace; font-size: 12px;"
      );
    }
  }

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
