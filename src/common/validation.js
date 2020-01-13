import {email, required, sameAs} from "vuelidate/lib/validators";

const errorMessages = {
    city: ["Требуется указать город"],
    animals: ["Требуется указать хотя бы одно животное"],
    petServices: ["Требуется указать хотя бы одну услугу"],
    startDate: ["Дата не может быть в прошлом"],
    endDate: ["Дата не может быть раньше даты начала"],
    name: ["Требуется указать имя"],
    phone: ["Требуется указать телефон"],
    catalogSet: ["Требуется указать хотя бы один сервис"],
    petServiceSingle: ["Требуется указать услугу"],
    price: ["Требуется указать цену"],
    units: ["Требуется указать единицы измерения"],
    email: ["Требуется указать валидный Email адрес"],
    passwordRequired: ["Требуется указать пароль"],
    passwordStrong: ["Пароль должен содержать буквы, цифры и специальные символы"],
    repeatPassword: ["Повторите пароль"],
}

const defaultValues = {
    city: null,
    animals: [],
    petServices: [],
    startDate: '',
    endDate: '',
    name: '',
    phone: '',
    catalogSet: [],
    email: '',
    password: '',
    repeatPassword: '',
}

const notEmptyList = (array) => array.length > 0;
const notEmpty = (value) => !!value && !!value.id && !!value.name
const startDateValidator = (startDate) => {
    return (startDate) ? true :
        startDate >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString()
};
const endDateValidator = (endDate, vm) => {
    return (endDate) ? true : endDate > vm.startDate
};

const hasError = (this_, field) => {
    for (var key in this_.$v.profile.catalogSet.$each.$iter) {
        if (this_.$v.profile.catalogSet.$each.$iter.hasOwnProperty(key)) {
            if (this_.$v.profile.catalogSet.$each.$iter[key][field].$anyError) {
                return true
            }
        }
    }
    return false
}

export const validateField = (this_, parent, field) => {
    this_.$v[parent][field].$touch()
    this_.errors[field] = (this_.$v[parent][field].$invalid) ? errorMessages[field] : []
}

export const validateGroupField = (this_, parent, group, field) => {
    this_.$v[parent][field].$touch()
    this_.errors[group][field] = (this_.$v[parent][field].$invalid) ? errorMessages[field] : []
}

export const inputAction = (this_, parent, field, value) => {
    this_[parent][field] = value
    validateField(this_, parent, field)
}

export const clearAction = (this_, parent, field) => {
    this_[parent][field] = defaultValues[field]
    validateField(this_, parent, field)
}

export const groupInputAction = (this_, parent, group, field, value) => {
    this_[parent][field] = value
    validateGroupField(this_, parent, group, field)
}

export const groupClearAction = (this_, parent, group, field) => {
    this_[parent][field] = defaultValues[field]
    validateGroupField(this_, parent, group, field)
}

export const orderValidation = {
    inputCity: (this_, value) => {
        inputAction(this_, 'order', 'city', value)
    },
    clearCity: (this_) => {
        clearAction(this_, 'order', 'city')
    },
    inputAnimals: (this_, value) => {
        inputAction(this_, 'order', 'animals', value)
    },
    clearAnimals: (this_) => {
        clearAction(this_, 'order', 'animals')
    },
    inputPetServices: (this_, value) => {
        inputAction(this_, 'order', 'petServices', value)
    },
    clearPetServices: (this_) => {
        clearAction(this_, 'order', 'petServices')
    },
    inputStartDate: (this_, value) => {
        inputAction(this_, 'order', 'startDate', value)
    },
    clearStartDate: (this_) => {
        clearAction(this_, 'order', 'startDate')
    },
    inputEndDate: (this_, value) => {
        inputAction(this_, 'order', 'endDate', value)
    },
    clearEndDate: (this_) => {
        clearAction(this_, 'order', 'endDate')
    },
    validateForm: (this_) => {
        validateField(this_, 'order', 'city')
        validateField(this_, 'order', 'animals')
        validateField(this_, 'order', 'petServices')
        validateField(this_, 'order', 'startDate')
        validateField(this_, 'order', 'endDate')
    }
}

export const registrationValidation = {
    inputEmail: (this_, value) => {
        groupInputAction(this_, 'profile', 'account', 'email', value)
    },
    inputPassword: (this_, value) => {
        this_.profile.password = value
        this_.$v.profile.password.$touch()
        this_.errors.account.password = []
        if (!this_.$v.profile.password.required) {
            this_.errors.account.password.push(errorMessages['passwordRequired'])
        }
        if (!this_.$v.profile.password.strongPassword) {
            this_.errors.account.password.push(errorMessages['passwordStrong'])
        }
    },
    inputRepeatPassword: (this_, value) => {
        groupInputAction(this_, 'profile', 'account', 'repeatPassword', value)
    },
    accountInvalid(this_) {
        return this_.$v.profile.email.$invalid || this_.$v.profile.password.$invalid || this_.$v.profile.repeatPassword.$invalid
    },
    personalInvalid(this_) {
        return this_.$v.profile.name.$invalid || this_.$v.profile.phone.$invalid || this_.$v.profile.city.$invalid
    },
    petsitterInvalid(this_) {
        return this_.$v.profile.animals.$invalid || this_.$v.profile.catalogSet.$invalid
    },
    inputName: (this_, value) => {
        groupInputAction(this_, 'profile', 'personal', 'name', value)
    },
    inputPhone: (this_, value) => {
        groupInputAction(this_, 'profile', 'personal', 'phone', value)
    },
    inputCity: (this_, value) => {
        groupInputAction(this_, 'profile', 'personal', 'city', value)
    },
    inputAnimals: (this_, value) => {
        groupInputAction(this_, 'profile', 'petsitter', 'animals', value)
    },
    inputCatalog: (this_, value) => {
        this_.profile.catalogSet = value;
        if (this_.$v.profile.catalogSet) {
            this_.$v.profile.catalogSet.$touch()

            this_.errors.petsitter.catalogSet = defaultValues['catalogSet']
            if (!this_.$v.profile.catalogSet.notEmptyList) {
                this_.errors.petsitter.catalogSet = this_.errors.petsitter.catalogSet.concat(errorMessages['catalogSet'])
            }
            if (hasError(this_, 'petService')) {
                this_.errors.petsitter.catalogSet = this_.errors.petsitter.catalogSet.concat(errorMessages['petService'])
            }
            if (hasError(this_, 'price')) {
                this_.errors.petsitter.catalogSet = this_.errors.petsitter.catalogSet.concat(errorMessages['price'])
            }
            if (hasError(this_, 'units')) {
                this_.errors.petsitter.catalogSet = this_.errors.petsitter.catalogSet.concat(errorMessages['units'])
            }
        }
    },
    inputDescription: (this_, value) => {
        this_.profile.description = value
    },
    validateAccount: (this_) => {
        validateGroupField(this_, 'profile', 'account', 'email')

        this_.$v.profile.password.$touch()
        this_.errors.account.password = []
        if (!this_.$v.profile.password.required) {
            this_.errors.account.password.push(errorMessages['passwordRequired'])
        }
        if (!this_.$v.profile.password.strongPassword) {
            this_.errors.account.password.push(errorMessages['passwordStrong'])
        }

        validateGroupField(this_, 'profile', 'account', 'repeatPassword')
    },
    validatePersonal: (this_) => {
        validateGroupField(this_, 'profile', 'personal', 'name')
        validateGroupField(this_, 'profile', 'personal', 'phone')
        validateGroupField(this_, 'profile', 'personal', 'city')
    },
    validatePetsitter: (this_) => {
        validateGroupField(this_, 'profile', 'petsitter', 'animals')
        this_.$v.profile.catalogSet.$touch()
        this_.errors.petsitter.catalogSet = (this_.$v.profile.catalogSet.$invalid) ? errorMessages['catalogSet'] : []
    },
}

export const profileValidation = {
    inputName: (this_, value) => {
        inputAction(this_, 'profile', 'name', value)
    },
    clearName: (this_) => {
        clearAction(this_, 'profile', 'name')
    },
    inputPhone: (this_, value) => {
        inputAction(this_, 'profile', 'phone', value)
    },
    clearPhone: (this_) => {
        clearAction(this_, 'profile', 'phone')
    },
    inputCity: (this_, value) => {
        inputAction(this_, 'profile', 'city', value)
    },
    clearCity: (this_) => {
        clearAction(this_, 'profile', 'city')
    },
    inputAnimals: (this_, value) => {
        inputAction(this_, 'profile', 'animals', value)
    },
    clearAnimals: (this_) => {
        clearAction(this_, 'profile', 'animals')
    },
    clearCatalogSet(this_) {
        this_.profile.catalogSet = defaultValues['catalogSet']
        this_.$v.profile.catalogSet.$touch()
        this_.errors.catalogSet = defaultValues['catalogSet']
        if (!this_.$v.profile.catalogSet.notEmptyList) {
            this_.errors.catalogSet.push(errorMessages['catalogSet'])
        }
    },
    catalogSetChange(this_) {
        if (this_.$v.profile.catalogSet) {
            this_.$v.profile.catalogSet.$touch()

            this_.errors.catalogSet = defaultValues['catalogSet']
            if (!this_.$v.profile.catalogSet.notEmptyList) {
                this_.errors.catalogSet = this_.errors.catalogSet.concat(errorMessages['catalogSet'])
            }
            if (hasError(this_, 'petService')) {
                this_.errors.catalogSet = this_.errors.catalogSet.concat(errorMessages['petService'])
            }
            if (hasError(this_, 'price')) {
                this_.errors.catalogSet = this_.errors.catalogSet.concat(errorMessages['price'])
            }
            if (hasError(this_, 'units')) {
                this_.errors.catalogSet = this_.errors.catalogSet.concat(errorMessages['units'])
            }
        }
    },
    validateForm: (this_) => {
        validateField(this_, 'profile', 'phone')
        validateField(this_, 'profile', 'name')
        validateField(this_, 'profile', 'city')
        if (this_.activePetsitter) {
            validateField(this_, 'profile', 'catalogSet')
            validateField(this_, 'profile', 'animals')
        }
    }
}

export const validationConfigs = {
    login: () => {
        return {
            user: {
                email: {
                    required,
                    email
                },
                password: {
                    required
                }
            }
        }
    },
    registration: () => {
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
    },
    newOrder: () => {
        return {
            order: {
                city: {
                    required,
                },
                client: {
                    required,
                },
                animals: {
                    required,
                    notEmptyList
                },
                petServices: {
                    required,
                    notEmptyList
                },
                startDate: {
                    startDateValidator
                },
                endDate: {
                    endDateValidator
                },
            }
        }
    },
    profile: (activePetsitter) => {
        if (!activePetsitter) {
            return {
                profile: {
                    name: {
                        required
                    },
                    phone: {
                        required
                    },
                    city: {
                        required
                    }
                }
            }
        } else {
            return {
                profile: {
                    name: {
                        required
                    },
                    phone: {
                        required
                    },
                    city: {
                        required,
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
}
