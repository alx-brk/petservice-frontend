<template>
    <keep-alive>
        <s1-account-data v-if="showAccountData" v-model="step"></s1-account-data>
    </keep-alive>
</template>

<script>
    import S1AccountData from "./S1AccountData";

    export default {
        name: "StepContainer",
        components: {
            's1-account-data': S1AccountData
        },
        props: ["step"],
        computed: {
            showAccountData() {
                return (this.step !== undefined && this.step.stepIndex === 1)
            }
        }
    }
</script>

<style scoped>

</style>