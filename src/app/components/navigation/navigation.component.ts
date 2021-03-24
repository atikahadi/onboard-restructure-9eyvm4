import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../../services/authentication/authentication.service";
import { User } from "../../services/user/user.model";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      user => (this.currentUser = user)
    );
  }

  ngOnInit() {}

  toggleMenu() {
    document.getElementById("menu-overlay").classList.toggle("invisible");
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }
}
