<template>
    <v-card class="flex-column max-width-1000 ma-3">
        <div class="justify-space-between flex-wrap flex-row d-flex">
            <div class="pa-3 mt-0 flex-row d-flex align-center">
                <span class="text--secondary">Петситтер:</span>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img :src="avatarLink"/>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-text="profile.name"/>
                    </v-list-item-content>
                </v-list-item>
            </div>
            <div class="pa-3 mt-0 flex-row d-flex align-center">
                <v-tooltip bottom>
                    <template #activator="{ on }">
            <span v-on="on">
              <v-rating
                      v-model="profile.rating"
                      empty-icon="mdi-star-outline"
                      half-icon="mdi-star-half"
                      full-icon="mdi-star"
                      half-increments
                      readonly
              />
            </span>
                    </template>
                    <span v-text="'Рейтинг петситтера ' + profile.rating"/>
                </v-tooltip>
            </div>
        </div>

        <v-row class="justify-space-between flex-wrap d-flex flex-row">
            <v-col xl="2" lg="2" md="2" sm="5" xs="12" class="d-flex flex-wrap flex-column pa-3 mt-0 ml-3">
                <span class="text--secondary">Животные</span>
                <readonly-chip-group
                        :all-items="profile.animals"
                        :selected-items="selectedAnimals"
                />
            </v-col>
            <v-col xl="2" lg="2" md="2" sm="5" xs="12" class="d-flex flex-column flex-wrap pa-3 mt-0 ml-3">
                <span class="text--secondary">Услуги</span>
                <readonly-chip-group
                        :all-items="profile.catalogSet"
                        :selected-items="selectedServices"
                        entity="catalog"
                />
            </v-col>
            <v-col xl="7" lg="7" md="7" sm="12" xs="12" class="d-flex flex-column flex-wrap pa-3 mt-0 ml-3">
                <span class="text--secondary">Описание</span>
                <span>{{ profile.description }}</span>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import ReadonlyChipGroup from "./ReadonlyChipGroup";
    import ImageService from "../../services/ImageService";

    export default {
        name: "PetsitterCard",
        props: {
            profile: {
                type: Object,
                required: true
            },
            selectedItemsContainer: Object
        },
        components: {
            'readonly-chip-group': ReadonlyChipGroup
        },
        computed: {
            selectedAnimals() {
                return (this.selectedItemsContainer.animals) ? this.selectedItemsContainer.animals : []
            },
            selectedServices() {
                return (this.selectedItemsContainer.petServices) ? this.selectedItemsContainer.petServices : []
            },
            avatarLink() {
                return ImageService.avatarLink(this.profile.avatar)
            }
        }
    }
</script>

<style scoped>
    .max-width-1000 {
        max-width: 1000px;
    }
</style>
