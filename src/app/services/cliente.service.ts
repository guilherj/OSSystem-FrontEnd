import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../models/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: String = environment.baseUrl;

  constructor(private http : HttpClient,
    private snack: MatSnackBar) { }

  findAll():Observable<Cliente[]> {
    const url = this.baseUrl + "/clientes";
    return this.http.get<Cliente[]>(url);
  }

  findById(id: any):Observable<Cliente>{
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.get<Cliente>(url);
  }

  create(tecnico: Cliente):Observable<Cliente> {
    const url = this.baseUrl + "/clientes";

    return this.http.post<Cliente>(url, tecnico);
  }

  update(tecnico: Cliente):Observable<Cliente> {
    const url = `${this.baseUrl}/clientes/${tecnico.id}`;
    return this.http.put<Cliente>(url, tecnico);
  }

  delete(id: any):Observable<void> {
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.delete<void>(url);

  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })

  }
}
