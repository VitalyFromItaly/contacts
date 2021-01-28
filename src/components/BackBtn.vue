<template>
  <div id="back-button">
    <button
    class="flex items-center bg-blue-100 hover:bg-blue-700 hover:text-blue-100 text-gray-900 font-medium px-2 py-2 rounded-md"
    @click="backToContacts">
      Back to Contacts
    </button>
  </div>
</template>
<script>
export default {
  name:'back-button',
  methods: {
    backToContacts() {
      this.$router.push({name: 'contacts'})
    }
  }
}
</script>

<style>

</style>