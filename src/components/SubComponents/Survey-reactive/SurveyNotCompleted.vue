<template>
  <div class="survey__title">
    <p>
      <span class="survey__title-name">{{ pageDetail.name }}</span> عزیز
    </p>
    <p>لطفا در نظر سنجی شرکت کنید</p>
  </div>
</template>

<script>
export default {
  name: "survey-not-completed",
  props: ["pageDetail"],
};
</script>

<style scoped>
.survey__title {
  margin: 20px 0;
  width: 100%;
  text-align: center;
}
.survey__title-name {
  color: #c69d4e;
}
</style>