<template>
  <div id="contact">
    <div class="mb-3 ">
      <h1
      class="mb-5 hover:bg-gray-700 py-2 px-3 rounded-lg pb-1 cursor-pointer border-b border-gray-100">
      {{contact.firstName}} {{contact.lastName}}</h1>

    </div>

  </div>
</template>

<script>
export default {
name:'contact',
props:['contact']
}
</script>

<style>

</style>