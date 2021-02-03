<template>
<div id="info">
    <BackBtn class="mt-5" />
    <h1 class="text-3xl text-center mt-3">Detail Info</h1>
  <div v-if="current" class="mt-10 text-2xl">
    <InfoDetails v-for="(nameValue, nameField) in current" :key="nameValue.id" :nameValue="nameValue" :nameField="nameField"  />
    <div v-if="isAddFieldClicked">
      <input v-model="newFieldName" placeholder="email" class="block text-gray-900 my-5 px-2" />
      <input v-model="newFieldValue" placeholder="test@test.com" class="text-gray-900 px-2" @keydown.enter="addNewField"/>
      <button class="block mt-4 bg-green-500 text-green-100 px-2 py-1 hover:bg-green-700 rounded-md" @click="addNewField" >submit</button>
    </div>
    <button class="bg-blue-400 text-gray-50 py-1 px-2 rounded-md my-10 hover:bg-blue-700" v-if="!isAddFieldClicked" @click="isAddFieldClicked = !isAddFieldClicked">add field</button>
    <button class=" mt-5 float-right" v-if="GET_ACTION_HAPPENED_STATE" @click="cancelAction">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="undo-alt" class="fill-current w-6 hover:text-purple-800 text-purple-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"></path>
      </svg>
    </button>
  </div>
  <div v-else class="text-center text-red-600 text-5xl mt-10">No contact found</div>
</div>
</template>
<script>
import {
  mapActions,
  mapGetters,
} from "vuex";
import BackBtn from "./BackBtn";
import InfoDetails from './InfoDetails'
export default {
  name: "info",
  data() {
    return {
      isAddFieldClicked: false,
      newFieldName: null,
      newFieldValue: null,
      isEditClicked: false,
      deletedField:false,
    };
  },
  components: {
    BackBtn,
    InfoDetails
  },
  methods: {
    ...mapActions(['DEFINE_NEW_FILED_TO_CONTACT','CANCEL_PREV_ACTION']),
    cancelAction() {
      this.CANCEL_PREV_ACTION(
        this.current.id
      )
    },
    addNewField() {
      if (confirm('Add a new field?')) {
        this.DEFINE_NEW_FILED_TO_CONTACT({
        id: this.current.id,
        newKey: this.newFieldName,
        newValue: this.newFieldValue,
        });
      }
      this.isAddFieldClicked = !this.isAddFieldClicked;
      this.newFieldName = '';
      this.newFieldValue = ''
    },
  },
  computed: {
    ...mapGetters(['GET_CONTACT_BY_ID','GET_ACTION_HAPPENED_STATE','GET_ID','GET_INDEX_BY_ID']),
    current() {
      return this.GET_CONTACT_BY_ID(this.$route.params.id)
    },
    currentIndex() {
      return this.GET_INDEX_BY_ID(this.current.id)
    },
    id() {
      return this.GET_ID
    },
  }
};
</script>
