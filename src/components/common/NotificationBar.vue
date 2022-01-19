<template>
  <div
    class="notification"
    :class="[
      error && 'notification--error',
      success && 'notification--success',
      warning && 'notification--warning',
    ]"
  >
    <div class="notification__content">
      <!-- warning svg -->
      <svg
        viewBox="0 0 512 512"
        class="notification-logo"
        :class="[warning && 'notification-logo--warning']"
        v-if="warning"
      >
        <path
          d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256
			C512,114.497,397.493,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216
			c119.393,0,216,96.615,216,216C472,375.393,375.385,472,256,472z"
        />

        <path
          d="M256,128.877c-11.046,0-20,8.954-20,20V277.67c0,11.046,8.954,20,20,20s20-8.954,20-20V148.877
			C276,137.831,267.046,128.877,256,128.877z"
        />

        <circle cx="256" cy="349.16" r="27" />
      </svg>
      <!-- success svg -->
      <svg viewBox="0 0 507.2 507.2" class="notification-logo" v-if="success">
        <circle style="fill: #32ba7c" cx="253.6" cy="253.6" r="253.6" />
        <path
          style="fill: #0aa06e"
          d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"
        />

        <path
          style="fill: #ffffff"
          d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
		c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"
        />
        <path
          style="fill: #ffffff"
          d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
		c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"
        />
      </svg>
      <!-- error svg -->
      <svg viewBox="0 0 455.111 455.111" class="notification-logo" v-if="error">
        <circle style="fill: #e24c4b" cx="227.556" cy="227.556" r="227.556" />
        <path
          style="fill: #d1403f"
          d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333
	c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222
	C422.4,91.022,455.111,155.022,455.111,227.556z"
        />
        <path
          style="fill: #ffffff"
          d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533
	c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533
	c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533
	c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533
	C339.911,308.622,339.911,322.844,331.378,331.378z"
        />
      </svg>

      <p>{{ notification.message }}</p>
    </div>
    <svg
      class="notification__close"
      viewBox="0 0 512.001 512.001"
      @click="closeNotification(notification)"
    >
      <path
        d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
			L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
			c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
			l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
			L284.286,256.002z"
      />
    </svg>
    <progress
      class="notification-progress"
      :value="progress"
      max="100"
    ></progress>
  </div>
</template>

<script>
export default {
  name: "notifications",
  data() {
    return {
      timeOut: null,
      progress: 0,
      warning: false,
      error: false,
      success: false,
    };
  },
  methods: {
    closeNotification(notification) {
      this.$store.dispatch("removeNotification", notification);
    },
    fillProgressBar() {
      setInterval(() => {
        this.progress += 1;
      }, 39);
    },
  },
  props: ["notification"],
  mounted() {
    this.fillProgressBar();
    this.timeOut = setTimeout(() => {
      this.$store.dispatch("removeNotification", this.notification);
    }, 4000);
    switch (this.notification.type) {
      case "error":
        this.error = true;
        break;
      case "warning":
        this.warning = true;
        break;
      case "success":
        this.success = true;
        break;

      default:
        break;
    }
  },
  beforeunmount() {
    clearTimeout(this.timeOut);
  },
};
</script>

<style scoped lang="scss">
.notification {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  background: #fff;
  padding: 8px 8px 7px 15px;
  border-radius: 10px;
  box-shadow: inset 1px 2px 10px 5px rgba(0, 0, 0, 0.2);
  position: relative;
}
.notification__close {
  width: 10px;
  height: 10px;
  fill: #333;
  cursor: pointer;
}
.notification-progress {
  position: absolute;
  width: 80%;
  bottom: 0px;
  right: 0;
  left: 0;
  height: 3px;
  border-radius: 50%;
  margin: auto;
  margin-block: 2px;
}

progress::-webkit-progress-bar {
  background: transparent;
}
progress::-moz-progress-bar {
  background: transparent;
}
.notification--error {
  progress::-webkit-progress-value {
    background: #e24c4b;
  }
  progress::-moz-progress-value {
    background: #e24c4b;
  }
}
.notification--success {
  progress::-webkit-progress-value {
    background: #32ba7c;
  }
  progress::-moz-progress-value {
    background: #32ba7c;
  }
}
.notification--warning {
  progress::-webkit-progress-value {
    background: orange;
  }
  progress::-moz-progress-value {
    background: orange;
  }
}
.notification__content {
  display: flex;
  align-items: center;
}
.notification-logo {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.notification-logo--warning {
  fill: orange;
}
@media only screen and (max-width: 500px) {
  .notification-logo {
    width: 20px;
    height: 20px;
  }
}
</style>