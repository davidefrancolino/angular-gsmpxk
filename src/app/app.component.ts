import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, interval, Observable, Subscription } from 'rxjs';
import { map, throttle, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  lessons$: Observable<string>;
  @ViewChild('myname') input: ElementRef;

  output: Array<any>[] = [];

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event) => event.target.value),
        //debounceTime(1500)
        throttle(() => interval(3000))
      )
      .subscribe((res) => this.output.push(res));
  }
}
