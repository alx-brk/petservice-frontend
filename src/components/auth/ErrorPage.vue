<template>
    <span>Error: {{error}}</span>
</template>

<script>
    export default {
        name: "Error",
        data() {
            return {
                error: null
            };
        },
        created() {
            this.error = this.$route.params.errorCode;
        }
    }
</script>

<style scoped>

</style>
