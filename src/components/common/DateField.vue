<template>
  <div>
    <v-text-field
            :value="value"
            :label="label"
            @click="showPicker=true"
            :prepend-icon="icon"
            class="pr-3"
            readonly
    />
    <v-date-picker
        v-show="showPicker"
        v-model="date"
        locale="ru"
        first-day-of-week="1"
        @change="updateDate"
        scrollable
        :no-title="noTitle"
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
            icon: String,
            noTitle: {
                type: Boolean,
                default: false
            }

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
        },
        mounted() {
            if (this.value !== undefined){
                this.date = this.value
            }
        }
    }
</script>

<style scoped>

</style>