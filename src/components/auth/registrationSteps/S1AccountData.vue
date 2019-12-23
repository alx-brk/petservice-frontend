<template>
    <v-card>
        <v-card-title>Учетные данные</v-card-title>
        <v-card-text class="ma-0">
            <v-card class="ma-0 pa-0 mb-3 elevation-5">
                <v-card-title class="text--secondary mb-0 pb-0">Email почта</v-card-title>
                <v-card-actions class="pt-0 pb-0 ma-0">
                    <v-text-field
                            :value="email"
                            :error-messages="emailErrors"
                            @change="updateEmail"
                    />
                </v-card-actions>
            </v-card>

            <v-card class="ma-0 pa-0 mb-3 elevation-5">
                <v-card-title class="text--secondary mb-0 pb-0">Пароль</v-card-title>
                <v-card-actions class="pt-0 pb-0 ma-0">
                    <v-text-field
                            :value="password"
                            type="password"
                            :error-messages="passwordErrors"
                            @change="updatePassword"
                    />
                </v-card-actions>
            </v-card>

            <v-card class="ma-0 pa-0 mb-3 elevation-5">
                <v-card-title class="text--secondary mb-0 pb-0">Повторите пароль</v-card-title>
                <v-card-actions class="pt-0 pb-0 ma-0">
                    <v-text-field
                            :value="repeatPassword"
                            type="password"
                            :error-messages="repeatPasswordErrors"
                            @change="updateRepeatPassword"
                    />
                </v-card-actions>
            </v-card>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click="nextStep">
                Продолжить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

    export default {
        name: "S1AccountData",
        props: ['email', 'password', 'repeatPassword', 'errors'],
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