import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse, SearchGifsRandomResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = "2HPEvcImQzXacVtKEKz2uBHh3rZ9LMh1";
  private _historial: string[] = [];
  public resultados: Gif[] = [];
  private servicioBuscarUrl : string= "https://api.giphy.com/v1/gifs"
  private servicioBuscarTrendyUrl : string= "https://api.giphy.com/v1/gifs/trending"
  private servicioBuscarRandomUrl : string= "https://api.giphy.com/v1/gifs/random"

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("limit", "9")
      .set("q", query)

    console.log(params.toString())

    this.http.get<SearchGifsResponse>(`${this.servicioBuscarUrl}/search`,{params : params})
      .subscribe((resp) => {
        console.log(resp);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }

  buscarTrendyGifs() {
    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("limit", "12")

    console.log(params.toString())

    this.http.get<SearchGifsResponse>(`${this.servicioBuscarTrendyUrl}`,{params : params})
      .subscribe((resp) => {
        console.log(resp);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }

  buscarRandom() {
    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("limit", "12")

    console.log(params.toString())

    this.http.get<SearchGifsRandomResponse>(`${this.servicioBuscarRandomUrl}`,{params : params})
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}


