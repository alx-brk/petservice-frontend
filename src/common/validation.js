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
    repeatPassword: ["Повторите пароль"]
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

const hasError = (this_, field) => {
    for (var key in this_.$v.profile.catalogSet.$each.$iter){
        if (this_.$v.profile.catalogSet.$each.$iter.hasOwnProperty(key)){
            if (this_.$v.profile.catalogSet.$each.$iter[key][field].$anyError){
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
        groupInputAction(this_, 'profile', 'account','email', value)
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
        groupInputAction(this_, 'profile', 'account','repeatPassword', value)
    },
    accountInvalid(this_){
        return this_.$v.profile.email.$invalid || this_.$v.profile.password.$invalid || this_.$v.profile.repeatPassword.$invalid
    },
    validateAccount: (this_) => {
        validateGroupField(this_, 'profile', 'account','email')

        this_.$v.profile.password.$touch()
        this_.errors.account.password = []
        if (!this_.$v.profile.password.required) {
            this_.errors.account.password.push(errorMessages['passwordRequired'])
        }
        if (!this_.$v.profile.password.strongPassword) {
            this_.errors.account.password.push(errorMessages['passwordStrong'])
        }

        validateGroupField(this_, 'profile', 'account','repeatPassword')
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
        if (this_.$v.profile.catalogSet.$error){
            this_.errors.catalogSet.push(errorMessages['catalogSet'])
        }
    },
    catalogSetChange(this_) {
        if (this_.$v.profile.catalogSet !== undefined) {
            this_.$v.profile.catalogSet.$touch()

            this_.errors.catalogSet = defaultValues['catalogSet']
            if (this_.$v.profile.catalogSet.$error){
                this_.errors.catalogSet.push(errorMessages['catalogSet'])
            }
            if (hasError('petService')){
                this_.errors.catalogSet.push(errorMessages['petService'])
            }
            if (hasError('price')){
                this_.errors.catalogSet.push(errorMessages['price'])
            }
            if (hasError('units')){
                this_.errors.catalogSet.push(errorMessages['units'])
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