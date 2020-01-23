<template>
    <div>
        <v-simple-table fixed-header>
            <thead v-show="showCatalog">
            <tr>
                <th class="text-left">Услуга</th>
                <th colspan="2" class="text-left">Цена</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(option, i) in catalogSet" :key="i">
                <td>
                    <v-select
                            :items="services"
                            item-text="name"
                            v-model="option.petService"
                            @change="catalogSetChange"
                            :class="{'v-input--has-state error--text': showErrors}"
                            return-object
                    />
                </td>
                <td>
                    <v-text-field
                            type="number"
                            v-model="option.price"
                            @change="catalogSetChange"
                            :class="{'v-input--has-state error--text': showErrors}"
                    />
                </td>
                <td>
                    <v-select
                            :items="units"
                            v-model="option.units"
                            @change="catalogSetChange"
                            :class="{'v-input--has-state error--text': showErrors}"
                    />
                </td>
            </tr>
            </tbody>
        </v-simple-table>
        <div class="ma-3">
                            <span
                                    v-for="(error, i) in errors.catalogSet"
                                    :key="i"
                                    class="v-text-field__details v-messages theme--light error--text v-messages__wrapper v-messages__message"
                                    v-text="error"
                            />
        </div>
        <v-btn
                class="ma-3"
                @click="addService"
                color="primary"
        >
            <v-icon left>mdi-plus-circle</v-icon>
            Добавить
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "CatalogSetInput",
        props: ['catalog', 'errors'],
        data: () => ({
           catalogSet: []
        }),
        methods: {
            catalogSetChange() {
                this.$emit('catalogSetChange', this.catalogSet)
            },
            addService() {
                this.catalogSet.push({petService: {name: null}, price: null, units: null})
            },
        },
        computed: {
            services() {
                return this.$store.getters.services
            },
            units() {
                return this.$store.getters.units
            },
            showErrors(){
                return (this.errors.catalogSet) ? this.errors.catalogSet.length > 0 : false
            },
            showCatalog(){
                return (this.catalogSet) ? this.catalogSet.length > 0 : false
            }
        },
        mounted() {
            this.catalogSet = this.catalog
        }
    }
</script>

<style scoped>

</style>
