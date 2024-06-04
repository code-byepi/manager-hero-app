import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hero} from "../interfaces/hero.interface";
import {environments} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl = environments.baseURL;

  constructor(private http: HttpClient) { }

  // primer endpoint
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
}
