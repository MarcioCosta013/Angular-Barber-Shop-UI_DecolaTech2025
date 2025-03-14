import { InjectionToken } from "@angular/core";
import { IClienteService } from "./api-client/clients/iclients.service";


//Para fazer a injeção de dependencias nos componentes
export const SERVICES_TOKEN = {
  HTTP:{
    CLIENT: new InjectionToken<IClienteService>('SERVICES_TOKEN.HTTP.CLIENT'),
    //SCHEDULES: new InjectionToken<ISchedulesService>('SERVICES_TOKEN.HTTP.SCHEDULES'),
  }
}
