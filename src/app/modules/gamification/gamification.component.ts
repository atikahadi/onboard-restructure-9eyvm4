import { TemplateRef } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-gamification",
  templateUrl: "./gamification.component.html",
  styleUrls: ["./gamification.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class GamificationComponent implements OnInit {
  name = "Unicornssss!";
  popup = true;
  @ViewChild("gender", { static: true }) gender: TemplateRef<any>;
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.open(this.gender);
  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
    });
  }
}
