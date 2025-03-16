import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientModelForm } from '../../client.models';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxMaskDirective
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {

  //Usado para ler coisas que são passadas de um componentes para o outro.(Para esse no caso)
  @Input() client: ClientModelForm = {id: 0, name:'', email:'', phone:''}

  //Usado para disparar eventos para serem escutados por outros componentes
  @Output() clientSubmited = new EventEmitter<ClientModelForm>();

  //Esse é um evento
  onSubmit(_: NgForm){
    this.clientSubmited.emit(this.client)
  }
}
