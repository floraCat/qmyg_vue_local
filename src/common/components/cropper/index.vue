<template>
	<div class="cropper">
    <img v-lazy="newImgUrl" :alt="cropAlt">
    <input type="file"
      name="image"
      accept="image/gif, image/jpg, image/jpeg, image/png"
      ref="file"
      v-on:change="setImage"/>

    <div v-show="fileSelected" class="cropper-dialog">
      <div class="cropper-body">
        <vue-cropper
          ref='cropper'
          :responsive="true"
          :view-mode="2"
          :checkCross = "true"
          :rotatable="true"
          :aspectRatio= "1 / 1"
          :min-container-width="100"
          :min-container-height="100"
          :min-crop-box-width = "100"
          :min-crop-box-height="100"

          drag-mode="crop"
          :auto-crop-area="0.5"
          :background="true"
          :src="imgSrc"
          :img-style="{ width: '400px', 'height': '450px' }"

          >
        </vue-cropper>
      </div>

      <div class="cropper-toolsbar">
        <a class="cancel" @click="cancel">取消</a>
        <a class="upload" @click="upload">上传</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>