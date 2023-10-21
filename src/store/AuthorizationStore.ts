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
    const loginUsername = ref('admin')
    const loginPassword = ref('admin')
    const loginUsernameRules = [
        (v: string) => !!v || 'Pole login jest wymagane'
    ]
    const loginPasswordRules = [
        (v: string) => !!v || 'Pole hasło jest wymagane',
        (v: string) => v.length > 3 || 'Hasło musi być dłuższe niz 3 znaki'
    ]
    const loginSuccessful = ref(true)
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
            const decodedToken: Token = jwt_decode(token.value)
            setCookie('token', response.data, decodedToken.exp)
            setCookie('currentUser', currentUser.value, decodedToken.exp)
            await router.push({ name: 'home' })
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

    return {
        loginUsername,
        loginPassword,
        loginUsernameRules,
        loginPasswordRules,
        loginSuccessful,
        currentUser,
        token,
        login,
        isUserLoggedIn,
        logout,
        setInitialData,
        getCurrentUser
    }
})