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
            } else {
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>

</style>
