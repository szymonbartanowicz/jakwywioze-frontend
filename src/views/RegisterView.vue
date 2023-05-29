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
                <v-text-field
                    v-model="confirmPassword"
                    :rules="confirmPasswordRules"
                    label="Powtórz hasło"
                ></v-text-field>
                <router-link to="/login"><span class="float-right mb-3 text-decoration-underline font-weight-light">Posiadasz już konto?</span></router-link>
                <v-btn type="submit" block color="#00C500" class="text-white">Zarejestruj się</v-btn>
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
        confirmPassword: '',
        confirmPasswordRules: [
            value => {
                if (value) return true
                return 'Pole powtórz hasło jest wymagane.'
            },
        ],
    }),
}
</script>
