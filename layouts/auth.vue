<template>
  <main>
    <link rel="stylesheet" href="/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/css/authentication.css" />
    <link rel="stylesheet" href="/css/primeblocks.css" />
    
 <div class="layout-main-container">
  <div class="layout-main">
    <slot />
  </div>
</div>
</main>
</template>
<script>
export default {
head(){
    return {
        script: [
            {
              src: "js/bootstrap.bundle.min.js",
            }
        ]
    }
},
}
</script>
<style>
    @import "~/public/css/theme.css";
</style>
