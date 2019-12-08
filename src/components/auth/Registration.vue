<template>
    <v-stepper v-model="currentStepIndex" class="ma-12">
        <v-stepper-header>
            <v-stepper-step
                    step="1"
                    :complete="currentStepIndex > 1"
            >Учетные данные</v-stepper-step>
            <v-divider/>
            <v-stepper-step
                    step="2"
                    :complete="currentStepIndex > 2"
            >Персональные данные</v-stepper-step>
            <v-divider/>
            <v-stepper-step
                    step="3"
                    :complete="currentStepIndex > 3"
            >Данные петситтера</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content :step="currentStepIndex">
                <s1-account-data
                        v-if="currentStepIndex === 1"
                        :email="profile.email"
                        :password="profile.password"
                        :repeat-password="profile.repeatPassword"
                        :errors="errors.account"
                        @emailInput="emailInput"
                        @passwordInput="passwordInput"
                        @repeatPasswordInput="repeatPasswordInput"
                        :button-disabled="accountDataInvalid"
                        @next="currentStepIndex++"
                ></s1-account-data>
                <s2-personal-data v-if="currentStepIndex === 2" v-model="currentStep"></s2-personal-data>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
    import S1AccountData from "./registrationSteps/S1AccountData";
    import S2PersonalData from "./registrationSteps/S2PersonalData";
    import {email, required, sameAs} from "vuelidate/lib/validators";

    export default {
        name: "Registration",
        components: {
            's1-account-data': S1AccountData,
            's2-personal-data': S2PersonalData
        },
        data: () => ({
            profile: {
                avatar: null,
                email: "",
                password: "",
                repeatPassword: "",
                name: "",
                phone: "",
                city: "",
                activePetsitter: false,
                catalogSet: [],
                animals: [],
                description: "",
                rating: null,
                feedback: []
            },
            errors: {
                account: {
                    email: [],
                    password: [],
                    repeatPassword: []
                }
            },
            currentStepIndex: 1
        }),
        computed: {
            currentStep() {
                return this.steps.find(step => step.stepIndex === this.currentStepIndex)
            },
            accountDataInvalid() {
                return (
                    !this.$v.$anyDirty ||
                    this.$v.profile.email.$invalid ||
                    this.$v.profile.password.$invalid ||
                    this.$v.profile.repeatPassword.$invalid
                )
            }
        },
        methods: {
            emailInput(value) {
                this.profile.email = value
                this.$v.profile.email.$touch()
                this.errors.account.email = (this.$v.profile.email.$invalid) ? ["Требуется указать валидный Email адрес"] : []
            },
            passwordInput(value) {
                this.profile.password = value
                this.$v.profile.password.$touch()
                this.errors.account.password = []
                if (!this.$v.profile.password.required) {
                    this.errors.account.password.push("Требуется указать пароль")
                }
                if (!this.$v.profile.password.strongPassword) {
                    this.errors.account.password.push("Пароль должен содержать буквы, цифры и специальные символы")
                }
            },
            repeatPasswordInput(value) {
                this.profile.repeatPassword = value
                this.$v.profile.repeatPassword.$touch()
                this.errors.account.repeatPassword = (this.$v.profile.repeatPassword.$invalid) ? ["Повторите пароль"] : []
            },
        },
        validations() {
            return {
                profile: {
                    email: {
                        required,
                        email
                    },
                    password: {
                        required,
                        strongPassword(password) {
                            return (
                                /[a-z]/.test(password) && // checks for a-z
                                /[0-9]/.test(password) && // checks for 0-9
                                /\W|_/.test(password) && // checks for special char
                                password.length >= 6
                            );
                        }
                    },
                    repeatPassword: {
                        required,
                        sameAsPassword: sameAs("password")
                    },
                }
            }
        }
    }
</script>

<style scoped>

</style>