import { Injectable } from "@angular/core";
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation, ToastNotificationInitializer, ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from "@costlydeveloper/ngx-awesome-popup";

@Injectable({
    providedIn: 'root'
})

export class HelperService {

    constructor() {

    }

    showToaster( message: string,success:boolean ) {

        const layoutType=success?DialogLayoutDisplay.SUCCESS:DialogLayoutDisplay.DANGER
        const title=success?'Success!!':'Failed!!'
        const newToastNotification = new ToastNotificationInitializer();

        newToastNotification.setTitle(title);
        newToastNotification.setMessage(message);

        // Choose layout color type
        newToastNotification.setConfig({
            autoCloseDelay: 1800, 
            textPosition: 'center',
            layoutType: layoutType,
            progressBar: ToastProgressBarEnum.INCREASE, 
            toastUserViewType: ToastUserViewTypeEnum.SIMPLE, 
            animationIn: AppearanceAnimation.ELASTIC, 
            animationOut: DisappearanceAnimation.ZOOM_OUT,
            toastPosition: ToastPositionEnum.TOP_CENTER,
            allowHtmlMessage: true,
        });

        // Simply open the popup
        newToastNotification.openToastNotification$();
    }

}