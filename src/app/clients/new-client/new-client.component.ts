import { Component, Inject } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { IClienteService } from '../../services/api-client/clients/iclients.service';
import { SERVICES_TOKEN } from '../../services/service.token';

@Component({
  selector: 'app-new-client',
  imports: [],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss',
  providers:[
    {provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService}
  ]
})
export class NewClientComponent {
  //injetando a service nos componetes
  constructor(@Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClienteService){}
}
