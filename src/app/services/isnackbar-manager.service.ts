//Para notificar o usuario mostrando que a tarefa foi realizada com sucesso
export interface ISnackbarManagerService {
  show(message: string, action?: string, duration?: number):void
}
