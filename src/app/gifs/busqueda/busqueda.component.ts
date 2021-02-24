import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  //(!) not null assertion
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    if (valor.trim() === '')
      return;
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = "";
  }

  buscarTrendy() {
    this.gifsService.buscarTrendyGifs();
  }

  buscarRandom() {
    this.gifsService.buscarRandom();
  }
}
