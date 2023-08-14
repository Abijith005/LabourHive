import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  async showConfirmation(title: string, text: string,icon:string): Promise<boolean> {
    try {      
      const result = await Swal.fire({
        title,
        text,
        icon:icon=='success'?'success':(icon=='warning'?'warning':'error'),
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      });
      return result.isConfirmed;
      
    } catch (error) {
      console.log('Error',error);
      return false
    }
  }
  async showAlert(title: string, text: string,icon:string): Promise<boolean> {
    try {      
      const result = await Swal.fire({
        title,
        text,
        icon:icon=='success'?'success':(icon=='warning'?'warning':'error'),
        confirmButtonColor: '##00A000',
        confirmButtonText: 'Ok',
        reverseButtons: true,
      });
      return result.isConfirmed;
      
    } catch (error) {
      console.log('Error',error);
      return false
    }
  }
}
