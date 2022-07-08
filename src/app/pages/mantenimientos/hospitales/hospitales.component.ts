import { Component, OnInit } from '@angular/core';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  constructor(private busquedaService: BusquedasService) { }

  ngOnInit(): void {
  }

}
