import { TemplateRef } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "app/services/authentication/authentication.service";

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
  @ViewChild("gender", { static: true }) gender: TemplateRef<any>;
  constructor(private modalService: NgbModal, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    if (this.authenticationService.currentUserValue.game == false) {
      this.open(this.gender);
    } else {
      this.popup = false;
    }
  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
    });
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

  // openWindowCustomClass(shopModal) {
  //   this.modalService.open(shopModal, { windowClass: 'shopModal' });
  // }
}
