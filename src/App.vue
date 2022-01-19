<template>
  <NotificationContainer />
  <router-view />
</template>

<script>
import NotificationContainer from '@common/NotificationContainer.vue'
export default {
  name : 'app',
  components:{
    NotificationContainer
  },
}
</script>

<style lang="scss">
@font-face {
  font-family: "iransans";
  src: url("./assets/fonts/iransans.ttf");
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  outline: none;
  font-family: "iransans";
}
body {
  direction: rtl;
}
.main-section {
  padding: 70px 0 50px;
  background-color: #eee;
  min-height:  100vh;
}
.eng-num {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
}
// loading svg styles
.f1 {
  fill: #8f6d28;
  stroke: #000000;
  stroke-opacity: 0;
  opacity: 0;
  animation: w1 2s infinite;
  animation-delay: 0s;
}

@keyframes w1 {
  0% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #8f6d28;
  }

  5% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #8f6d28;
  }

  35% {
    transform: translateY(0px);
    opacity: 1;
    fill: #8f6d28;
  }

  65% {
    transform: translateY(0px);
    opacity: 1;
    fill: #8f6d28;
  }

  95% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #8f6d28;
  }

  100% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #8f6d28;
  }
}

.f2 {
  fill: #c93;
  stroke: #000000;
  stroke-opacity: 0;
  opacity: 0;
  animation: w2 2s infinite;
  animation-delay: 0s;
}

@keyframes w2 {
  0% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #8f6d28;
  }

  10% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #8f6d28;
  }

  45% {
    transform: translateY(0px);
    opacity: 1;
    fill: #8f6d28;
  }

  55% {
    transform: translateY(0px);
    opacity: 1;
    fill: #8f6d28;
  }

  90% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #8f6d28;
  }

  100% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #8f6d28;
  }
}

.f3 {
  fill: #c93;
  stroke: #000000;
  stroke-opacity: 0;
  opacity: 0;
  animation: w3 2s infinite;
  animation-delay: 0s;
}

@keyframes w3 {
  0% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #8f6d28;
  }

  30% {
    transform: translateY(0px);
    opacity: 1;
    fill: #8f6d28;
  }

  70% {
    transform: translateY(0px);
    opacity: 1;
    fill: #8f6d28;
  }

  100% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #8f6d28;
  }
}

.f4 {
  fill: #c93;
  stroke: #000000;
  stroke-opacity: 0;
  opacity: 0;
  animation: w4 2s infinite;
  animation-delay: 0s;
}

@keyframes w4 {
  0% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #c93;
  }

  5% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #c93;
  }

  35% {
    transform: translateY(0px);
    opacity: 1;
    fill: #c93;
  }

  65% {
    transform: translateY(0px);
    opacity: 1;
    fill: #c93;
  }

  95% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #c93;
  }

  100% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #c93;
  }
}

.f5 {
  fill: #c93;
  stroke: #000000;
  stroke-opacity: 0;
  opacity: 1;
  animation: w5 2s infinite;
  animation-delay: 0s;
}

@keyframes w5 {
  0% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #c93;
  }

  10% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #c93;
  }

  45% {
    transform: translateY(0px);
    opacity: 1;
    fill: #c93;
  }

  55% {
    transform: translateY(0px);
    opacity: 1;
    fill: #c93;
  }

  90% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #c93;
  }

  100% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #c93;
  }
}

.f6 {
  fill: #c93;
  stroke: #000000;
  stroke-opacity: 0;
  opacity: 1;
  animation: w6 2s infinite;
  animation-delay: 0s;
}

@keyframes w6 {
  0% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #c93;
  }

  30% {
    transform: translateY(0px);
    opacity: 1;
    fill: #c93;
  }

  70% {
    transform: translateY(0px);
    opacity: 1;
    fill: #c93;
  }

  100% {
    transform: translateY(-40px);
    opacity: 0;
    fill: #c93;
  }
}
// loading class
.loading {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #eee;
  z-index: 100;
  top: 0;
  right: 0;
  svg{
    width: 200px;
    height: 200px;
  }
}
// toast errors
.toast-errors{
  background-color: #fff;
  margin-bottom: 15px;
  color: #222;
  padding: 10px;
  box-shadow: 0px 0px 20px 1px rgba(255, 255,255, 0.5);
  border-radius: 5px;
  border-right: 4px solid #c69e4b;
}
// blink animation
@keyframes blink {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
