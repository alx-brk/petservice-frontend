<template>
    <div>
        <v-row class="flex-row align-center flex-nowrap">
            <v-col :class="fieldClass">
                <slot name="field"></slot>
            </v-col>
            <v-col class="d-flex flex-grow-0 flex-shrink-1">
                <clear-button @clear="onClear"/>
            </v-col>
        </v-row>
        <v-row class="flex-row align-center flex-nowrap ma-3">
            <slot name="alert"></slot>
        </v-row>
    </div>
</template>

<script>
    import ClearButton from "../common/ClearButton";

    export default {
        name: "InputFieldProxy",
        props: {
            fieldClass: {
                type: String,
                default: "d-flex flex-wrap flex-grow-1 flex-shrink-0"
            }
        },
        components: {
            'clear-button': ClearButton
        },
        methods: {
            onClear() {
                this.$emit('clear')
            }
        }
    }
</script>

<style scoped>

</style>