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
  public allCheck = 0;
  public totPost = 0;
  public totOnbrd = 0;
  public allPre = 0;
  public allOnbrd = 0;
  public allPost = 0;
  public checkPre = 0;
  public checkPreDB = 0;
  public checkPreNow = 0;
  public checkOnbrd = 0;
  public checkOnbrdNow = 0;
  public checkOnbrdDB = 0;
  public checkPost = 0;
  public checkPostDB = 0;
  public checkPostNow = 0;
  public all30 = 0;
  public all60 = 0;
  public all90 = 0;
  public check30 = 0;
  public check30DB = 0;
  public check30Now = 0;
  public check60 = 0;
  public check60Now = 0;
  public check60DB = 0;
  public check90 = 0;
  public check90DB = 0;
  public check90Now = 0;
  public allCheck30 = 0;
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
        if (this.userChecklists[0].lists[i].checked == true) {
          if (
            this.userChecklists[0].lists[i].tags[0].title == "Pre-Onboarding"
          ) {
            this.checkPreDB++;
            this.allPre++;
          } else if (
            this.userChecklists[0].lists[i].tags[0].title == "Onboarding"
          ) {
            this.checkOnbrdDB++;
            this.allOnbrd++;
          } else if (
            this.userChecklists[0].lists[i].tags[0].title == "Post-Onboarding"
          ) {
            this.checkPostDB++;
            this.allPost++;
          }

          if (this.userChecklists[0].lists[i].tags[1]?.title == "30 Days") {
            this.check30DB++;
            this.all30++;
          } else if (
            this.userChecklists[0].lists[i].tags[1]?.title == "60 Days"
          ) {
            this.check60DB++;
            this.all60++;
          } else if (
            this.userChecklists[0].lists[i].tags[1]?.title == "90 Days"
          ) {
            this.check90DB++;
            this.all90++;
          }
        } else {
          if (
            this.userChecklists[0].lists[i].tags[0].title == "Pre-Onboarding"
          ) {
            this.allPre++;
          } else if (
            this.userChecklists[0].lists[i].tags[0].title == "Onboarding"
          ) {
            this.allOnbrd++;
          } else if (
            this.userChecklists[0].lists[i].tags[0].title == "Post-Onboarding"
          ) {
            this.allPost++;
          }

          if (this.userChecklists[0].lists[i].tags[1]?.title == "30 Days") {
            this.all30++;
          } else if (
            this.userChecklists[0].lists[i].tags[1]?.title == "60 Days"
          ) {
            this.all60++;
          } else if (
            this.userChecklists[0].lists[i].tags[1]?.title == "90 Days"
          ) {
            this.all90++;
          }
        }
      }
      this.all = this.allPre + this.allOnbrd + this.allPost;
      this.allCheck = this.checkPreDB + this.checkOnbrdDB + this.checkPostDB;
      this.allCheck = parseInt(((this.allCheck / this.all) * 100).toString());

      this.checkPre = this.checkPreDB;
      this.checkOnbrd = this.checkOnbrdDB;
      this.checkPost = this.checkPostDB;
      this.check30 = this.check30DB;
      this.check60 = this.check60DB;
      this.check90 = this.check90DB;
      this.totPost = parseInt(
        (((this.allPre + this.allOnbrd) / this.all) * 100).toString()
      );
      this.totOnbrd = parseInt(((this.allPre / this.all) * 100).toString());
    });
    this.onCheckboxChange;
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
          if (this.targetID[0] == "Pre-Onboarding") {
            this.checkPreNow++;
            this.checkPre = this.checkPreDB + this.checkPreNow;
          }
          if (this.targetID[0] == "Onboarding") {
            this.checkOnbrdNow++;
            this.checkOnbrd = this.checkOnbrdDB + this.checkOnbrdNow;
          }
          if (this.targetID[0] == "Post-Onboarding") {
            this.checkPostNow++;
            this.checkPost = this.checkPostDB + this.checkPostNow;
          }
          if (this.userChecklists[0].lists[i].tags.length == 2) {
            this.targetID1 = new Array(50).fill(
              this.userChecklists[0].lists[i].tags[1].title
            );

            if (this.targetID1[0] == "30 Days") {
              this.check30Now++;
              this.check30 = this.check30DB + this.check30Now;
            }

            if (this.targetID1[0] == "60 Days") {
              this.check60Now++;
              this.check60 = this.check60DB + this.check60Now;
            }

            if (this.targetID1[0] == "90 Days") {
              this.check90Now++;
              this.check90 = this.check90DB + this.check90Now;
            }
          }
        } else if (e.target.checked == false) {
          this.points = this.points - 10;
          this.alerts.push({
            type: "danger",
            message: "You've lost 10 coins!",
          });
          if (this.targetID[0] == "Pre-Onboarding") {
            this.checkPreNow--;
            this.checkPre = this.checkPreDB + this.checkPreNow;
          }
          if (this.targetID[0] == "Onboarding") {
            this.checkOnbrdNow--;
            this.checkOnbrd = this.checkOnbrdDB + this.checkOnbrdNow;
          }
          if (this.targetID[0] == "Post-Onboarding") {
            this.checkPostNow--;
            this.checkPost = this.checkPostDB + this.checkPostNow;
          }
          if (this.userChecklists[0].lists[i].tags.length == 2) {
            this.targetID1 = new Array(50).fill(
              this.userChecklists[0].lists[i].tags[1].title
            );
            if (this.targetID1[0] == "30 Days") {
              this.check30Now--;
              this.check30 = this.check30DB + this.check30Now;
            }
            if (this.targetID1[0] == "60 Days") {
              this.check60Now--;
              this.check60 = this.check60DB + this.check60Now;
            }
            if (this.targetID1[0] == "90 Days") {
              this.check90Now--;
              this.check90 = this.check90DB + this.check90Now;
            }
          }
        }
        this.allCheck =
          this.checkPreDB +
          this.checkPreNow +
          this.checkOnbrdDB +
          this.checkOnbrdNow +
          this.checkPostDB +
          this.checkPostNow;
        var pre = ((this.checkPreDB + this.checkPreNow) / this.allPre) * 33.3;
        var onb =
          ((this.checkOnbrdDB + this.checkOnbrdNow) / this.allOnbrd) * 33.3;
        var post =
          ((this.checkPostDB + this.checkPostNow) / this.allPost) * 33.3;
        this.allCheck = pre + onb + post;

        this.checklist.updateUserChecklists(this.userChecklists).subscribe(
          () => {},
          (error: any) => {
            console.log(error);
          }
        );
      }
    }

    // if (this.checkPreNow == this.allPre) {
    //   this.points = this.points + 50;
    //   this.alerts.push({
    //     type: "primary",
    //     message: "You've gained 50 coins!",
    //   });
    // }
    // if (this.checkOnbrdNow == this.allOnbrd) {
    //   this.points = this.points + 100;
    //   this.alerts.push({
    //     type: "primary",
    //     message: "You've gained 100 coins!",
    //   });
    // }
    // if (this.checkPostNow == this.allPost) {
    //   this.points = this.points + 150;
    //   this.alerts.push({
    //     type: "primary",
    //     message: "You've gained 150 coins!",
    //   });
    // }
    setTimeout(() => {
      for (i = 0; i < this.alerts.length; i++) {
        this.alerts.splice(i, 1);
      }
    }, 3000);
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
