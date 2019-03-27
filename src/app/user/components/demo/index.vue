<template>
  <div class="demo">
    <form class="form" ref="form" @submit.prevent="submit">
      <input
        vd-validate
        vd-notify="邮箱填写不正确"
        vd-type="email"
        value="12@qq.com"
        type="text">

      <input
        vd-validate
        vd-notify="phone填写不正确"
        vd-type="phone"
        value="13800138000"
        type="text">

      <button>测试</button>
    </form>


    <button @click="handleDialog">Dialog</button>



    <cropper>

    </cropper>


  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>