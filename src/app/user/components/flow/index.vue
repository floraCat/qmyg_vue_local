<template>
  <div class="flow">
    <app-title title="确认订单"></app-title>
    <div class="flow-warp">
      <div class="address">
        <a href="javascript:;" @click="bflag.iaddr = true">
          <div class="infos">
            <span v-text="onAddress.consignee"></span><span v-text="onAddress.mobile"></span>
            <em v-show="onAddress.is_default">默认地址</em>
          </div>
          <div class="position" v-text="onAddress.full_address">
          </div>
          <i class="icon-enter"></i>
        </a>
      </div>
      <transition name="orderAddr">
      <app-delivery-address :items="orderData.user_address_list" v-show="bflag.iaddr" :finish="addrSelect"></app-delivery-address>
      </transition>
      <div class="flow-order">
        <div class="order-lists" v-for="(shop,index) in orderLists">
          <div class="o-title">
            <div class="o-icon">
              <i class="icon-shop"></i>
            </div>
            <div class="o-name">
              <span>订单{{ shop.ru_name }}</span>
            </div>
          </div>
          <ul class="o-list">
            <li class="o-item" v-for="(order,i) in shop.goods_list">
              <div class="o-img">
                <a href="javascript:">
                  <img v-lazy="order.goods_thumb" alt="">
                </a>
              </div>
              <div class="o-info">
                <a href="javascript:">{{ order.goods_name }}</a>
                <div class="price">
                  <span class="pri-cl">¥<em>{{ order.goods_price }}</em></span>
                  <span class="pri-num">x<em>{{ order.goods_number }}</em></span>
                </div>
                <div class="egd">
                  <i @click="openBean">易购豆</i>
                  <span>本次获易购豆：<em>{{ order.ygcoin }}</em></span>
                </div>
                <div class="spec" v-text="order.goods_attr"></div>
              </div>
            </li>
          </ul>
          <div class="o-distr">
            <div class="wrapper line">
              <span>配送方式</span>
              <div class="express">
                <span>快递</span>
                <em>包邮</em>
              </div>
            </div>
          </div>
          <div class="o-distr">
            <div class="wrapper" :class="{'line':!bflag.imsg}" @click="openMsg">
              <span>买家留言（50字）</span>
            </div>
            <div class="textarea line" v-show="bflag.imsg">
              <textarea placeholder="请填写买家留言" v-model="msgs[index]" @keyup="checkTxtNum(index)"></textarea>
              <p>剩余<span v-text="50-msgs[index].length"></span>字</p>
            </div>
          </div>
          <div class="o-distr">
            <div class="wrapper">
              <div class="express">
                <span>共<span>{{ shop.goods_list.length }}</span>款<span>{{ shop.goods_list | totalNum }}</span>件商品，合计：</span><em>¥{{ shop.goods_list | totalMoney }}</em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flow-info">
        <div class="invoice" @click="openInvo">
          <div class="wrapper pointer">
            <span>发票信息</span>
            <div class="box-flex">
              <span>{{ invoice.name ? invoice.name : '发票内容' }}</span>
              <i class="icon-enter"></i>
            </div>
          </div>
        </div>
        <div class="invoice">
          <div class="wrapper">
            <span>本单可使用易购豆抵扣<em>¥{{orderData.useable_ygcoin}}</em></span>
            <div class="box-flex">
              <input class="check" type="checkbox" @change="changePrice" :checked="ddtFlag">
            </div>
          </div>
          <div class="identValidate" v-show="bflag.flagIdent">
            <span>收货人身份验证</span>
            <ol>
              <p>
                <input class="input" type="number" v-model="IDnumber" placeholder="输入身份证号" />
                <a class="btn" href="javascript:;" @click="idSubmit">马上验证</a>
              </p>
              <!-- <em>请填写有效姓名，如有需要，请与客服联系</em> -->
            </ol>
          </div>
        </div>
        <div class="invoice">
          <div class="wrapper line">
            <span>商品总价</span>
            <div class="box-flex">
              <span class="price">¥{{ orderData.fee.goods_amount }}</span>
            </div>
          </div>
          <div class="wrapper" v-show="shipFlag">
            <span>快递费用</span>
            <div class="box-flex">
              <span class="inte">+¥{{ shipPrice }}</span>
            </div>
          </div>
          <div class="wrapper" v-show="ddtFlag">
            <span>使用易购豆</span>
            <div class="box-flex">
              <span class="inte">-¥{{ ddtPrice }}</span>
            </div>
          </div>
        </div>
        <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
          <app-invoice :bflag="bflag" v-show="bflag.iflag" @confirm="invodata"></app-invoice>
        </transition>
      </div>
      <div class="o-bottom">
        <div class="wrapper">
          <div class="o-price">
            <div class="total-price">实付款：<span>¥<em>{{ payPrice }}</em></span></div>
            <div class="total-ig">
              <span>快递费：<em>包邮</em></span>
              <span>获易购豆：<em class="o-red">0.00</em></span>
            </div>
          </div>
          <div class="o-submit">
            <a href="javascript:" @click="orderSubmit">提交订单</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 易购豆 -->
    <div class="modalBean dummy" v-show="bflag.isDummy" @touchmove.prevent>
      <div class="handle-context"></div>
      <div class="body">
        <div class="section">
          <div class="text">
            <div class="main">
              <i class="close icon-close" v-on:click="bflag.isDummy = false"></i>
              <img src="~assets/images/TCBG.png" alt="">
              <ol>
                <p>1. 易购豆为深圳全民易购平台内部结算虚拟货币。</p>
                <p>2. 易购豆可在本商城等值抵扣消费，大创客更可以等值提现。</p>
              </ol>
              <div class="power">解释权归深圳全民易购贸易有限公司所有</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>