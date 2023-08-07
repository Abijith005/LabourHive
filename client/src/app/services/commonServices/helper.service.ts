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
            autoCloseDelay: 1800, // optional
            textPosition: 'center', // optional
            // layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
            layoutType: layoutType,
            progressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
            toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
            animationIn: AppearanceAnimation.ELASTIC, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
            animationOut: DisappearanceAnimation.ZOOM_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
            // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
            toastPosition: ToastPositionEnum.TOP_CENTER,
            allowHtmlMessage: true,
        });

        // Simply open the popup
        newToastNotification.openToastNotification$();
    }

}