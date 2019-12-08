<template>
    <v-card>
        <v-card-title>Учетные данные</v-card-title>
        <v-card-text>
            <v-text-field
                    :value="email"
                    label="Email"
                    :error-messages="emailErrors"
                    @change="updateEmail"
            ></v-text-field>

            <v-text-field
                    :value="password"
                    label="Пароль"
                    type="password"
                    :error-messages="passwordErrors"
                    @change="updatePassword"
            ></v-text-field>

            <v-text-field
                    :value="repeatPassword"
                    label="Пароль"
                    type="password"
                    :error-messages="repeatPasswordErrors"
                    @change="updateRepeatPassword"
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" :disabled="buttonDisabled" @click="nextStep">
                Продолжить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

    export default {
        name: "S1AccountData",
        props: ['email', 'password', 'repeatPassword', 'errors', 'buttonDisabled'],
        computed: {
            emailErrors() {
                return (this.errors === undefined) ? [] : this.errors.email
            },
            passwordErrors() {
                return (this.errors === undefined) ? [] : this.errors.password
            },
            repeatPasswordErrors() {
                return (this.errors === undefined) ? [] : this.errors.repeatPassword
            }
        },
        methods: {
            updateEmail(value) {
                this.$emit("emailInput", value)
            },
            updatePassword(value) {
                this.$emit("passwordInput", value)
            },
            updateRepeatPassword(value) {
                this.$emit("repeatPasswordInput", value)
            },
            nextStep(){
                this.$emit("next")
            }
        }

    }
</script>

<style scoped>

</style>