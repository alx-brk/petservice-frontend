<template>
  <div>
    <v-text-field
        #activator="{ on }"
        v-model="date"
        :label="label"
        readonly
        v-on="on"
    ></v-text-field>
    <v-date-picker
        v-model="date"
        no-title
        scrollable
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary">OK</v-btn>
      <v-btn text color="primary">Отмена</v-btn>
    </v-date-picker>
  </div>
</template>

<script>
    export default {
        name: "DateField",
        props: {
            date: null,
            label: null
        }
    }
</script>

<style scoped>

</style>