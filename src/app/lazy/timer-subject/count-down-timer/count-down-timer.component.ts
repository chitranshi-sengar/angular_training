import { Component, Input, OnInit } from "@angular/core";
import { Timer, TimerService } from "src/app/services/timer.services";

@Component({
  selector: "app-count-down-timer",
  templateUrl: "./count-down-timer.component.html",
  styleUrls: ["./count-down-timer.component.scss"],
})
export class CountDownTimerComponent implements OnInit {
  @Input() timer: Timer;
  interval: any;
  showValue: number;
  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.timerService.timer.subscribe((data) => {
      if (data) {
        if (data.timer === null) {
          clearInterval(this.interval);
          this.showValue = null;
        }
        if (data.timer && data.start) {
          this.showValue = this.showValue ? this.showValue : data.timer;
          let timer = this.showValue;
          this.interval = setInterval(() => {
            this.showValue = --timer;
          }, 1000);
          setTimeout(() => {
            clearInterval(this.interval);
          }, this.showValue * 1000);
        }
        if (!data.start) {
          clearInterval(this.interval);
        }
      }
    });
  }
}
