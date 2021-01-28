<template>
  <div id="contacts" class="mb-auto">
    <ModalNewContact
      @close="isModalOpen = !isModalOpen"
      v-if="isModalOpen"
      class="flex items-center justify-center"
    >
      <template v-slot:header>Add a new contact</template>
      <template v-slot:body>
        <!--<form method="get" >-->
          <div >
            <input class="mx-10 px-20 my-2 " placeholder="add first name">
            <input class=" mx-10 px-20 my-2" placeholder="add last name">
          </div>
        <!--</form>-->

      </template>
    </ModalNewContact>
    <div class="py-10">
      <div class="flex items-baseline justify-between">
        <div>
          <Contact v-for="contact in defaultContacts" :key="contact.id" :contact="contact" />
        </div>
        <button
          @click.prevent="addContact, isModalOpen = !isModalOpen "
          class="text-3xl hover:bg-gray-700 px-1 rounded-md"
        >+</button>
      </div>
    </div>
  </div>
</template>
<script>
import Contact from "./Contact";
import ModalNewContact from "./ModalNewContact";
export default {
  name: "contacts",
  components: {
    Contact,
    ModalNewContact
  },
  data() {
    return {
      isModalOpen: false,
      newContact: new Object(),
      defaultContacts: [
        {
          id: 1,
          firstName: "Steve",
          lastName: "Jobs",
          number: "+13049658492"
        },
        {
          id: 2,
          firstName: "Peter",
          lastName: "Parker",
          number: "+134263812"
        },
        {
          id: 3,
          firstName: "Bill",
          lastName: "Gates",
          number: "+4869302556"
        },
        {
          id: 4,
          firstName: "Vladimir",
          lastName: "Ivanov",
          number: "+79124593123"
        }
      ]
    };
  },
  methods: {
    addContact() {
      this.newContact.id = this.defaultContacts.length + 1;
      (this.newContact.firstName = "Vitaly Frolov"),
        (this.newContact.number = "+79452342341");
      this.defaultContacts.push(this.newContact);
      this.newContact = {};
      console.log(this.newContact);
    }
  }
};
</script>
