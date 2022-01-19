<template>
  <teleport to="#modal" :disabled="!isOpen">
    <transition name="bounce">
      <div class="modal" v-if="isOpen">
        <div class="modal__header">
          <slot name="header"></slot>
        </div>
        <div class="modal-content">
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "modal",
  props: ["isOpen"],
  mounted() {
    if (this.isOpen) {
      document.body.style.overflow = "hidden";
    }
  },
  updated() {
    if (this.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  },
  unmounted() {
    document.body.style.overflow = "auto";
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  overflow: hidden;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 60%;
  width: 92%;
  z-index: 300;
  border-radius: 10px;
  background-color: #fff;
}
.modal__header {
  background-color: #ddd;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}
.modal-content {
  height: 100%;
  overflow: auto;
  padding-bottom: 60px;
}
.modal-item {
  width: 96%;
  margin: 0 auto;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  text-align: center;
  cursor: pointer;
  background-color: #fff;
}
.modal__day:hover {
  background-color: #f7f6f5;
}
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(300%);
  }
  50% {
    transform: translateY(150%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>