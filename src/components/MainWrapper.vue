<template>
  <div id="wrapper" class="subpixel-antialiased flex flex-col min-h-screen">
    <VueHeader />

    <div class=" bg-gray-900 px-10 lg:px-40 text-gray-100 flex-grow">
      <!--<keep-alive>-->
          <router-view>
          </router-view>
        <!--</keep-alive>-->
    </div>
    <Vue-Footer />
  </div>
</template>
<script>
import VueHeader from "./VueHeader";
import VueFooter from "./VueFooter";
export default {
  name: "wrapper",
  components: {
    VueHeader,
    VueFooter
  },
};
</script>
