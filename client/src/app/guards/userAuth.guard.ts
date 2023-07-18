import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";




export const authLogin: CanActivateFn = (route, state) => {
    const router = inject(Router)
    const token=localStorage.getItem('userLoggedIn')
    if (!token) {
        return true
    }
    else {
        router.navigate([''])
        return false
    }

}

export const register: CanActivateFn = (route, state) => {
    return true
}
