import { Injectable } from '@angular/core';
import {  IndividualConfig, ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastrService) { }
  private individualConfig: Partial<IndividualConfig> = {
    positionClass: 'toast-top-right',
    progressBar: true,
    closeButton: true,
    onActivateTick: true,
    enableHtml: true,
  };

  showToast(message:string,title:string,type:string)
  {
    this.toast.show(message,title,this.individualConfig,type);
  }
}
