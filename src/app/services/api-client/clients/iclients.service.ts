import { Observable } from "rxjs";
import { DetailClientResponse, ListClientResponse, SaveClientResponse, SaveClientResquest, UpdateClientResponse, UpdateClientResquest } from "./client.models";

export interface IClienteService {

  save(request: SaveClientResquest ): Observable<SaveClientResponse>

  update(id: number, request: UpdateClientResquest): Observable<UpdateClientResponse>

  delete(id: number): Observable<void>

  list(): Observable<ListClientResponse[]>

  findById(id: number):Observable<DetailClientResponse>
}
