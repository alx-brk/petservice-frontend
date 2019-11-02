<template>
  <div class="d-flex flex-wrap">
    <v-chip
        v-for="item in allItems"
        :key="item"
        class="ma-2"
        :color="chipColor(item)"
        outlined
        dense
    >
      <v-icon
          left
          color="primary"
          v-if="isSelected(item)"
      >mdi-checkbox-marked-circle-outline
      </v-icon>
      {{ item }}
    </v-chip>
  </div>
</template>

<script>
    export default {
        name: "ReadonlyChipGroup",
        props: {
          allItems: Array,
          selectedItems: Array
        },
        methods: {
            isSelected(item) {
                return this.selectedItems.includes(item)
            },
            chipColor(animal) {
                return this.isSelected(animal) ? 'primary' : 'default'
            }
        }
    }
</script>

<style scoped>

</style>