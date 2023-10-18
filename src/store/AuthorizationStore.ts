import { defineStore } from "pinia";
import { ref } from "vue";
import {SubmitEventPromise} from "vuetify";
import axios from "@/axios/axios";
export const useAuthorizationStore = defineStore('authorization', () => {
    const loginUsername = ref('')
    const loginPassword = ref('')
    const loginUsernameRules = [
        (v: string) => !!v || 'Pole login jest wymagane'
    ]
    const loginPasswordRules = [
        (v: string) => !!v || 'Pole hasło jest wymagane'
    ]

    async function login(event: SubmitEventPromise) {
        const validated = await event
        if (validated.valid) {
            const response = await axios.post('/users/login', {
                username: loginUsername.value,
                password: loginPassword.value
            })
            console.log(response.data)
        }
    }
    return {
        loginUsername,
        loginPassword,
        loginUsernameRules,
        loginPasswordRules,
        login
    }
})