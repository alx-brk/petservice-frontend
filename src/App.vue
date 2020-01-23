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
                        v-if="authorized"
                >
                    <v-list-item>
                        <v-tooltip top>
                            <template #activator="{ on }">
                <span v-on="on">
                  <v-list-item-avatar>
                    <img :src="avatarLink">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="name"/>
                    <v-list-item-subtitle v-text="email"/>
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
            />
            <v-toolbar flat>
                <v-toolbar-title>Petservice</v-toolbar-title>
                <v-spacer/>
                <v-toolbar-items>
                    <v-btn
                            text
                            to="/login"
                            @click="logout"
                    >
                        <v-icon left>mdi-exit-to-app</v-icon>
                        {{title}}
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

    import UserService from "./services/UserService";
    import ImageService from "./services/ImageService";

    export default {
        name: 'App',
        components: {},
        data: () => ({
            drawer: false,
            activeItem: null,
            clientMenu: [
                {title: 'Мои заказы', icon: 'mdi-paw', url: '/client-orders'},
                {title: 'Создать заказ', icon: 'mdi-briefcase-plus', url: '/new-order'},
                {title: 'Поиск петситтера', icon: 'mdi-account-search', url: '/petsitters-search'}
            ],
            petsitterMenu: [
                {title: 'Мои заказы', icon: 'mdi-briefcase', url: '/petsitter-orders'},
                {title: 'Поиск заказа', icon: 'mdi-briefcase-search', url: '/orders-search'}
            ],
            // currentUser: null
        }),
        created() {
            // this.currentUser = UserService.currentUserValue;
            this.$store.dispatch('initAnimals');
            this.$store.dispatch('initServices');
            this.$store.dispatch('initCities');
            this.$store.dispatch('initUnits');
            this.$store.dispatch('initStatuses');
        },
        computed: {
            authorized() {
                return !!this.currentUser
            },
            title() {
                return (this.currentUser) ? 'Выйти' : 'Войти'
            },
            currentUser(){
                return UserService.currentUserValue;
            },
            avatarLink(){
                return ImageService.avatarLink(this.currentUser.avatar)
            },
            email(){
                return (this.currentUser) ? this.currentUser.email : ''
            },
            name(){
                return (this.currentUser) ? this.currentUser.name : ''
            }
        },
        methods: {
            logout(){
                UserService.logout()
                this.$router.push('/')
            }
        }
    };
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>
