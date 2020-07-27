<template>
    <v-btn
            v-if="authorized"
            text
            @click="logout"
    >
        <v-icon left>mdi-exit-to-app</v-icon>
        Выйти
    </v-btn>
    <v-btn
            v-else
            text
            to="/login"
    >
        <v-icon left>mdi-exit-to-app</v-icon>
        Войти
    </v-btn>
</template>

<script>
    import UserService from "../../services/UserService";

    export default {
        name: "AuthButton",
        props: {
            authorized: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            logout() {
                UserService.logout();
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>
