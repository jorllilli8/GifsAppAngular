import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interfce';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'QkK1gpm286zOcZhhCUicbLpn6fXoBObV'
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[]= [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient) {
      this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
      this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];
    }

  buscarGifs(query: string) {
    
    if(query.trim().length === 0){ return;}
    
    query = query.trim().toLowerCase()
    
    if(!this.historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem("historial",JSON.stringify(this._historial))
    }

    const params = new HttpParams().set("api_key",this.apiKey).set("limit","10").set("q",query);
    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`,{params: params})
        .subscribe((resp) =>{
          console.log(resp.data)
          this.resultados = resp.data;
          localStorage.setItem("resultados",JSON.stringify(this.resultados))
        })
  }

  removeHistorial(){
    this._historial=[];
    this.resultados=[];
  }

}
