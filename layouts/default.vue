<template>
  <main>
    <!-- Import all the site's css files -->
    <link rel="stylesheet" href="/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/css/lineicons.css" />
    <link rel="stylesheet" href="/css/main.css" />
    <link rel="stylesheet" href="/css/primeblocks.css" />
    <link rel="stylesheet" href="/css/prime.css" />
    <link rel="stylesheet" href="/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="/css/buttons.bootstrap4.min.css">
    <link rel="stylesheet" href="/css/keyTable.dataTables.min.css">
    <!-- ======== sidebar-nav start =========== -->
    <!-- ======== sidebar-nav end =========== -->

    <!-- ======== main-wrapper start =========== -->
  
        <!-- ========== header start ========== -->
     
        <!-- ========== header end ========== -->
    
        <!-- ========== section start ========== -->
        <slot/>

        <!-- ========== footer start =========== -->
  </main>
</template>

<script>

export default defineNuxtComponent ( { 
    head(){
        return {
            meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=0.7' },
              {
                hid: 'description',
                name: 'erp system for silverlands zambia',
                content: 'Silverlands Holdings Zambia'
              }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
              ],
            script: [
              {
                src: "/js/jquery-3.5.1.js"
              },
              {
                src: "/js/bootstrap.bundle.min.js"
              },
              {
                src: "/js/jquery.dataTables.min.js"
              },
              {
                src: "/js/dataTables.bootstrap4.min.js"
              },
              {
                src: "/js/dataTables.buttons.min.js"
              },
              {
                src: "/js/buttons.bootstrap4.min.js"
              },
              {
                src: "/js/buttons.colVis.min.js"
              },
              {
                src: "/js/dataTables.keyTable.min.js"
              },
              {
                src: "/js/jszip.min.js"
              },
              {
                src: "/js/pdfmake.min.js"
              },
              {
                src: "/js/vfs_fonts.js"
              },
              {
                src: "/js/buttons.html5.min.js"
              },
              {
                src: "/js/buttons.print.min.js"
              },
              {
                src: "/js/main.js"
              }
            ] 
        } 
    }
})
</script>
<style>
/* body {
  zoom: 0.7;
} */
</style>