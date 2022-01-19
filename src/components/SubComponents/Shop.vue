<template>
  <div class="shops__items">
    <img :src="img" alt="" class="shop__item-image" @error="imageFailed" />
    <img
      src="../../assets/svg/preload.svg"
      alt=""
      class="shop__item-image shop__item-image--hidden"
      @error="imageFailed"
    />
    <div class="shop__item-text">
      <p class="shop__item-title">{{ store }}</p>
      <p class="shop__item-desc">{{ store_en }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainPageShopWrapper",
  props: ["img", "store", "store_en", "id"],
  methods: {
    imageFailed(event) {
      event.target.classList.add("shop__item-image--hidden");
      event.target.nextElementSibling.classList.remove("shop__item-image--hidden");
    },
  },
};
</script>

<style scoped lang="scss">
.shops__items {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  background-color: #fff;
  margin-bottom: 12px;
  border-radius: 15px;
  padding: 20px 20px 15px;
  cursor : pointer;
}
.shop__item-image {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
}
.shop__item-text {
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-right: 30px;
}
.shop__item-image--hidden{
  display: none;
  visibility: none;
}
</style>