import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { IClienteService } from '../../services/api-client/clients/iclients.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { ClientModelForm } from '../client.models';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
  providers:[
    {provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService},
    {provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService,}
  ]
})
export class EditClientComponent implements OnInit, OnDestroy {

  private httpSubscriptions: Subscription[] = []

  client: ClientModelForm = { id: 0, name: '', email: '', phone: '' }

  //Configuração de injeção de dependencia e o serviços configurados também...
  constructor(@Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClienteService,
              @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
              private router: Router,
              private activatedRoute: ActivatedRoute){}


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') //Para pegar o parametro na URL
    if(!id){
      this.snackBarManager.show('Erro ao recuperar informações do cliente')
      this.router.navigate(['clients/list'])
      return
    }

    this.httpSubscriptions?.push(this.httpService.findById(Number(id)).subscribe(data => this.client = data))
  }
  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe)
  }

  onSubmitClient(value: ClientModelForm){
    const {id, ...request} = value
    if(id){
      this.httpSubscriptions?.push(this.httpService.update(id, request).subscribe(_=>{
        this.snackBarManager.show('Usuário atualizado com sucesso')
        this.router.navigate(['clients/list'])
      }))
      return
    }
    this.snackBarManager.show('Um Erro inesperado aconteceu, tente novamente')
    this.router.navigate(['clients/list'])
  }
}
