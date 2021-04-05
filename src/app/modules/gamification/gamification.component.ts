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
  public alerts = [];
  close(index) {
    this.alerts.splice(index, 1);
  }
  popup = true;
  registered = false;
  isLoading = false;
  public user;
  femalePath: string;
  avatarSrc;
  public points = 0;
  public userChecklists;
  public all;
  public totPost = 0;
  public totOnbrd = 0;
  public allPre = 0;
  public allOnbrd = 0;
  public allPost = 0;
  public checkPre = 0;
  public checkPreDb = 0;
  public checkOnbrdDb = 0;
  public checkPostDb = 0;
  public checkPreNow = 0;
  public all30 = 0;
  public all60 = 0;
  public all90 = 0;
  public targetID: Array<string>;
  public targetID1: Array<string>;
  disabledPreOnboardingList: boolean = false;
  disabledCompleteButton: boolean = true;
  list: any;
  current: number;
  mobile: boolean = false;
  i = 1;
  j = 1;
  k = 1;

  @ViewChild("gender", { static: true }) gender: TemplateRef<any>;
  @ViewChild("card-body", { static: true }) cardBody: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private checklist: ChecklistService,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log(this.alerts);
    if (this.authenticationService.currentUserValue.game == false) {
      this.open(this.gender, "md");
    } else {
      this.popup = false;
    }
    this.femalePath =
      "assets/avatar/" +
      this.authenticationService.currentUserValue.gender +
      "/";

    this.user = this.authenticationService.currentUserValue;
    // });

    //Checklist
    this.checklist.getUserChecklist().subscribe((data) => {
      this.userChecklists = data;
      for (var i = 0; i < this.userChecklists[0].lists.length; i++) {
        if (this.userChecklists[0].lists[i].tags[0].title == "Pre-Onboarding") {
          this.allPre++;
        }
      }
      console.log(this.allPre);
    });
    // this.allCheck = parseInt(((this.allCheck / this.all) * 100).toString());
    this.totPost = parseInt(
      (((this.allPre + this.allOnbrd) / this.all) * 100).toString()
    );
    this.totOnbrd = parseInt(((this.allPre / this.all) * 100).toString());
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
          this.points = this.points + 10;
          this.alerts.push({
            type: "success",
            message: "You've gained 10 coins!",
          });
          setTimeout(() => this.alerts.splice(0, 1), 2000);
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
          this.points = this.points - 10;
          this.alerts.push({
            type: "danger",
            message: "You've lost 10 coins!",
          });
          setTimeout(() => this.alerts.splice(0, 1), 2000);
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

    if (this.checkPreNow == this.allPre) {
      this.points = this.points + 50;
    }
  }

  completePreOnboardingList() {
    this.disabledPreOnboardingList = true;
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
}
