<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Contact } from '../types/index';

const accent = ref(null);

interface Emits {
  (e: 'switchBaseModal'): void;
}

interface Props {
  user: Contact;
}

const props = defineProps<Props>();
const selectedUser = props.user;

function addZero(num) {
  if (num >= 0 && num <= 9) {
    return '0' + num;
  } else {
    return num;
  }
}

const date = new Date(selectedUser.hire_date);
const rightFormat =
  addZero(date.getDate()) +
  '.' +
  addZero(date.getMonth() + 1) +
  '.' +
  addZero(date.getFullYear());

const emit = defineEmits<Emits>();

const closeHandler = () => {
  emit('switchBaseModal');
};

onMounted(() => {
  accent.value.focus();
  console.log(selectedUser);
});
</script>

<template>
  <div
    ref="accent"
    class="fix"
    tabindex="-1"
    @click.self="closeHandler"
    @keydown.esc="closeHandler"
  >
    <div class="contact">
      <span class="name">{{ selectedUser.name }}</span>
      <img
        class="strike"
        src="../assets/icons/strike.svg"
        alt="phone"
        @click="closeHandler"
      />
      <div class="details">
        <div class="left_content">
          <div>Телефон:</div>
          <div>Почта:</div>
          <div>Дата приёма:</div>
          <div class="prend_content">Должность:</div>
          <div class="end_content">Подразделение:</div>
        </div>
        <div class="right_content">
          <div>{{ selectedUser.phone }}</div>
          <div>{{ selectedUser.email }}</div>
          <div>{{ rightFormat }}</div>
          <div>{{ selectedUser.position_name }}</div>
          <div>{{ selectedUser.department }}</div>
        </div>
      </div>
      <div>
        <span class="info">Дополнительная информация</span>
        <div class="low_info">
          Разработчики используют текст в качестве заполнителя макта страницы.
          Разработчики используют текст в качестве заполнителя макта страницы.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fix {
  z-index: 10;
  background: rgba(188, 195, 208, 0.5);
  width: 100%;
  height: 100vh;
  opacity: 60;
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}

.contact {
  width: 500px;
  height: 468px;
  border-radius: 16px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  background: white;
  margin: 5% auto;
}

.strike {
  float: right;
  cursor: pointer;
  padding: 10px;
}

.name {
  font-weight: 700;
  font-size: 24px;
}

.info {
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  font-family: Proxima Nova;
  color: rgba(38, 44, 64, 1);
}

.low_info {
  color: rgba(129, 137, 163, 1);
  font-family: Proxima Nova;
  font-size: 16px;
  line-height: 18px;
}

.details {
  margin: 14px 0px;
  display: flex;
  flex-direction: row;
}

.right_content {
  margin-left: 30px;
  color: rgba(129, 137, 163, 1);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  vertical-align: middle;
}

.left_content {
  color: rgba(38, 44, 64, 1);
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  vertical-align: middle;
}

.left_content div,
.right_content div {
  margin-bottom: 15px;
}

.prend_content {
  margin-top: 25px;
}

.end_content {
  margin-top: 30px;
}
</style>
