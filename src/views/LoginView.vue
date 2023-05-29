<template>
    <v-container>
        <v-sheet width="500px" class="mx-auto">
            <v-form @submit.prevent>
                <v-text-field
                    v-model="login"
                    :rules="loginRules"
                    label="Login"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Hasło"
                ></v-text-field>
                <router-link to="/"><span class="float-right mb-3 text-decoration-underline font-weight-light">Zapomniałeś hasła?</span></router-link>
                <v-btn type="submit" block color="#00C500" class="text-white">Zaloguj się</v-btn>
                <v-btn
                    block
                    prepend-icon="mdi-facebook"
                    class="mt-3"
                >
                    <template v-slot:prepend>
                        <v-icon></v-icon>
                    </template>
                    Kontynuuj z Facebookiem
                </v-btn>
                <v-btn
                    block
                    prepend-icon="mdi-google"
                    class="mt-3"
                >
                    <template v-slot:prepend>
                        <v-icon></v-icon>
                    </template>
                    Kontynuuj z Google
                </v-btn>
                <v-btn
                    block
                    prepend-icon="mdi-apple"
                    class="mt-3"
                >
                    <template v-slot:prepend>
                        <v-icon></v-icon>
                    </template>
                    Kontynuuj z Apple
                </v-btn>
            </v-form>
        </v-sheet>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        login: '',
        loginRules: [
            value => {
                if (value) return true
                return 'Pole login jest wymagane.'
            },
        ],
        password: '',
        passwordRules: [
            value => {
                if (value) return true
                return 'Pole hasło jest wymagane.'
            },
        ],
    }),
}
</script>