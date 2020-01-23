<template>
  <div class="d-flex flex-wrap">
    <v-chip
        v-for="item in allItems"
        :key="item.id"
        v-show="showChip(item)"
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
      {{ mappedItem(item) }}
    </v-chip>
  </div>
</template>

<script>
    export default {
        name: "ReadonlyChipGroup",
        props: {
            allItems: Array,
            selectedItems: Array,
            displayInactive: {
                type: Boolean,
                default: true
            },
            entity: {
                type: String,
                default: "simple" // simple means with {id, name} structure such as (service, city, animal)
            }
        },
        methods: {
            isSelected(item) {
                return (this.entity === "catalog") ?
                    this.arrayContainsItem(this.selectedItems, item.petService) :
                    this.arrayContainsItem(this.selectedItems, item)
            },
            chipColor(item) {
                return this.isSelected(item) ? 'primary' : 'default'
            },
            showChip(item) {
                return this.displayInactive || this.isSelected(item)
            },
            mappedItem(item) {
                return (this.entity === "catalog") ?
                    item.petService.name + ' - ' + item.price + ' ' + item.units :
                    item.name
            },
            arrayContainsItem(array, item){
                return (array) ? array.some(e => e.id === item.id && e.name === item.name) : false
            }
        }
    }
</script>

<style scoped>

</style>
