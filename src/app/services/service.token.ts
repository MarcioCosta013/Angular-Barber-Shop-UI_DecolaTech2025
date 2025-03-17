import { InjectionToken } from '@angular/core';
import { IClienteService } from './api-client/clients/iclients.service';
import DialogManagerService from './dialog-manager.service';
import { SnackbarManagerService } from './snackbar-manager.service';

//Para fazer a injeção de dependencias nos componentes
export const SERVICES_TOKEN = {
  //registro dos serviços
  HTTP: {
    CLIENT: new InjectionToken<IClienteService>('SERVICES_TOKEN.HTTP.CLIENT'),
    //SCHEDULES: new InjectionToken<ISchedulesService>('SERVICES_TOKEN.HTTP.SCHEDULES'),
  },
  SNACKBAR: new InjectionToken<SnackbarManagerService>(
    'SERVICES_TOKEN.SNACKBAR'
  ),
  DIALOG: new InjectionToken<DialogManagerService>('SERVICES_TOKEN.DIALOG'),
};
