import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
 


export class RxjsComponent implements OnDestroy{
  public intervalSubs: Subscription;

  constructor() {
   this.intervalSubs = this.retornaIntervalo()
    .subscribe()
   }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }



  retornaIntervalo(){

    return interval(1000)
    .pipe(take(10),
          filter(x => x % 2 === 1),
          map(x => x + 1))
  }


}
