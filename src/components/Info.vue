<template>
  <div id="info">
    <BackBtn class="mt-5" />
    <h1 class='text-center text-3xl my-5'>
      Detail Info
    </h1>
    <h1>First Name</h1>
    <h1>Last Name</h1>
    <h1>Phone Number</h1>
  </div>
</template>

<script>
import BackBtn from './BackBtn'
export default {
  name:'info',
  props:['contact'],
  components: {
    BackBtn
  }
}
</script>