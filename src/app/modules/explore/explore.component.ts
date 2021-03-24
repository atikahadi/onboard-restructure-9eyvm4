import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ExploreService } from "./explore.service";

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ExploreComponent implements OnInit {
  public data;
  public sections;

  loading = false;

  triple: Array<any> = [];
  double: Array<any> = [];
  single: Array<any> = [];

  constructor(private page: ExploreService) {}

  ngOnInit() {
    this.loading = true;

    this.page.getData().subscribe(data => {
      this.data = data;
      this.loading = false;

      for (var i = 0; i < this.data[0].page[2].contents.length; i++) {
        this.triple.push({
          cont: this.data[0].page[2].contents[i],
          link: this.data[0].page[3].links[i]
        });

        this.double.push({
          cont: this.data[0].page[2].contents[i],
          link: this.data[0].page[3].links[i]
        });

        this.single.push({
          cont: this.data[0].page[2].contents[i],
          link: this.data[0].page[3].links[i]
        });
      }
      this.triple = chunk(this.triple, 3);
      this.double = chunk(this.double, 2);
      this.single = chunk(this.single, 1);
    });

    function chunk(items, size) {
      var results = [];

      while (items.length) {
        results.push(items.splice(0, size));
      }
      return results;
    }
  }
}
