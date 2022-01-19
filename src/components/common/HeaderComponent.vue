<template>
  <header class="buy__header">
    <img src="../../assets/svg/top-header.svg" alt="" class="buy__header-svg" />
    <img :src="pageData.store_image" alt="" class="buy__header-img" />
    <div class="buy__header-text">
      <p>{{ pageData.store_name ? pageData.store_name : 'نام' }}</p>
      <p>{{ pageData.store_name_en ? pageData.store_name_en : 'اسم تست' }}</p>
    </div>
  </header>
</template>

<script>
export default {
  name: "header-component",
  props: ["pageData"],
};
</script>

<style scoped lang="scss">
.buy__header {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  padding-top: 200px;
  text-align: center;
}
.buy__header-svg {
  position: absolute;
  top: -180px;
  height: 600px;
}
.buy__header-img {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  top: 70px;
  background: #ddd url('../../assets/svg/user.svg');
}
.buy__header-text {
  position: relative;
  z-index: 5;
  color: #fff;
}
</style>