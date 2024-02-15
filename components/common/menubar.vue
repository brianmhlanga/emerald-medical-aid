<template>
    <div class="bg-green-600 shadow-2 flex relative lg:static" style="min-height: 84px;">
    <div class="flex align-items-center justify-content-center px-5 bg-whitey-500">
        <img @click="navigateTo('https://www.emeraldmas.com/',{external: true})" src="/images/logo.png" alt="Image" height="40">
    </div>
    <a class="cursor-pointer flex align-items-center justify-content-center lg:hidden text-white pr-5 mt-1 p-ripple" data-pd-ripple="true" data-pd-styleclass="true">
        <i class="pi pi-bars text-4xl"></i>
        <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
    </a>
    </div>
</template>
<script lang="ts" setup>
</script>
<style>
.flex.align-items-center.justify-content-center.px-5.bg-whitey-500 {
    background-color: white;
}
</style>