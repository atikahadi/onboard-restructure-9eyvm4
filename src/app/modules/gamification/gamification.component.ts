import { TemplateRef } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "app/services/authentication/authentication.service";
import { ChecklistService } from "../checklist/checklist.service";
import { first } from "rxjs/operators";
import { User } from "../../services/user/user.model";
import { UserService } from "../../services/user/user.service";
import mergeImages from "merge-images";
import { saveAs } from "file-saver";

@Component({
  selector: "app-gamification",
  templateUrl: "./gamification.component.html",
  styleUrls: ["./gamification.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class GamificationComponent implements OnInit {
  name = "Unicornssss!";
  popup = true;
  registered = false;
  thinking = false;
  scores = [0, 0];
  weapons = ["rock", "paper", "scissors"];
  playerSelected = -1;
  isResultShow = false;
  isLoading = false;
  public user;
  femalePath: string;
  // malePath = "assets/avatar/male/";
  avatarSrc;

  //Checklist
  public userChecklists;
  public filteredTag = "Pre-Onboarding";
  public allPre = 0;
  public checkPre = 0;
  public checkPreDb = 0;
  public checkPreNow = 0;
  public targetID: Array<string>;
  public targetID1: Array<string>;
  disabledPreOnboardingList: boolean = true;
  disabledCompleteButton: boolean = true;
  list: any;
  current: number;
  mobile: boolean = false;
  i = 1;
  j = 1;
  k = 1;

  theResult = 0;
  enemySelected = -1;
  @ViewChild("gender", { static: true }) gender: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private checklist: ChecklistService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.authenticationService.currentUserValue.game == false) {
      this.open(this.gender, "md");
    } else {
      this.popup = false;
    }
    this.femalePath =
      "assets/avatar/" +
      this.authenticationService.currentUserValue.gender +
      "/";

    // this.userService
    //   .getAll()
    //   .pipe(first())
    //   .subscribe((users) => {
    this.user = this.authenticationService.currentUserValue;
    // });

    //Checklist
    this.checklist.getUserChecklist().subscribe((data) => {
      this.userChecklists = data;

      for (var i = 0; i < this.userChecklists[0]?.lists.length; i++) {
        if (this.userChecklists[0].lists[i].checked == true) {
          if (
            this.userChecklists[0].lists[i].tags[0].title == "Pre-Onboarding"
          ) {
            this.checkPreDb++;
            this.allPre++;
          }
        } else {
          if (
            this.userChecklists[0].lists[i].tags[0].title == "Pre-Onboarding"
          ) {
            this.allPre++;
          }
        }
        this.isLoading = false;

        if (this.checkPreDb != this.allPre) {
          this.disabledPreOnboardingList = false;
          this.disabledCompleteButton = true;
        }
        this.userChecklists[0].completed = true;
      }
      this.checkPre = this.checkPreDb;
    });
  }

  setGender(item) {
    this.authenticationService.currentUserValue.gender = item;
    var json = JSON.parse(localStorage.getItem("currentUser"));
    json.gender = item;
    localStorage.setItem("currentUser", JSON.stringify(json));
    this.femalePath =
      "assets/avatar/" +
      this.authenticationService.currentUserValue.gender +
      "/";
    this.createAvatar();
  }

  changeHair(index) {
    if (index == 0) {
      this.i = 33;
    } else if (index == 34) {
      this.i = 1;
    } else {
      this.i = index;
    }
    this.createAvatar();
  }

  changeFace(index) {
    if (index == 0) {
      this.j = 4;
    } else if (index == 5) {
      this.j = 1;
    } else {
      this.j = index;
    }
    this.createAvatar();
  }

  changeClothes(index) {
    if (index == 0) {
      this.k = 59;
    } else if (index == 60) {
      this.k = 1;
    } else {
      this.k = index;
    }
    this.createAvatar();
  }

  createAvatar() {
    mergeImages([
      this.femalePath + "face" + this.j + ".png",
      this.femalePath + "head" + this.i + ".png",
      this.femalePath + "clothes" + this.k + ".png",
    ]).then((b64) => {
      this.avatarSrc = b64;
      var json = JSON.parse(localStorage.getItem("currentUser"));
      json.avatar = this.avatarSrc;
      localStorage.setItem("currentUser", JSON.stringify(json));
      this.authenticationService.currentUserValue.avatar = this.avatarSrc;
    });
  }

  //Checklist Checkbox

  onCheckboxChange(e) {
    for (var i = 0; i < this.userChecklists[0].lists.length; i++) {
      if (e.target.value == this.userChecklists[0].lists[i].id) {
        this.userChecklists[0].lists[i].checked = e.target.checked;

        this.targetID = new Array(50).fill(
          this.userChecklists[0].lists[i].tags[0].title
        );

        if (e.target.checked == true) {
          if (this.targetID[0] == "Pre-Onboarding") {
            this.checkPreNow++;
            this.checkPre = this.checkPreDb + this.checkPreNow;
          }

          if (this.userChecklists[0].lists[i].tags.length == 2) {
            this.targetID1 = new Array(50).fill(
              this.userChecklists[0].lists[i].tags[1].title
            );
          }
        } else if (e.target.checked == false) {
          if (this.targetID[0] == "Pre-Onboarding") {
            this.checkPreNow--;
            this.checkPre = this.checkPreDb + this.checkPreNow;
          }

          if (this.userChecklists[0].lists[i].tags.length == 2) {
            this.targetID1 = new Array(50).fill(
              this.userChecklists[0].lists[i].tags[1].title
            );
          }
        }

        this.checklist.updateUserChecklists(this.userChecklists).subscribe(
          () => {},
          (error: any) => {
            console.log(error);
          }
        );
      }
    }
  }

  open(content, dialogSize) {
    if (dialogSize === "sm" || dialogSize === "lg") {
      this.modalService.open(content, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: dialogSize,
      });
    } else {
      this.modalService.open(content, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
      });
    }
  }

  onDone() {
    this.popup = false;
    this.registered = true;
    var json = JSON.parse(localStorage.getItem("currentUser"));
    console.log(json);
    json.game = this.registered;
    localStorage.setItem("currentUser", JSON.stringify(json));
    this.authenticationService.currentUserValue.game = this.registered;
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

  // openWindowCustomClass(shopModal) {
  //   this.modalService.open(shopModal, { windowClass: 'shopModal' });
  // }
}
