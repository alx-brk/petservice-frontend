<template>
    <v-card>
        <v-card-title>Анкета петситтера</v-card-title>
        <v-card-text class="ma-0">

            <v-card class="ma-0 pa-0 mb-3 elevation-5">
                <v-card-title class="text--secondary mb-0 pb-0">Животные</v-card-title>
                <v-card-actions class="pt-0 pb-1 ma-0">
                    <v-autocomplete
                            :items="allAnimals"
                            :value="animals"
                            :error-messages="errors.animals"
                            @change="updateAnimals"
                            item-text="name"
                            return-object
                            dense
                            chips
                            multiple
                    />
                </v-card-actions>
            </v-card>

            <v-card class="ma-0 pa-0 mb-3 elevation-5">
                <v-card-title class="text--secondary mb-0 pb-0">Услуги и цены</v-card-title>
                <v-card-actions class="pt-0 pb-1 ma-0">
                    <catalog-set-input
                        :catalog="catalogSet"
                        :errors="errors"
                        @catalogSetChange="updateCatalog"
                    />
                </v-card-actions>
            </v-card>

            <v-card class="ma-0 pa-0 mb-3 elevation-5">
                <v-card-title class="text--secondary mb-0 pb-0">О себе</v-card-title>
                <v-card-actions class="pt-0 pb-1 ma-0">
                    <v-textarea
                            :value="description"
                            @change="updateDescription"
                            auto-grow
                    />
                </v-card-actions>
            </v-card>

            <v-card class="ma-0 pa-0 mb-3 elevation-5">
                <v-card-title class="text--secondary mb-0 pb-0">Аватар</v-card-title>
                <v-card-actions class="pt-0 pb-1 ma-3">
                    <v-file-input
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Выбрать аватар"
                            prepend-icon="mdi-camera"
                            justify="start"
                            align="start"
                            v-model="file"
                            @change="updateAvatar"
                            flat
                            solo
                    />
                </v-card-actions>
            </v-card>

        </v-card-text>
        <v-card-actions>
            <v-col cols="12">
                <v-row class="align-baseline">
                    <v-btn @click="previousStep" text class="d-flex">
                        Назад
                    </v-btn>
                    <v-btn dark color="primary" @click="finish" class="d-flex">
                        Завершить регистрацию
                    </v-btn>
                </v-row>
            </v-col>
        </v-card-actions>
    </v-card>
</template>

<script>
    import CatalogSetInput from "../../common/CatalogSetInput";

    export default {
        name: "S1AccountData",
        props: ['animals', 'catalogSet', 'description', 'errors'],
        components: {
          'catalog-set-input': CatalogSetInput
        },
        data: () => ({
           file: []
        }),
        computed: {
            allAnimals() {
                return this.$store.getters.animals
            },
        },
        methods: {
            updateAnimals(value) {
                this.$emit("animalsInput", value)
            },
            updateCatalog(value) {
                this.$emit("catalogInput", value)
            },
            updateDescription(value) {
                this.$emit("descriptionInput", value)
            },
            updateAvatar(){
              this.$emit('avatarInput', this.file)
            },
            nextStep(){
                this.$emit("next")
            },
            previousStep(){
                this.$emit('previous')
            },
            finish(){
                this.$emit('finish')
            }
        },

    }
</script>

<style scoped>

</style>
