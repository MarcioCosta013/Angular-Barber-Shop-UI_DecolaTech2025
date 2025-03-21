import { Component, Inject, OnDestroy } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { IClienteService } from '../../services/api-client/clients/iclients.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientModelForm } from '../client.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ClientFormComponent } from '../components/client-form/client-form.component';


@Component({
  selector: 'app-new-client',
  imports: [ClientFormComponent],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss',
  providers:[
    {provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService},
    {provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService}
  ]
})
export class NewClientComponent implements OnDestroy{

  private httpSubscription?: Subscription //Criada para se o usuario conseguir salvar os dados ele limpar os campos para evitar vazamento de memoria e para liberar recursos.

  //injetando a serviços registrados no 'service.token' nos componetes
  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClienteService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManage: ISnackbarManagerService,
    private readonly router: Router
  ){}

  ngOnDestroy(): void {
    if(this.httpSubscription){ //Para verificar se ela não está null
      this.httpSubscription.unsubscribe()
    }
  }

  //metodo que escuta o evento
  onSubmitClient(value: ClientModelForm){
    const {id, ...request} = value //Fazendo uma desconstrução do Objeto, fazendo que só tenha o nome, email e phone...
    this.httpSubscription =this.httpService.save(request).subscribe(_ =>{
      this.snackBarManage.show('Usuario cadastrado com Sucesso')
      this.router.navigate(['client/list']) //se der tudo certo redirecionar para outra pagina...
    })
  }
}
