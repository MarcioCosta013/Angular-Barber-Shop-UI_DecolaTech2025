import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ClientModelTable } from '../../client.models';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import DialogManagerService from '../../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { CustomPaginator } from './custom-paginator';


@Component({
  selector: 'app-client-table',
  imports: [MatIconModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatButtonModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss',
  providers: [
    {provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService},
    {provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]
})
export class ClientTableComponent implements AfterViewInit, OnChanges, OnDestroy{

  @Input() clients: ClientModelTable[] = []

  dataSource!: MatTableDataSource<ClientModelTable> //Guarda a lista de clientes para ser usada na tabela.

  @ViewChild(MatPaginator) paginator!: MatPaginator; //Configuração do componente do angular para acompanhar o metodo paginator.

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'] // Define quais colunas aparecerão na tabela.

  private dialogMenagerServiceSubscritions?: Subscription //Guarda a assinatura da caixa de diálogo para evitar vazamentos de memória.

  @Output() onConfirmDelete = new EventEmitter<ClientModelTable>() //Envia um aviso quando um cliente é excluído
  @Output() onRequestUpdate = new EventEmitter<ClientModelTable>() //Envia um aviso quando um cliente precisa ser atualizado.

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService,
  ){  }

  ngAfterViewInit(): void {
    //Executa algo depois que a tela aparece.
    this.dataSource.paginator = this.paginator
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Executa algo quando as informações mudam.
    if(changes['clients'] && this.clients){
      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients)
      if(this.paginator){
        this.dataSource.paginator = this.paginator
      }
    }
    //Se a lista de clientes mudar, atualizamos a tabela.
  }

  ngOnDestroy(): void {
    //Executa algo antes de o componente sumir.
    if(this.dialogMenagerServiceSubscritions){
      this.dialogMenagerServiceSubscritions.unsubscribe()
    }
    //Antes de o componente desaparecer, cancelamos qualquer assinatura ativa para evitar problemas de memória.
  }

  formatPhone(phone: string) {
    return`( ${phone.substring(0,2)} ) ${phone.substring(2,7)} - ${phone.substring(7)}` //formatando a visualização do celular
    //Essa função recebe um número de telefone e o formata assim: (99) 99999-9999.
  }

  update(client: ClientModelTable){
    this.onRequestUpdate.emit(client)
    //Quando clicamos no botão de atualizar, avisamos que um cliente precisa ser atualizado.
  }

  delete(client: ClientModelTable){
    this.dialogManagerService.showYesNoDialog(
      //Abre uma janelinha perguntando se o usuário tem certeza.
      YesNoDialogComponent,
      { title: 'Exclusão de cliente', content: `Confirma a exclusão do cliente ${client.name}` }
    )
      .subscribe((result: any) => {
        if(result){
          this.onConfirmDelete.emit(client) //Se o usuário confirmar, enviamos um aviso de que o cliente foi excluído.
          //Removemos o cliente da lista e atualizamos a tabela...
          const updatedList = this.dataSource.data.filter(c => c.id !== client.id)
          this.dataSource = new MatTableDataSource<ClientModelTable>(updatedList)
        }
      });
  }

}
