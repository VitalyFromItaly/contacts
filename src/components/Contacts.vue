<template>
  <div id="contacts" class="mb-auto">
    <!--the modal window for adding a new contact -->
    <Modal
      @close="isModalOpenContact = !isModalOpenContact"
      v-if="isModalOpenContact"
      class="flex items-center justify-center">
      <!-- to center the modal-->
      <template v-slot:header>Add a new contact</template>
      <template v-slot:body>
        <form
          method="get"
          @keydown.enter.prevent="addNewContact"
          class="sm:flex sm:items-end text-gray-900 sm:my-5">
          <div>
            <input
              class="pl-5 py-1 rounded-md ml-5 sm:w-4/5 mt-5 sm:mt-0 bg-gray-200"
              placeholder="add first name"
              v-model="newContact.firstName"
              id="firstName"
            />
            <label class="text-yellow-300 block pl-5 pt-2" v-if="isContactEmpty" for="firstName">The field is required.</label>
            <input
              class="pl-5 py-1 rounded-md ml-5 sm:w-4/5 mt-5 bg-gray-200"
              placeholder="add last name"
              v-model="newContact.lastName"
              name="lastName"
            />
            <input
              class="pl-5 py-1 rounded-md ml-5 sm:w-4/5 mt-5 bg-gray-200"
              placeholder="add phone number"
              v-model="newContact.phoneNumber"
              name="phone"
            />
          </div>
          <button
            :disabled="isContactEmpty"
            @click.prevent="addNewContact"
            :class="[isContactEmpty ? 'cursor-not-allowed' : '']"
            type="button"
            class="mx-5 my-5 sm:my-0 px-5 focus:outline-none bg-gray-200 hover:bg-gray-500 text-gray-700 font-semibold hover:text-white border border-gray-500 hover:border-transparent rounded"
          >Add a contact</button>
        </form>
      </template>
    </Modal>
    <div class="py-10">
      <div class="flex items-baseline justify-between">
        <div>
          <Contact
            v-for="contact in GET_ALL_CONTACTS"
            :key="contact.id"
            :contact="contact"
            @removeContact="removeContact"
          />
        </div>
        <button
          @click.prevent="isModalOpenContact = !isModalOpenContact "
          class="text-3xl hover:bg-gray-700 px-1 rounded-md"
        >+</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Contact from "./Contact";
import Modal from "./Modal";
export default {
  name: "contacts",
  components: {
    Contact,
    Modal
  },
  data() {
    return {
      isModalOpenContact: false,
      newContact: new Object(),
    };
  },
  methods: {
    ...mapActions(['DEFINE_DELETING_CONTACT','DEFINE_NEW_CONTACT']),
    addNewContact() {
      if (!this.isContactEmpty) {
        this.newContact.id = Math.random().toString(20).substr(2,10);
        this.DEFINE_NEW_CONTACT(this.newContact);
      }
      this.newContact = {};
      this.isModalOpenContact = !this.isModalOpenContact;
    },
    removeContact(contact) {
      if (confirm("Are you sure you want to delete the contact?")) {
        //the confirmation of deleting the chosen contact
        this.DEFINE_DELETING_CONTACT(contact);
      }
    },
  },
  computed: {
    ...mapGetters(['GET_ALL_CONTACTS']),
    isContactEmpty() {
      // to prevent of pushing of an empty contact
      //if (Object.keys(this.newContact).length == 0)
      if (this.newContact.firstName == undefined || this.newContact.firstName =='')
       {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
