import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = "2HPEvcImQzXacVtKEKz2uBHh3rZ9LMh1";
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];

    // if(localStorage.getItem("historial")){
    //   this._historial = JSON.parse(localStorage.getItem("historial")!);
    // }
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2HPEvcImQzXacVtKEKz2uBHh3rZ9LMh1&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log(resp);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}


//ejm async solo js
  // async buscarGifs(query: string) {
  //   query = query.trim().toLowerCase();
  //   if (!this._historial.includes(query)) {
  //     this._historial.unshift(query);
  //     this._historial = this._historial.splice(0, 10);
  //   }
  //   //ejemplo con solo js
  //   const resp = await fetch("https://api.giphy.com/v1/gifs/search?api_key=2HPEvcImQzXacVtKEKz2uBHh3rZ9LMh1&q=hola&limit=10")
  //   const data = await resp.json();
  //   console.log(data)
  // }
  //ejemplo con solo js
    // fetch("https://api.giphy.com/v1/gifs/search?api_key=2HPEvcImQzXacVtKEKz2uBHh3rZ9LMh1&q=hola&limit=10")
    //   .then(resp => {
    //     resp.json().then(data => {
    //       console.log(data)
    //     }
    //     )
    //   })
