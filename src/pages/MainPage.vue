<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { allContacts, getContact } from '../api/api';
import type { Contact } from '../types/index';
import BaseModal from './BaseModal.vue';
import debounce from 'lodash/debounce';

const contacts = ref<Contact[]>([]);
const contact = ref<Contact>();
const simpleFilter = ref<string>('');
const isModalOpen = ref<boolean>(false);
const selectedUser = ref<Contact>();

const getContacts = () => {
  allContacts().then((result: any) => {
    console.log(result);
    contacts.value = result;
    console.log(contacts.value);
  });
};

const filterContacts = debounce(() => {
  getContact(simpleFilter.value).then((result: any) => {
    console.log(result);
    contact.value = result[0];
    console.log(contact.value);
  });
  console.log(simpleFilter.value);
}, 500);

const selectUserHandler = (user: string) => {
  if (simpleFilter.value.length == 0) {
    selectedUser.value = contacts.value.find((client) => client.name === user);
    console.log(selectedUser.value);
    isModalOpen.value = true;
  } else {
    selectedUser.value = contact.value;
    console.log(selectedUser.value);
    isModalOpen.value = true;
  }
};

onMounted(() => {
  getContacts();
  console.log(simpleFilter.value.length);
});
</script>

<template>
  <div class="wrapper">
    <BaseModal
      v-if="isModalOpen"
      @switchBaseModal="isModalOpen = false"
      :user="selectedUser"
    />
    <input type="text" v-model="simpleFilter" @input="filterContacts" />
    <div class="contacts">
      <div
        class="contact"
        v-if="simpleFilter.length > 0"
        @click="selectUserHandler(contact.name)"
      >
        <div class="name">{{ contact.name }}</div>
        <div class="contacts_container">
          <div>
            <img class="phone" src="../assets/icons/tel.svg" alt="phone" />{{
              contact.phone
            }}
          </div>
          <div>
            <img class="email" src="../assets/icons/email.svg" alt="email" />{{
              contact.email
            }}
          </div>
        </div>
      </div>
      <div
        v-if="simpleFilter.length == 0"
        class="contact"
        v-for="contact in contacts"
        :key="contact.name"
        @click="selectUserHandler(contact.name)"
      >
        <div class="name">{{ contact.name }}</div>
        <div class="contacts_container">
          <div>
            <img class="phone" src="../assets/icons/tel.svg" alt="phone" />{{
              contact.phone
            }}
          </div>
          <div>
            <img class="email" src="../assets/icons/email.svg" alt="email" />{{
              contact.email
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 1120px;
  margin: 0px auto;
}

input {
  width: 1120px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid rgba(212, 222, 254, 1);
  outline: none;
  padding-left: 20px;
  margin: 24px 0px;
}

.contacts {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.contact {
  width: 357px;
  height: 314px;
  border-radius: 16px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  cursor: pointer;
}

.contact:nth-child(3n + 2) {
  margin: 0px 24px 0px 24px;
}

.name {
  line-height: 30px;
  font-size: 24px;
  font-weight: 700;
}

.phone {
  width: 14px;
  height: 24px;
  margin-left: 10px;
}

.email {
  width: 24px;
  height: 14px;
}

img {
  margin: 5px 15px 5px 5px;
  vertical-align: middle;
}

.contacts_container {
  margin-top: 20px;
  height: 60px;
}

.contacts_container div {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(129, 137, 163, 1);
}
</style>
