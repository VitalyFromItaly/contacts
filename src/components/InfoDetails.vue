<template>
<div id="info-details">
  <div class="flex">
    <div v-if="!isEditClicked">{{fieldName}} :</div>
    <p v-if="!isEditClicked" class="pl-1"> {{GET_CURRENT_CONTACT[k]}}</p>
    <input v-model="field" v-if='isEditClicked' class="block text-gray-900 my-5">
    <input v-model="GET_CURRENT_CONTACT[k]" v-if='isEditClicked' class="block text-gray-900 my-5">
    <button v-if="isEditClicked" @click="keyChange">change</button>
    <button @click="editField">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" class="fill-current w-8 ml-10 text-yellow-400" role="img" viewBox="0 0 576 512">
        <path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" /></svg>
    </button>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from "vuex";
export default {
  name: 'info-details',
  props: ['k'],
  data() {
    return {
      isEditClicked: false,
      field:'',
      value:null,
    }
  },
  methods: {
     ...mapActions(['DEFINE_NEW_KEY_IN_CURRENT_CONTACT']),
    editField() {
      this.isEditClicked = !this.isEditClicked;

    },
    keyChange() {
      let payload = {
        id: this.GET_CURRENT_CONTACT.id,
        keyOld:this.k,
        keyNew:this.fieldName
      }
      this.DEFINE_NEW_KEY_IN_CURRENT_CONTACT(payload)
      this.isEditClicked = !this.isEditClicked;
    }
  },
  created() {
      this.field = this.k;
          },
  computed: {
    ...mapGetters(['GET_ALL_CONTACTS','GET_CURRENT_CONTACT']),
    fieldName: {
      get: function () {
        return this.field;
      },
      set: function(value) {
        this.filed = value
      }
    },
  }
}
</script>
