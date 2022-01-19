<template>
  <div class="tnq-for-vote">
    <p class="tnq-for-vote--gold">متشکریم</p>
    <p class="tnq-for-vote--white">از اینکه در این نظرسنجی شرکت کردید.</p>
  </div>
</template>

<script>
export default {
  name : 'SurveyCompleted',
};
</script>

<style scoped>
.tnq-for-vote {
  margin: 20px 0;
  background-color: #181818;
  padding: 100px 10px;
  border-radius: 15px;
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.tnq-for-vote--gold{
  color: #c69d4e;
}
.tnq-for-vote--white{
  color: #fff;
  margin-bottom: 5px;
}
</style>