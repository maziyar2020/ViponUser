<template>
  <teleport to="#toast" :disabled="!notificationLength">
    <transition name="bounce">
      <div
        class="notification-container"
        v-if="notificationLength"
      >
        <NotificationBar
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
        />
      </div>
    </transition>
  </teleport>
</template>

<script>
import NotificationBar from "./NotificationBar.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "notification-container",
  components: {
    NotificationBar,
  },
  computed: {
    ...mapState(["notifications"]),
    ...mapGetters(["notificationLength"]),
  },
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 100px;
  right: 0;
  left: 0;
  margin: 0 auto;
  z-index: 500;
  width: 350px;
  font-size: 16px;
  text-align: right;
  overflow: hidden;
}
@media only screen and (max-width: 500px) {
  .notification-container {
    width: 200px;
    font-size: 14px;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(300%);
  }
  50% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>