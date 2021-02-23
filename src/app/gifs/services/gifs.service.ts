import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = "2HPEvcImQzXacVtKEKz2uBHh3rZ9LMh1";
  private _historial: string[] = [];

  //TODO: cambiar
  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }
  constructor(private http: HttpClient) { }
  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=2HPEvcImQzXacVtKEKz2uBHh3rZ9LMh1&q=${query}&limit=10`)
      .subscribe((resp: any) => {
        console.log(resp);
        this.resultados = resp.data;
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
