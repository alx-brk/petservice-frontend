<template>
    <v-container class="pa-12">
        <v-card :loading="loading">
            <v-card-title>Вход</v-card-title>
            <v-card-actions>
                <v-col>
                    <v-text-field
                            v-model="user.email"
                            :error-messages="errors.email"
                            label="Email"
                    />
                    <v-text-field
                            v-model="user.password"
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
                </v-col>
            </v-card-actions>
            <v-card-text>
                <router-link
                        to="/registration"
                >
                    Зарегистрироваться
                </router-link>
            </v-card-text>
        </v-card>
    </v-container>
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
            if (UserService.jwtTokenValue) {
                this.$router.push('/')
            }
        },
        methods: {
            login() {
                if (this.$v.user.$invalid) {
                    this.$v.user.touch()
                } else {
                    this.loading = true

                    UserService.login(this.user)
                        .then(
                            () => {
                                this.$router.push('/');
                            },
                            error => {
                                // eslint-disable-next-line no-console
                                console.log(error);
                                this.loading = false;
                            }
                        );
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
