import { ComponentType } from "@angular/cdk/portal";
import { YesNoDialogComponent } from "../commons/components/yes-no-dialog/yes-no-dialog.component";
import { Observable } from "rxjs";


export interface IDialogManagerService {

  showYesNoDialog(component: ComponentType<YesNoDialogComponent>, data: { title: string, content: string }): Observable<any>


}

