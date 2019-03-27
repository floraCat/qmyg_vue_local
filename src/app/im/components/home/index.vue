<template>
  <div class="im-page" ref="im">
    <div class="header">
      <a href="javascript:history.go(-1);"></a>
      <h2>李华西</h2>
      <i class="icon icon-user_fill"></i>
    </div>

    <div class="content" ref="content">
      <app-swiper>
        <ul class="list" ref="list">
          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item me">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item me">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message voice">
              <div class="body" v-bind:style="{ width: 20 > (8 / 60) * 100 ? 20 + '%' : (8 / 60) * 100 + '%' }">
                <i class="icon icon-voice_2"></i>
                <span></span>
                <em>8″</em>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message voice">
              <div class="body" v-bind:style="{ width: 20 > (18 / 60) * 100 ? 20 + '%' : (18 / 60) * 100 + '%' }">
                <i class="icon icon-voice_2"></i>
                <span></span>
                <em>18″</em>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message voice">
              <div class="body" v-bind:style="{ width: 20 > (18 / 60) * 100 ? 20 + '%' : (18 / 60) * 100 + '%' }">
                <i class="icon icon-voice_2"></i>
                <span></span>
                <em>18″</em>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item me">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item me">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message voice">
              <div class="body" v-bind:style="{ width: 20 > (8 / 60) * 100 ? 20 + '%' : (8 / 60) * 100 + '%' }">
                <i class="icon icon-voice_2"></i>
                <span></span>
                <em>8″</em>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message">
              <div class="body">
                <span>这里是聊天内容</span>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message voice">
              <div class="body" v-bind:style="{ width: 20 > (18 / 60) * 100 ? 20 + '%' : (18 / 60) * 100 + '%' }">
                <i class="icon icon-voice_2"></i>
                <span></span>
                <em>18″</em>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="avatar">
              <img src="#" alt="#">
            </div>
            <div class="message voice">
              <div class="body" v-bind:style="{ width: 20 > (18 / 60) * 100 ? 20 + '%' : (18 / 60) * 100 + '%' }">
                <i class="icon icon-voice_2"></i>
                <span></span>
                <em>18″</em>
              </div>
            </div>
          </li>

        </ul>

      </app-swiper>
    </div>

    <div class="footer">
      <div class="input-group">
        <div class="input-item input-left">
          <i class="icon" :class="{ 'icon-voice': switchText, 'icon-keyboard': !switchText }" v-on:click="handelSwitch()"></i>
        </div>
        <div class="input-item input-main">
          <div v-show="!switchText" class="text">按住 说话</div>
          <div v-show="switchText" class="text" :class="{ on: switchText }">
            <textarea v-model="content" name="content" cols="4" :rows="rows"></textarea>
          </div>
        </div>
        <div class="input-item input-right">
          <i class="icon icon-brow"></i>
          <i class="icon icon-append"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>