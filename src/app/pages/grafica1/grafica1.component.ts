import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
    
  ]
})
export class Grafica1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  label1: string[] = ['fpx','ig','dk']

  data = {
    labels: this.label1,
    datasets: [
      { data: [ 250, 450, 100 ],
        backgroundColor: [
          "#FF4700","#E600FA","#0D42FB"
       
      ],
    }
    ]
  };


}
