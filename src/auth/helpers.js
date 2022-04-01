import { parse } from 'ipaddr.js'
import cookie from 'js-cookie'

//set in cookie
export const setCookie = (key,value) => {
    if(window !== 'undefined') {
        cookie.set(key,value, {expires: 1 })
    }
}


//remove the cookie
export const removeCookie = (key) => {
    if(window !== 'undefined') {
        cookie.remove(key, {expires: 1 })
    }
}

// get from cookie such as stored token it will be useful when we need to maje request to server with token
export const getCookie = (key) => {
    if(window !== 'undefined') {
        return cookie.get(key)
    }
}

//set in localstorage
export const setLocalStorage = (key,value) => {
    if(window !== 'undefined') {
       localStorage.setItem(key, JSON.stringify(value));
    }
}

//remove from localstorage
export const removeLocalStorage = (key) => {
    if(window !== 'undefined') {
       localStorage.removeItem(key)
    }
}

//authenticate user by passing data tpo cookie and local storage during signin
export const authenticate = (response, next) => {
    console.log('Authenticate helper on sigin response',response);
    setCookie('token',response.data.token)
    setLocalStorage('user',response.data.user)
    next();
}


//access user info from local storage
export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }else {
                return false;
            }
        }
    }
}

export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
    next();
}

export const updateUser = (res, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', res)
    if(typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = res.data;
        localStorage.setItem('user', JSON.stringify(auth));

    }
    next();
};