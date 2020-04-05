import Axios from "axios";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        console.log('username' + username + 'password' + password)
        return Axios.post('http://134.209.145.176:8080/authenticate', {
            username,
            password
        })
    }

    registerSuccessfulLogin(username, password) {
        console.log('register successful login')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors()

    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    createJwtToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        console.log(user)
        if (user === null) {
            console.log(user)
            return false
        } else {
            console.log(user)
            return true
        }
    }


    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) {
            return ''
        } else {
            return user
        }
    }


    setupAxiosInterceptors(token) {
        // let username = 'mamba'
        // let password = 'mamba123'
        //  let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        console.log('setupAxiosInterceptors' + token)
        Axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config

            }

        )
    }


}
export default new AuthenticationService()