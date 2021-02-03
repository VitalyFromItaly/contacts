<template>
<div id="info-details" @keydown.esc="isEditClicked = false">
  <Modal @close="isEditClicked = !isEditClicked" v-if="isEditClicked" class="flex items-center justify-center bottom-32">
    <template v-slot:header><span class="text-base sm:text-lg">Add a new field</span></template>
    <template v-slot:body>
      <div class="mx-5">
        <input id="field" v-model="field" :disabled="field == 'name' || field == 'surname'" @keydown.enter.prevent="keyAndValueChange" :class="{ ' opacity-50': field == 'name' || field == 'surname' }" class="w-full text-gray-900 rounded-md pl-3 mt-5" />
        <label v-if="
              (isEditClicked && nameField == 'surname') ||
              (isEditClicked && nameField == 'name')
            " class="text-sm uppercase font-semibold text-yellow-400" for="field">
          The field can not be editted.
        </label>
        <input v-model="value" class="text-gray-900 my-5 rounded-md pl-3 w-full" @keydown.enter.prevent="keyAndValueChange" />
      </div>
      <button class="bg-green-500 py-1 px-2 rounded-md text-gray-100 hover:bg-green-700 hover:text-white mb-3 mr-5 float-right" v-if="isEditClicked" @click="keyAndValueChange">
        change
      </button>
    </template>
  </Modal>
  <div class="flex items-end justify-between space-y-4 space-x-5">
    <div class="sm:flex" v-if="!isId && !isIndex">
      <p class="text-gray-500">{{ nameField }}:</p>
      <p class="ml-1">{{ nameValue }}</p>
    </div>
    <div v-if="!isId && !isIndex" class="ml-auto">
      <button class="mr-auto" @click="editField">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" class="fill-current w-8 text-yellow-400 hover:text-yellow-700" role="img" viewBox="0 0 576 512">
          <path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
        </svg>
      </button>
      <button v-if="nameField !== 'name'" @click="deleteKey" class="ml-5">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="fill-current w-6 hover:text-red-800 text-red-500" role="img" viewBox="0 0 448 512">
          <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
        </svg>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from "vuex";
import Modal from "./Modal";
export default {
  name: "info-details",
  props: ["nameValue", "nameField", "index"],
  components: {
    Modal,
  },
  data() {
    return {
      isEditClicked: false,
      field: null,
      value: null,
      keyDeleted: false,
    };
  },
  methods: {
    ...mapActions([
      "DEFINE_CHANGING_KEY_IN_CURRENT_CONTACT",
      "DEFINE_DELETING_KEY",
    ]),
    editField() {
      this.isEditClicked = !this.isEditClicked;
    },
    keyAndValueChange() {
      this.DEFINE_CHANGING_KEY_IN_CURRENT_CONTACT({
        id: this.$route.params.id,
        keyOld: this.nameField,
        keyNew: this.fieldName,
        valueOld: this.nameValue,
        valueNew: this.value,
        index: this.currentIndex,
      });
      this.isEditClicked = !this.isEditClicked;
    },
    deleteKey() {
      if (confirm("Are you sure you want to delete this field?")) {
        this.DEFINE_DELETING_KEY({
          id: this.$route.params.id,
          deletingKey: this.nameField,
          index: this.currentIndex,
        });
      }
    },
  },
  created() {
    this.field = this.nameField;
    this.value = this.nameValue;
  },
  computed: {
    ...mapGetters(["GET_INDEX_BY_ID"]),
    fieldName: {
      get: function () {
        return this.field;
      },
      set: function (value) {
        this.filed = value;
      },
    },
    valueName: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.value = value;
      },
    },
    currentIndex() {
      return this.GET_INDEX_BY_ID(this.$route.params.id);
    },
    isId() {
      if (this.nameField == "id") {
        return true;
      } else {
        return false;
      }
    },
    isIndex() {
      if (this.nameField == "index") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
