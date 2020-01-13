<template>
    <v-card :loading="loading">
        <v-card-title>Вход</v-card-title>
        <v-card-actions class="flex-column">
            <v-text-field
                    v-model="user.email"
                    class="d-flex"
                    :error-messages="errors.email"
                    label="Email"
            />
            <v-text-field
                    v-model="user.password"
                    class="d-flex"
                    type="password"
                    :error-messages="errors.password"
                    label="Пароль"
            />
            <v-btn
                    color="primary"
                    @click="login"
                    :disabled="loading"
            >Войти
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import UserService from "../../services/UserService";
    import User from "../../model/User";
    import {validationConfigs} from "../../common/validation"

    export default {
        name: "Login",
        data: () => ({
            user: new User(),
            errors: {
                email: [],
                password: []
            },
            loading: false
        }),
        created() {
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.login()
                }
            });
        },
        mounted() {
            if (UserService.currentUserValue) {
                this.$router.push('/profile')
            }
        },
        methods: {
            login() {
                if (this.$v.user.$invalid) {
                    this.$v.user.touch()
                } else {
                    this.loading = true
                    UserService.login(this.user)
                        .then((response) => {
                            // eslint-disable-next-line no-console
                            console.log('response on login')
                            // eslint-disable-next-line no-console
                            console.log(response.data)
                            localStorage.setItem('currentUser', JSON.stringify(response.data));
                            UserService.nextUserSubject(response.data);
                            this.$router.push('/profile')
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.log(error)
                            this.loading = false
                        })
                }
            }
        },
        validations() {
            return validationConfigs.login()
        }
    }
</script>

<style scoped>

</style>
