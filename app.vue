<template>
  <main>  
    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="templating">
            <template #message="slotProps">
                <div class="flex p-4">
                    <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
                    <p class="pl-2">{{slotProps.message.message}}</p>
                </div>
            </template>
    </ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>
    <Toast/>
    <NuxtPage/>
  </main>
</template>
 <style>
    @import "~/public/css/theme.css";
</style>