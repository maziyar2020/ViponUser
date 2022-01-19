<template>
  <div class="survey__title">
    <p class="survey__title-text">
      <span class="survey__title-name">{{ pageDetail.name }}</span> عزیز
    </p>
    <p class="survey__title-text">زمان این نظر سنجی به اتمام رسید</p>
  </div>
</template>

<script>
export default {
  name: "survey-expire",
  props: ["pageDetail"],
};
</script>

<style scoped>
.survey__title {
  margin: 20px auto;
  width: 96%;
  text-align: center;
  background-color: #181818;
  border-radius: 20px;
  padding: 20px 15px;
}
.survey__title-text{
  color: #fff;
}
.survey__title-name {
  color: #c69d4e;
}
</style>