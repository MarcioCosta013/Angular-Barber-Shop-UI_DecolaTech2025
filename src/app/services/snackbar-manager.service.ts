import { Injectable } from '@angular/core';
import { ISnackbarManagerService } from './isnackbar-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarManagerService implements ISnackbarManagerService {

  constructor(private readonly snackBar: MatSnackBar) { }

  show(message: string, action: string = 'fechar', duration: number = 3000): void { //Valores padrão tem que ser declarados na implementação pq na interface não é permitido.
    this.snackBar.open(message, action, { duration , verticalPosition: 'top', horizontalPosition: 'right'})
  }

  /*
  * Sempre que for criado um serviço tem que registrar ele no 'service.token.ts'.
  */
}
