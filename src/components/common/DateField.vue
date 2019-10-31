<template>
  <div>
    <v-text-field
        v-model="date"
        :label="label"
        @click="showPicker=true"
        :prepend-icon="icon"
        class="pr-3"
        readonly
    ></v-text-field>
    <v-date-picker
        v-show="showPicker"
        v-model="date"
        locale="ru"
        first-day-of-week="1"
        @input="updateDate"
        scrollable
        landscape
    >
    </v-date-picker>
  </div>
</template>

<script>
    export default {
        name: "DateField",
        props: {
            label: String,
            value: String,
            icon: String
        },
        data: () => ({
            showPicker: false,
            date: null
        }),
        methods: {
            updateDate() {
                this.showPicker = false;
                this.$emit('input', this.date)
            }
        }
    }
</script>

<style scoped>

</style>