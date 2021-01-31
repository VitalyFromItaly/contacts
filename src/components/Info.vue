<template>
<div id="info">
  <div class="grid grid-cols-2">
    <BackBtn class="mt-5" />
    <h1 class="text-3xl justify-self-auto my-5">Detail Info</h1>
  </div>
  <div v-if="currentContact !== undefined" class="mt-10 text-2xl">
    <InfoDetails v-for="(nameValue, nameField) in GET_CURRENT_CONTACT" :key="nameValue.id" :nameValue="nameValue" :nameField="nameField"  />
    <div v-if="isAddFieldClicked">
      <input v-model="newFieldName" placeholder="new field" class="block text-gray-900 my-5" />
      <input v-model="newFieldValue" placeholder="new field value" class="text-gray-900" />
      <button class="block mt-4 bg-gray-400" @click="submitAdding">submit</button>
    </div>
    <button class="bg-blue-400 text-gray-50 py-1 px-2 rounded-md my-10" v-if="!isAddFieldClicked" @click="isAddFieldClicked = !isAddFieldClicked">add field</button>
  </div>
  <div v-else class="text-center text-red-600 text-5xl mt-10">No contact found</div>
</div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from "vuex";
import BackBtn from "./BackBtn";
import InfoDetails from './InfoDetails'
export default {
  name: "info",
  data() {
    return {
      invisibleKeys: ["id"],
      currentContact: null,
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
    ...mapActions(['DEFINE_CURRENT_CONTACT', 'DEFINE_NEW_FILED_TO_CONTACT']),
    deleteKey(value) {
      this.deletedField = value
    },
    submitAdding() {
      //this.keys.push(this.newFieldName);
      let payload = {
        newKey: this.newFieldName,
        newValue: this.newFieldValue,
      }
      if (confirm('Add a new field?')) {
        this.DEFINE_NEW_FILED_TO_CONTACT(payload);
      }
      this.isAddFieldClicked = !this.isAddFieldClicked;
    },
    setCurrentContact() {
      this.DEFINE_CURRENT_CONTACT(this.$route.params.id);
    },

  },
  created() {
    this.setCurrentContact();
  },
  watch: {
    $route: function () {
      if (this.$route.name == 'info')
        this.setCurrentContact();
    },
  },
  computed: {
    ...mapGetters(["GET_ALL_CONTACTS", 'GET_CURRENT_CONTACT']),
    current: {
      get() {
        return this.GET_CURRENT_CONTACT
      },
      set() {
        this.setCurrentContact()
      }
    }
  //  //set() {

  //  //}

  //  //keys() {
  //  //  return Object.keys(this.GET_CURRENT_CONTACT).filter(key => !this.invisibleKeys.includes(key));
  //  //},
  }
};
</script>
