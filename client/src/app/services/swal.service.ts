import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  async showConfirmation(title: string, text: string): Promise<boolean> {
    try {
      const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
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
}
