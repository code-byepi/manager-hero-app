import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {User} from "../interfaces/user.interface";
import {catchError, map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseURL;
  private user?: User;

  constructor(private http: HttpClient) { }

  
  get currentUser():User|undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  // método de autentificacion. Guardar en el localStorage. A tener en cuenta: los tokens se deberian de guardar en cookies que pasen por https
  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user), // almaceno objeto user
        tap(user =>localStorage.setItem('token', user.id.toString())), // grabar id del usuario
      );
  }

  checkAuthentication(): Observable<boolean>{
    // verifico existencia de token en el localStorage
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    // solicitud de servicio
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user), //  almaceno objeto user
        map(user => !!user ), // convierto el objeto user en booleano.
        catchError(error => of(false) ) // manejo errores
      )
  }

  // método para cerrar sesión . Elimino datos de sesión local
  logout() {
    this.user = undefined;
    localStorage.clear();
  }



}
