<template>
    <v-btn
            icon
            @click.stop="pushButton"
    >
        <v-icon>mdi-close</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "ClearButton",
        methods: {
            pushButton() {
                this.$emit('clear')
            }
        }
    }
</script>

<style scoped>

</style>