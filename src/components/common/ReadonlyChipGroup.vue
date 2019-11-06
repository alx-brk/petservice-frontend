<template>
  <div class="d-flex flex-wrap">
    <v-chip
        v-for="(item, index) in allItems"
        :key="index"
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
            }
        },
        methods: {
            isSelected(item) {
                if (this.areObjects(this.selectedItems)) {
                    return this.mappedServices(this.selectedItems).includes(item)
                }
                else {
                    return this.selectedItems.includes(item)
                }
            },
            chipColor(item) {
                return this.isSelected(item) ? 'primary' : 'default'
            },
            showChip(item) {
                return this.displayInactive || this.isSelected(item)
            },
            areObjects(items) {
                return items.length > 0 && typeof items[0] === 'object'
            },
            mappedServices(items) {
                return items.map(item => item.service)
            },
            mappedItem(item) {
                return (typeof item === 'object') ?
                    item.service + ' - ' + item.price + ' ' + item.units :
                    item
            }
        }
    }
</script>

<style scoped>

</style>