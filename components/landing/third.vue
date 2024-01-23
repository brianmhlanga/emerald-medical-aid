<template>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div class="parent-container">
            <img width="180" src="/images/logo.png" alt="Logo">
        </div>
    <div class="flex flex-wrap">
        <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div class="text-center text-900 text-5xl font-bold mb-5">Available Packages</div>
        <div class="grid nogutter">
            <div class="col-12 lg:col-6 p-6">
            <div class="custom-shadow-2 border-round h-full surface-card">
            <img src="/images/civil.jpg" alt="Image" class=" block w-full border-round-top">
            <div class="p-4">
                <div class="text-xl text-900 font-medium mb-3 line-height-3">Civil Servants</div>
                <div class="line-height-3 mb-3 text-700 mb-4">Cater specifically to civil servants, providing health coverage tailored for government employees.</div>
                <Button @click="navigateTo('/civil')" class="p-button p-component w-full" label="Register Today" icon="pi pi-map" />
            </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 p-6">
            <div class="custom-shadow-2 border-round h-full surface-card">
            <img  src="/images/individuals.jpg" alt="Image" class="block w-full border-round-top">
            <div class="p-4">
                <div class="text-xl text-900 font-medium mb-3 line-height-3">Individuals</div>
                <div class="line-height-3 mb-3 text-700 mb-4">Tailored to provide comprehensive health coverage and additional benefits to individual members.</div>
                <Button @click="navigateTo('/individuals')" class="p-button p-component w-full" label="Register Today" icon="pi pi-map" />
            </div>
            </div>
        </div>
        </div>
        </div>
    </div>
    </div>
</template>
<style>
.custom-shadow-2 {
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 5px 10px 0 rgba(41,61,102,.2);
    border: 1px solid #e1e8f5;
    padding: 24px 20px;
}
.parent-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28vh;
}
img.image-height.block.w-full.border-round-top {
    height: 400px;
}
.flex-wrap {
    flex-wrap: wrap!important;
    justify-content: center;
    align-items: center;
}
</style>