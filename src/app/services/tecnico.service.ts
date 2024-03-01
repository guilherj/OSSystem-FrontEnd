import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/Tecnico';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  baseUrl: String = environment.baseUrl;

  constructor(private http : HttpClient,
    private snack: MatSnackBar) { }

  findAll():Observable<Tecnico[]> {
    const url = this.baseUrl + "/tecnicos";
    return this.http.get<Tecnico[]>(url);
  }

  findById(id: any):Observable<Tecnico>{
    const url = `${this.baseUrl}/tecnicos/${id}`;
    return this.http.get<Tecnico>(url);
  }

  create(tecnico: Tecnico):Observable<Tecnico> {
    const url = this.baseUrl + "/tecnicos";

    return this.http.post<Tecnico>(url, tecnico);
  }

  update(tecnico: Tecnico):Observable<Tecnico> {
    const url = `${this.baseUrl}/tecnicos/${tecnico.id}`;
    return this.http.put<Tecnico>(url, tecnico);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })

  }
}
