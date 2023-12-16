import { defineStore } from "pinia";
import {computed, ref} from "vue";
import {SubmitEventPromise} from "vuetify";
import axios from "@/axios/axios";
import router from "../router/index";

interface User {
    id: number,
    email: string,
    username: string
}
export const useAuthorizationStore = defineStore('authorization', () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const loginEmail = ref('')
    const loginPassword = ref('')
    const loginEmailRules = [
        (v: string) => !!v || 'Pole email jest wymagane',
        (v: string) => emailRegex.test(v) || 'Nieprawidłowy format maila',
    ]
    const loginPasswordRules = [
        (v: string) => !!v || 'Pole hasło jest wymagane',
        (v: string) => v.length >= 8 || 'Hasło musi posiadać co najmniej 8 znaków'
    ]
    const loginError = ref('')
    const registerUsername = ref('')
    const registerEmail = ref('')
    const registerPassword = ref('')
    const registerConfirmPassword = ref('')
    const sendResetPasswordEmailEmail = ref('')
    const resetPasswordPassword = ref('')
    const resetPasswordConfirmPassword = ref('')
    const registerUsernameRules = [
        (v: string) => !!v || 'Pole login jest wymagane'
    ]
    const registerEmailRules = [
        (v: string) => !!v || 'Pole email jest wymagane',
        (v: string) => emailRegex.test(v) || 'Nieprawidłowy format maila',
    ]
    const registerPasswordRules = [
        (v: string) => !!v || 'Pole hasło jest wymagane',
        (v: string) => v.length >= 8 || 'Hasło musi posiadać co najmniej 8 znaków'
    ]
    const registerConfirmPasswordRules = [
        (v: string) => !!v || 'Pole powtórz hasło jest wymagane',
        (v: string) => v.length >= 8 || 'Hasło musi posiadać co najmniej 8 znaków',
        (v: string) => v === registerPassword.value || 'Hasła nie są jednakowe'
    ]
    const sendResetPasswordEmailEmailRules = [
        (v: string) => !!v || 'Pole email jest wymagane',
        (v: string) => emailRegex.test(v) || 'Nieprawidłowy format maila',
    ]
    const resetPasswordPasswordRules = [
        (v: string) => !!v || 'Pole hasło jest wymagane',
        (v: string) => v.length >= 8 || 'Hasło musi posiadać co najmniej 8 znaków',
    ]
    const resetPasswordConfirmPasswordRules = [
        (v: string) => !!v || 'Pole powtórz hasło jest wymagane',
        (v: string) => v.length >= 8 || 'Hasło musi posiadać co najmniej 8 znaków',
        (v: string) => v === resetPasswordPassword.value || 'Hasła nie są jednakowe'
    ]
    const loginMessageStatus = ref('')
    const registerError = ref('')
    const showResetEmailSendMessage = ref(false)
    const currentUser = ref<User>()
    const disableLoginBtn = ref(false)
    const disableRegisterBtn = ref(false)
    const disableSendResetPasswordEmailBtn = ref(false)
    const disableResetPasswordBtn = ref(false)
    async function login(event: SubmitEventPromise) {
        const validated = await event
        if (!validated.valid) {
            return
        }
        try {
            disableLoginBtn.value = true
            const response = await axios.post('/users/login', {
                email: loginEmail.value,
                password: loginPassword.value
            })
            loginError.value = ''
            currentUser.value = response.data
            loginMessageStatus.value = ''
            setCookie('currentUser', JSON.stringify(response.data), response.data.exp)
            setCookie('token', generateToken(), response.data.exp)
            await router.push({ name: 'home' })
        } catch (error) {
            loginError.value = 'Nieprawidłowe dane logowania'
        }
        disableLoginBtn.value = false
    }

    function generateToken() {
        return btoa(`${loginEmail.value}:${loginPassword.value}`)
    }

    async function register(event: SubmitEventPromise) {
        const validated = await event
        if (!validated.valid) {
            return
        }
        try {
            disableRegisterBtn.value = true
            await axios.post('/users/register', {
                email: registerEmail.value,
                username: registerUsername.value,
                password: registerPassword.value
            });
            loginMessageStatus.value = 'accountCreated'
            registerError.value = ''
            await router.push({ name: 'login' });
        } catch (error) {
            if (error.response.data === 'User with this email already exists'){
                registerError.value = 'Ten email jest już zajęty'
            }
            else if (error.response.data === 'User already exists'){
                registerError.value = 'Ta nazwa użytkownika jest już zajęta'
            }
        }
        disableRegisterBtn.value = false
    }

    async function logout() {
        loginError.value = ''
        currentUser.value = <User>{}
        deleteCookie('currentUser')
        deleteCookie('token')
        await router.push({ name: 'home' })
        location.reload()
    }

    function setCookie(name: string, value: string, expirationTimestamp: number) {
        if (getCookie(name)) {
            deleteCookie(name)
        }
        document.cookie = `${name}=${value}; expires=${getDateFromTimestamp(expirationTimestamp)}; path=/`
    }

    function getDateFromTimestamp(timestamp: number) {
        return new Date(timestamp)
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
        const user = getCookie('currentUser')
        if (user) {
            currentUser.value = JSON.parse(user)
        }
    }

    async function confirmRegistration(token: string) {
        try {
            await axios.post('/users/confirm-registration', {
                token: token
            });
            loginMessageStatus.value = 'registrationConfirmed'
            await router.push({ name: 'login' })
        } catch (error) {
            //
        }
    }

    async function sendResetPasswordEmail(event: SubmitEventPromise) {
        const validated = await event
        if (!validated.valid) {
            return
        }
        try {
            disableSendResetPasswordEmailBtn.value = true
            await axios.post('/users/reset-password', {
                email: sendResetPasswordEmailEmail.value,
            });
            showResetEmailSendMessage.value = true
        } catch (error) {
            //
        }
        disableSendResetPasswordEmailBtn.value = false
    }

    async function resetPassword(event: SubmitEventPromise) {
        const validated = await event
        if (!validated.valid) {
            return
        }
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        if (!token) {
            return
        }
        try {
            disableResetPasswordBtn.value = true
            await axios.post('/users/password-reset-confirmation', {
                password: resetPasswordPassword.value,
                token: token,
            });
            loginMessageStatus.value = 'passwordResetSuccessfully'
            await router.push({ name: 'login' })
        } catch (error) {
            //
        }
        disableResetPasswordBtn.value = false
    }

    return {
        loginEmail,
        loginPassword,
        loginEmailRules,
        loginPasswordRules,
        registerUsername,
        registerEmail,
        registerPassword,
        registerConfirmPassword,
        registerUsernameRules,
        registerEmailRules,
        registerPasswordRules,
        registerConfirmPasswordRules,
        loginError,
        currentUser,
        getCurrentUser,
        loginMessageStatus,
        registerError,
        sendResetPasswordEmailEmail,
        sendResetPasswordEmailEmailRules,
        resetPasswordPassword,
        resetPasswordConfirmPassword,
        resetPasswordPasswordRules,
        resetPasswordConfirmPasswordRules,
        showResetEmailSendMessage,
        disableLoginBtn,
        disableRegisterBtn,
        disableSendResetPasswordEmailBtn,
        disableResetPasswordBtn,
        login,
        isUserLoggedIn,
        logout,
        setInitialData,
        register,
        confirmRegistration,
        sendResetPasswordEmail,
        resetPassword,
        getCookie
    }
})