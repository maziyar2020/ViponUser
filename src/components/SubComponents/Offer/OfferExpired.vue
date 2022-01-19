<template>
    <div class="offer-used">
      <p class="happy">متاسفانه</p>
      <p class="detail">زمان استفاده از این آفر به پایان رسید</p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.offer-used{
    margin: 20px 0;
    background-color: #181818;
    padding: 100px 10px;
    border-radius: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.happy{
    color: #c69d4e;
    font-size: 22px;
}
.detail{
    color: #eee;
}
</style>