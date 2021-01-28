<template>
  <div id="contacts" class="mb-auto">
    <!--the modal window for adding a new contact -->
    <Modal
      @close="isModalOpenContact = !isModalOpenContact"
      v-if="isModalOpenContact"
      class="flex items-center justify-center"> <!-- to center the modal-->
      <template v-slot:header>Add a new contact</template>
      <template v-slot:body>
        <form
          method="get"
          @keydown.enter.prevent="addNewContact"
          class="sm:flex sm:items-end text-gray-900 sm:my-5"
        >
          <div>
            <input
              class="pl-5 py-1 rounded-md ml-5 sm:w-4/5 mt-5 sm:mt-0 bg-gray-200"
              placeholder="add first name"
              v-model="newContact.firstName"
              name="firstName"
            />
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
            class=" mx-5 my-5 sm:my-0  px-5 focus:outline-none bg-gray-200 hover:bg-gray-500 text-gray-700 font-semibold hover:text-white border border-gray-500 hover:border-transparent rounded"
          >Add a contact</button>
        </form>
      </template>
    </Modal>
    <div class="py-10">
      <div class="flex items-baseline justify-between">
        <div>
          <Contact
            v-for="contact in defaultContacts"
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
      defaultContacts: [
        {
          id: 0,
          firstName: "Steve",
          lastName: "Jobs",
          number: "+13049658492"
        },
        {
          id: 1,
          firstName: "Peter",
          lastName: "Parker",
          number: "+134263812"
        },
        {
          id: 2,
          firstName: "Bill",
          lastName: "Gates",
          number: "+4869302556"
        },
        {
          id: 3,
          firstName: "Vladimir",
          lastName: "Ivanov",
          number: "+79124593123"
        }
      ]
    };
  },
  methods: {
    addNewContact() {
      if (!this.isContactEmpty) {
        this.newContact.id = this.defaultContacts.length;
        this.defaultContacts.push(this.newContact);
      }
      this.newContact = {};
      this.isModalOpenContact = !this.isModalOpenContact;
    },
    removeContact(contact) {
      if (confirm("Are you sure?")) { //the confirmation of deleting chosen contact
        this.defaultContacts = this.defaultContacts.filter(
          e => e.id !== contact.id
        );
        for (let i = 0; i < this.defaultContacts.length; i++) { // to update all ids of this.defaultContacts.
          this.defaultContacts[i].id = i;
        }
      }
    }
  },
  computed: {
    isContactEmpty() {
      // to prevent of pushing of an empty contact
      if (Object.keys(this.newContact).length == 0) {
        return true;
      } else {
        return false;
      }
    }
  },
};
</script>
