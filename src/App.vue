<template>
  <v-app>
    <v-card>
      <v-navigation-drawer
          v-model="drawer"
          overflow
          app
      >
        <router-link
            to="/profile"
            tag="span"
            class="pointer"
        >
          <v-list-item>
            <v-tooltip top>
              <template #activator="{ on }">
                <span v-on="on">
                  <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/women/81.jpg">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Маша Пупкина</v-list-item-title>
                    <v-list-item-subtitle>masha.pupkina@gmail.com</v-list-item-subtitle>
                  </v-list-item-content>
                </span>
              </template>
              <span>Редактировать профиль</span>
            </v-tooltip>
          </v-list-item>
        </router-link>
        <v-divider/>
        <v-subheader>Меню клиента</v-subheader>
        <v-list dense flat nav>
          <v-list-item
              v-for="item in clientMenu"
              :key="item.title"
              :to="item.url"
              :color="item.url === $route.path ? 'primary' : ''"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider/>
        <v-subheader>Меню петситтера</v-subheader>
        <v-list dense flat nav>
          <v-list-item
              v-for="item in petsitterMenu"
              :key="item.title"
              :to="item.url"
              :color="item.url === $route.path ? 'primary' : ''"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-app-bar app clipped-right>
      <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar flat>
        <v-toolbar-title>Petservice</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn
              text
              v-for="link in links"
              :to="link.url"
              :key="link.title"
          >
            <v-icon left v-text="link.icon"/>
            {{link.title}}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>

    <v-content class="justify-center">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        data: () => ({
            drawer: true,
            links: [
                {title: 'Выйти', icon: 'mdi-exit-to-app', 'url': '/'}
            ],
            activeItem: null,
            clientMenu: [
                {title: 'Мои заказы', icon: 'mdi-paw', 'url': '/client-orders'},
                {title: 'Создать заказ', icon: 'mdi-briefcase-plus', 'url': '/new-order'},
                {title: 'Поиск петситтера', icon: 'mdi-account-search', 'url': '/petsitters-search'}
            ],
            petsitterMenu: [
                {title: 'Мои заказы', icon: 'mdi-briefcase', 'url': '/petsitter-orders'},
                {title: 'Поиск заказа', icon: 'mdi-briefcase-search', 'url': '/orders-search'}
            ],
        }),
        created() {
            this.$store.dispatch('initAnimals');
            this.$store.dispatch('initServices');
            this.$store.dispatch('initCities');
            this.$store.dispatch('initUnits');
        }
    };
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>