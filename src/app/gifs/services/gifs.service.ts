import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interfce';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'QkK1gpm286zOcZhhCUicbLpn6fXoBObV'
  private _historial: string[]= [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string) {
    
    if(query.trim().length === 0){ return;}
    
    query = query.trim().toLowerCase()
    
    if(!this.historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
    
    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=QkK1gpm286zOcZhhCUicbLpn6fXoBObV&q=${query}&limit=10`)
        .subscribe((resp) =>{
          console.log(resp.data)
          this.resultados = resp.data;
        })
  }

}
