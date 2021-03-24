import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AboutService } from "./about.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  public data;
  public sections;

  loading = false;

  constructor(private page: AboutService) {}

  ngOnInit() {
    this.loading = true;

    this.page.getData().subscribe(data => {
      this.data = data;
      this.loading = false;
    });
  }
}
