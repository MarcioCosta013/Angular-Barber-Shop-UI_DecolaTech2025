import { Injectable } from '@angular/core';
import { IClienteService } from './iclients.service';
import { Observable } from 'rxjs';
import { SaveClientResquest, SaveClientResponse, UpdateClientResquest, UpdateClientResponse, ListClientResponse, DetailClientResponse } from './client.models';
import { HttpClient } from '@angular/common/http';
import { envoronment } from '../../../../envoronments/envoronment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService implements IClienteService{

  private readonly basePath = envoronment.apiUrl

  constructor( private http: HttpClient) { }
  save(request: SaveClientResquest): Observable<SaveClientResponse> {
    return this.http.post<SaveClientResponse>(`${this.basePath}clients`, request)
  }
  update(id: number, request: UpdateClientResquest): Observable<UpdateClientResponse> {
    return this.http.put<SaveClientResponse>(`${this.basePath}clients/${id}`, request)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}clients${id}`)
  }
  list(): Observable<ListClientResponse[]> {
    return this.http.get<ListClientResponse[]>(`${this.basePath}clients`)
  }
  findById(id: number): Observable<DetailClientResponse> {
    return this.http.get<DetailClientResponse>(`${this.basePath}clients${id}`)
  }
}
