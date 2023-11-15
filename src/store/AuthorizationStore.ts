import { defineStore } from "pinia";
import {computed, ref} from "vue";
import {SubmitEventPromise} from "vuetify";
import axios from "@/axios/axios";
import router from "../router/index";
import jwt_decode from "jwt-decode";


interface Token {
    exp: number,
    iat: number,
    sub: string,
}
export const useAuthorizationStore = defineStore('authorization', () => {
    const loginUsername = ref('')
    const loginPassword = ref('')
    const loginUsernameRules = [
        (v: string) => !!v || 'Pole login jest wymagane'
    ]
    const loginPasswordRules = [
        (v: string) => !!v || 'Pole hasło jest wymagane',
        (v: string) => v.length >= 8 || 'Hasło musi mieć co najmniej 8 znaków'
    ]
    const loginSuccessful = ref(true)
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const registerUsername = ref('')
    const registerEmail = ref('')
    const registerPassword = ref('')
    const registerConfirmPassword = ref('')
    const registerUsernameRules = [
        (v: string) => !!v || 'Pole login jest wymagane'
    ]
    const registerEmailRules = [
        (v: string) => !!v || 'Pole email jest wymagane',
        (v: string) => emailRegex.test(v) || 'Nieprawidłowy format maila',
    ]
    const registerPasswordRules = [
        (v: string) => !!v || 'Pole hasło jest wymagane',
        (v: string) => v.length > 3 || 'Hasło musi być dłuższe niz 3 znaki'
    ]
    const registerConfirmPasswordRules = [
        (v: string) => !!v || 'Pole hasło jest wymagane',
        (v: string) => v.length > 3 || 'Hasło musi być dłuższe niz 8 znaków',
        (v: string) => v === registerPassword.value || 'Hasła nie są jednakowe'
    ]
    const loginMessageStatus = ref('')
    const registerError = ref('')

    const currentUser= ref('')
    const token = ref('')
    async function login(event: SubmitEventPromise) {
        const validated = await event
        if (!validated.valid) {
            return
        }
        const response = await axios.post('/users/login', {
            username: loginUsername.value,
            password: loginPassword.value
        })
        if (response.data === 'Login unsuccessful') {
            loginSuccessful.value = false
        }
        else {
            loginSuccessful.value = true
            currentUser.value = loginUsername.value
            token.value = response.data
            loginMessageStatus.value = ''
            const decodedToken: Token = jwt_decode(token.value)
            setCookie('token', response.data, decodedToken.exp)
            setCookie('currentUser', currentUser.value, decodedToken.exp)
            await router.push({ name: 'home' })
        }
    }

    async function register(event: SubmitEventPromise) {
        const validated = await event
        if (!validated.valid) {
            return
        }
        const response = await axios.post('/users/register', {
            email: registerEmail.value,
            username: registerUsername.value,
            password: registerPassword.value
        });

        if (response.data === 'Success') {
            loginMessageStatus.value = 'accountCreated'
            registerError.value = ''
            await router.push({ name: 'login' });
        }
        else if (response.data === 'User with this email already exists'){
            registerError.value = 'Ten email jest już zajęty'
        }
        else if (response.data === 'User already exists'){
            registerError.value = 'Ta nazwa użytkownika jest już zajęta'
        }
    }

    async function logout() {
        loginSuccessful.value = false
        currentUser.value = ''
        token.value = ''
        deleteCookie('token')
        deleteCookie('currentUser')
        await router.push({ name: 'home' })
        location.reload()
    }

    function setCookie(name: string, value: string, expirationTimestamp: number) {
        document.cookie = `${name}=${value}; expires=${getDateFromTimestamp(expirationTimestamp)}`
    }

    function getDateFromTimestamp(timestamp: number) {
        return new Date(timestamp * 1000)
    }
    function deleteCookie(name: string) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
    }

    function getCookie(name: string) {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const [key, value] = cookies[i].split('=')
            if (key.trim() === name) {
                return value
            }
        }
        return ''
    }

    function isUserLoggedIn() {
        return !!currentUser.value
    }

    const getCurrentUser = computed(() => {
        return currentUser.value
    })

    function setInitialData() {
        currentUser.value = getCookie('currentUser')
        token.value = getCookie('token')
    }

    async function confirmRegistration(token: string) {
        const response = await axios.post('/users/confirm-registration', {
            token: token
        });
        if (response.data === 'Success') {
            loginMessageStatus.value = 'registrationConfirmed'
            await router.push({ name: 'login' })
        }
    }

    return {
        loginUsername,
        loginPassword,
        loginUsernameRules,
        loginPasswordRules,
        registerUsername,
        registerEmail,
        registerPassword,
        registerConfirmPassword,
        registerUsernameRules,
        registerEmailRules,
        registerPasswordRules,
        registerConfirmPasswordRules,
        loginSuccessful,
        currentUser,
        token,
        getCurrentUser,
        loginMessageStatus,
        registerError,
        login,
        isUserLoggedIn,
        logout,
        setInitialData,
        register,
        confirmRegistration
    }
})