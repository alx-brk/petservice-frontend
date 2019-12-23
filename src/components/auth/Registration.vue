<template>
    <v-stepper v-model="currentStepIndex" class="ma-12">
        <v-stepper-header>
            <v-stepper-step
                    step="1"
                    :complete="currentStepIndex > 1"
            >Учетные данные
            </v-stepper-step>
            <v-divider/>
            <v-stepper-step
                    step="2"
                    :complete="currentStepIndex > 2"
            >Персональные данные
            </v-stepper-step>
            <v-divider/>
            <v-stepper-step
                    step="3"
                    :complete="currentStepIndex > 3"
            >Данные петситтера
            </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <s1-account-data
                        :email="profile.email"
                        :password="profile.password"
                        :repeat-password="profile.repeatPassword"
                        :errors="errors.account"
                        @emailInput="emailInput"
                        @passwordInput="passwordInput"
                        @repeatPasswordInput="repeatPasswordInput"
                        @next="next"
                />
            </v-stepper-content>
            <v-stepper-content step="2">
                <s2-personal-data
                        :name="profile.name"
                        :phone="profile.phone"
                        :city="profile.city"
                        :errors="errors.personal"
                        @nameInput="nameInput"
                        @phoneInput="phoneInput"
                        @cityInput="cityInput"
                        @next="next"
                        @previous="previous"
                        @finish="finishRegistration"
                />
            </v-stepper-content>
            <v-stepper-content step="3">
                <s3-petsitter-data
                        :animals="profile.animals"
                        :catalogSet="profile.catalogSet"
                        :description="profile.description"
                        :errors="errors.petsitter"
                        @animalsInput="animalsInput"
                        @catalogInput="catalogInput"
                        @descriptionInput="descriptionInput"
                        @avatarInput="avatarInput"
                        @next="next"
                        @previous="previous"
                        @finish="finishRegistration"
                />
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
    import S1AccountData from "./registrationSteps/S1AccountData";
    import S2PersonalData from "./registrationSteps/S2PersonalData";
    import S3PetsitterData from "./registrationSteps/S3PetsitterData";
    import {email, required, sameAs} from "vuelidate/lib/validators";
    import {registrationValidation} from "../../common/validation";
    import * as api from "../../common/api";

    const notEmptyList = (array) => array.length > 0;
    const notEmpty = (value) => value.id !== null && value.name != null

    export default {
        name: "Registration",
        components: {
            's1-account-data': S1AccountData,
            's2-personal-data': S2PersonalData,
            's3-petsitter-data': S3PetsitterData,
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
            file: [],
            errors: {
                account: {
                    email: [],
                    password: [],
                    repeatPassword: []
                },
                personal: {
                    name: [],
                    phone: [],
                    city: []
                },
                petsitter: {
                    animals: [],
                    catalogSet: []
                }
            },
            currentStepIndex: 1
        }),
        methods: {
            finishRegistration() {
                if (this.currentStepIndex === 1 && registrationValidation.accountInvalid(this)){
                    registrationValidation.validateAccount(this)
                } else if (this.currentStepIndex === 2 && registrationValidation.personalInvalid(this)){
                    registrationValidation.personalInvalid(this)
                } else if (this.currentStepIndex === 3 && registrationValidation.petsitterInvalid(this)){
                    registrationValidation.validatePetsitter(this)
                } else {
                    this.profile.avatar = null;

                    if (this.profile.activePetsitter) {
                        this.profile.catalogSet = this.profile.catalogSet.filter(catalog => {
                            return catalog.petService.name != null &&
                                catalog.price != null &&
                                catalog.units != null
                        });
                    } else {
                        this.catalogSet = []
                        this.animals = []
                    }

                    api.userController.post("", this.profile)
                        .then((response) => {
                            // eslint-disable-next-line no-console
                            console.log(response.data)
                            this.profile.id = response.data.id
                            this.uploadAvatar()
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.log(error)
                        })
                }
            },
            uploadAvatar() {
                if (this.file.name !== undefined) {
                    // eslint-disable-next-line no-console
                    console.log("send photo")
                    const formData = new FormData();
                    formData.append("file", this.file);

                    api.imageController.post("/" + this.profile.id, formData)
                        .then((response) => {
                            // eslint-disable-next-line no-console
                            console.log(response.data)
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.log(error)
                        })
                }
            },
            next() {
                if (this.currentStepIndex === 1) {
                    if (registrationValidation.accountInvalid(this)) {
                        registrationValidation.validateAccount(this)
                    } else {
                        this.currentStepIndex++
                    }
                } else if (this.currentStepIndex === 2) {
                    if (registrationValidation.personalInvalid(this)) {
                        registrationValidation.validatePersonal(this)
                    } else {
                        this.profile.activePetsitter = true
                        this.currentStepIndex++
                    }
                } else if (this.currentStepIndex === 3) {
                    if (registrationValidation.petsitterInvalid(this)) {
                        registrationValidation.validatePetsitter(this)
                    } else {
                        this.currentStepIndex++
                    }
                }
            },
            previous() {
                if (this.currentStepIndex === 3) {
                    this.profile.activePetsitter = false
                }
                this.currentStepIndex--
            },
            emailInput(value) {
                registrationValidation.inputEmail(this, value)
            },
            passwordInput(value) {
                registrationValidation.inputPassword(this, value)
            },
            repeatPasswordInput(value) {
                registrationValidation.inputRepeatPassword(this, value)
            },
            nameInput(value) {
                registrationValidation.inputName(this, value)
            },
            phoneInput(value) {
                registrationValidation.inputPhone(this, value)
            },
            cityInput(value) {
                registrationValidation.inputCity(this, value)
            },
            animalsInput(value) {
                registrationValidation.inputAnimals(this, value)
            },
            catalogInput(value) {
                registrationValidation.inputCatalog(this, value)
            },
            descriptionInput(value) {
                registrationValidation.inputDescription(this, value)
            },
            avatarInput(value) {
                this.file = value
            }
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
                    name: {
                        required
                    },
                    phone: {
                        required
                    },
                    city: {
                        required
                    },
                    animals: {
                        required,
                        notEmptyList
                    },
                    catalogSet: {
                        required,
                        notEmptyList,
                        $each: {
                            price: {
                                required
                            },
                            units: {
                                required
                            },
                            petService: {
                                required,
                                notEmpty
                            }
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>