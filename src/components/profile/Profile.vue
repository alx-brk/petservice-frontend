<template>
  <v-container>
    <v-row
        align="center"
        justify="start"
        class="ma-3"
    >
      <v-col cols="2">
        <v-avatar>
          <img :src="profile.avatar">
        </v-avatar>
      </v-col>
      <v-col
          cols="10"
          v-text="profile.email"
          class="text--secondary"
      />
    </v-row>

    <v-row align="center" justify="start" class="ma-3">Общие данные</v-row>

    <v-row align="center">
      <v-expansion-panels popout focusable>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Имя</v-col>
              <v-col cols="8" class="text--secondary" v-text="profile.name"></v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field v-model="profile.name"></v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Телефон</v-col>
              <v-col cols="8" class="text--secondary" v-text="profile.phone"></v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field v-model="profile.phone"></v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Город</v-col>
              <v-col cols="8" class="text--secondary" v-text="profile.city"></v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-autocomplete :items="cities" v-model="profile.city"></v-autocomplete>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row align="center" justify="start" class="ma-3">
        <v-col cols="4">Данные петситтера</v-col>
        <v-col cols="8">
          <v-switch
              v-model="profile.activePetsitter"
              label="Отображать вас в списке петситтеров"
          ></v-switch>
        </v-col>
      </v-row>

      <v-expansion-panels popout focusable :disabled="!profile.activePetsitter">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Животные</v-col>
              <v-col cols="8">
                <v-chip
                    v-for="animal in profile.animals"
                    v-text="animal"
                    :key="animal"
                    class="ma-1"
                ></v-chip>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-autocomplete
                :items="animals"
                v-model="profile.animals"
                dense
                chips
                multiple
            ></v-autocomplete>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "Profile",
        data: () => ({
            profile: {
                avatar: "https://randomuser.me/api/portraits/women/81.jpg",
                email: "masha.pupkina@gmail.com",
                name: "Маша Пупкина",
                phone: "+79047389265",
                city: "Санкт-Петербург",
                activePetsitter: true,
                catalog: {},
                animals: ["Собаки", "Кошки"],
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                rating: 4.6,
                feedback: [{
                    author: "Вася",
                    avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    mark: 4,
                    text: "Not bad"
                }]
            },
            cities: ["Санкт-Петербург", "Москва"],
            animals: ["Собаки", "Кошки", "Рыбки", "Рептилии", "Птицы", "Грызуны", "Насекомые", "Другое"]
        })
    }
</script>

<style scoped>

</style>