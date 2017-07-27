<template>
<div>
    <p>{{ app_name }}</p>
    <router-view></router-view>
</div>
</template>

<style lang="sass"></style>

<script>
export default {
    data() {
        return {
            app_name: 'Trade Street'
        }
    }
}
</script>
