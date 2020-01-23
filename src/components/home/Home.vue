<template>
    <div></div>
</template>

<script>
    import UserService from "../../services/UserService";

    export default {
        name: "Home",
        created() {
            if (UserService.currentUserValue) {
                this.$router.push('/profile')
                // eslint-disable-next-line no-console
                console.log("Home: authorized")
            } else {
                this.$router.push('/login')
                // eslint-disable-next-line no-console
                console.log("Home: unauthorized")
            }
        }
    }
</script>

<style scoped>

</style>
