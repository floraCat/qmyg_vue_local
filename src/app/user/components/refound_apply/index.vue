<template>
  <div class="applyRefound">
    <app-title title="申请退换货"></app-title>
    <section class="good">
      <div class="img">
        <img src="http://img13.360buyimg.com/n1/jfs/t3199/365/2537996780/377471/c0d8a6e1/57e33defNc6461770.jpg" />
      </div>
      <ol>
        <a class="ttl">富安娜家纺 床上用品纯棉斜纹四件套全棉床单1.8m套件 克拉恋人 1.8米床适用 （230*229cm）绿色</a>
        <p class="price">
          <em>￥<span>66.00</span></em>
          <i>x<span>1</span></i>
        </p>
        <p class="attrTxt">颜色:克拉恋人绿[¥0.00]尺码:1.8米（6英尺）床[¥0.00] </p>
      </ol>
    </section>
    <section class="apply">
      <h3>申请服务<i>*</i></h3>
      <ol>
        <li :class="{active:1===curApply}" @click="curApply=1">换货<i class="icon-selected"></i></li>
        <li :class="{active:2===curApply}" @click="curApply=2">退货<i class="icon-selected"></i></li>
      </ol>
    </section>
    <div id="tab_exchange" v-show="1===curApply">
      <section class="attrs">
        <h3>换货属性<i>*</i></h3>
        <ol>
          <div class="attr" v-for="(item,index0) in itemsAttr" v-bind:key="index0">
            <label>{{item.name}}：</label>
            <ul>
              <li v-for="(attr,index) in item.list" v-bind:key="index" :class="{active:curAttr[index0]===index}" @click="switchAttr(index0, index)">{{attr}}<i class="icon-selected"></i></li>
            </ul>
          </div>
        </ol>
      </section>
      <section class="reason">
        <h3>换货原因<i>*</i></h3>
        <app-select-control :items="optsExchange" defaultVal="其他"></app-select-control>
      </section>
      <section class="explain">
        <h3>换货说明<i>*</i></h3>
        <textarea placeholder="请填写换货描述"></textarea>
      </section>
    </div>
    <div class="tab_return" v-show="2===curApply">
      <section class="reason">
        <h3>退货原因<i>*</i></h3>
        <app-select-control :items="optsReturn" defaultVal="其他"></app-select-control>
      </section>
      <section class="explain">
        <h3>退款说明<i>*</i></h3>
        <textarea placeholder="请填写退款描述"></textarea>
      </section>
    </div>
    <section class="hasReport">
      <label>有质检报告</label>
      <span class="check" @click="hasReport = !hasReport" :class="{active:hasReport}">
        <i class="icon-right"></i>
      </span>
    </section>
    <section class="upload">
      <h3>图片信息</h3>
      <div class="ctrl">
        <div class="bg">
          <i>+</i>
          <p>上传凭证</p>
        </div>
        <div class="file">
          <cropper cropImg="" cropAlt="" cropType="shop"></cropper>
        </div>
      </div>
    </section>
    <section class="info">
      <h3>个人信息<i>*</i></h3>
      <ol class="form">
        <li>
          <input type="text" value="111" />
        </li>
        <li>
          <input type="text" value="222" />
        </li>
        <li>
          <input type="text" placeholder="请输入邮箱" />
        </li>
        <li class="addr" @click="addrSel">
          <label>所在地区：</label>
          <p v-text="address">
            <!-- <span>广东</span>
            <span>广州市</span>
            <span>白云区</span> -->
          </p>
          <i class="icon-enter"></i>
        </li>
        <li class="txt">
          <label>详细地址：</label>
          <textarea>test</textarea>
        </li>
        <li class="txt msg">
          <label>留言：</label>
          <textarea placeholder="请填写留言"></textarea>
        </li>
      </ol>
    </section>
    <section class="service">
      <h3>服务说明</h3>
      <div class="content">
        <p>1.附件赠品，退换货时请一并退回。</p>
        <p>2.关于物流损，请您在收到货时务必仔细检查，如发现商品外包装或商品本身外观存在异常，需当场向派送人员指出，并拒收整个包裹；如您在收到货后发现外观异常，请在收货24小时内提交退换货申请，如超时未申请，将无法受理。</p>
        <p>3.关于商品实物与网站描述不符；全民易购保证所出商品均与时下市场上同样直流商品一致，但因厂家会在没有任何提前通知的情况下更改产品包装，产地或者一些附件，所以我们无法确保您收到的货物与商城图片、产地、附件说明完全一致。</p>
        <p>4、如果您在使用时对商品质量表示置疑，您可出具相关书面鉴定，我们会按照国家法律规定予以处理。</p>
      </div>
    </section>
    <div class="submit">
      <a href="javascript:;" @click="submit">提交申请</a>
    </div>
    <!--弹窗[地址选择]-->
    <app-address-select></app-address-select>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>