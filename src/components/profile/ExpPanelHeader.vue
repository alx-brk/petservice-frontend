<template>
    <v-row class="flex-row align-center justify-space-between flex-wrap">
        <v-col class="d-flex ma-0 pa-0 pl-3" v-text="fieldName"/>
        <v-col v-if="type==='text'" class="text--secondary d-flex ma-0 pa-0" v-text="value"/>
        <v-col v-if="type==='animalChips'" class="d-flex ma-0 pa-0">
            <v-chip
                    v-for="item in value"
                    v-text="item.name"
                    :key="item.id"
                    class="ma-1"
            />
        </v-col>
        <v-col v-if="type==='catalogChips'" class="d-flex ma-0 pa-0">
            <v-chip
                    v-for="item in value"
                    v-text="item.petService.name + ' - ' + item.price"
                    :key="item.id"
                    class="ma-1"
            />
        </v-col>

        <v-col class="d-flex justify-end ma-0 pa-0 pr-2">
            <clear-button @clear="onInput"/>
        </v-col>
    </v-row>
</template>

<script>
    import ClearButton from "../common/ClearButton";

    export default {
        name: "ExpPanelHeader",
        components: {
            'clear-button': ClearButton
        },
        props: [
            "fieldName",
            "value",
            "type"
        ],
        methods: {
            onInput() {
                this.$emit('clear')
            }
        },
    }
</script>

<style scoped>

</style>