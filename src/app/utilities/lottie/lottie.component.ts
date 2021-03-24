import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";

declare let require: any;
const lottie: any = require("lottie-web/build/player/lottie.js");

@Component({
  selector: "lottie-player",
  templateUrl: "./lottie.component.html",
  styleUrls: ["./lottie.component.css"]
})
export class LottieComponent implements AfterViewInit {
  constructor() {}

  @Input() class: any;
  @Input() id = "animation";
  @Input() src: string;
  @Input() background: string;
  @Input() speed = 1;
  @Input() loop = true;
  @Input() autoplay = true;
  @Input() renderer = "svg";

  @ViewChild("animation") animation: ElementRef;
  ngAfterViewInit() {
    let animation = lottie.loadAnimation({
      container: this.animation.nativeElement,
      renderer: this.renderer || "svg",
      speed: this.speed || 1,
      loop: this.loop || true,
      autoplay: this.autoplay || true,
      path: this.src
    });
  }
}
