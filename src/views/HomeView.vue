<script setup>
import Chat from '../components/Chat.vue'
</script>

<template>
  <main>
    <Chat id="chatWindow"/>
  </main>
</template>

<script>
</script>

<style>

main {
    height: 100%;
   
}

chatWindow{
  overflow: scroll;
}

</style>
