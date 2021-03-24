import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import Explore from "../modules/explore/explore.data.json";
import About from "../modules/about/about.data.json";
import Checklist from "../modules/checklist/checklist.data.json";

@Injectable({
  providedIn: "root"
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const explore = Explore;
    const about = About;
    const checklist = Checklist;
    return { explore, about, checklist };
  }
}
