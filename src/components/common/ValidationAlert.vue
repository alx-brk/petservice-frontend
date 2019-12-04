<template>
    <v-alert
            dense
            outlined
            border="left"
            type="error"
    ><slot></slot></v-alert>
</template>

<script>
    export default {
        name: "ValidationAlert"
    }
</script>

<style scoped>

</style>