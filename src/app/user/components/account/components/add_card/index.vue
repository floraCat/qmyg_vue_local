<template>
  <div id="user_add_card">
    <app-title :title="addTitle"></app-title>
    <form v-if="1 === addType" class="form" ref="form" @submit.prevent="submit">
      <ul class="add_card_con">
        <li>
          <label for="">持卡人</label>
          <input vd-required
            v-model.trim="cardData.name"
            type="text"
            vd-notify='{
              "text": "持卡人姓名不能为空"
            }'
            placeholder="持卡人姓名">
        </li>
        <li>
          <label for="">卡号</label>
          <input vd-required
            vd-validate
            v-model.trim="cardData.bank_card"
            vd-type="bank"
            type="text"
            vd-notify='{
              "text": "银行卡号不能为空",
              "patt": "银行卡号格式不正确"
            }'
            placeholder="银行卡号">
        </li>
        <li>
          <label for="">银行</label>
          <input vd-required
            v-model.trim="cardData.bankname"
            type="text"
            vd-notify='{
              "text": "银行不能为空"
            }'
            placeholder="如：工商银行">
        </li>
        <li>
          <label for="">选择地区：</label>
          <div class="city-name" v-on:click="handleOpenCity">
            {{ address }}
            <i class="icon icon-enter"></i>
          </div>
        </li>
      </ul>
      <button type="submit">提交</button>
    </form>
    <form v-if="2 === addType" class="form" ref="form1" @submit.prevent="submit">
      <ul class="add_card_con">
        <li>
          <label for="">姓名</label>
          <input vd-required
            v-model.trim="aliData.name"
            type="text"
            vd-notify='{
              "text": "支付宝姓名不能为空"
            }'
            placeholder="支付宝姓名">
        </li>
        <li>
          <label for="">支付宝账号</label>
          <input vd-required
            v-model.trim="aliData.bank_card"
            type="text"
            vd-notify='{
              "text": "支付宝账号不能为空"
            }'
            placeholder="支付宝账号">
        </li>
      </ul>
      <button type="submit">提交</button>
    </form>
    <app-address-select></app-address-select>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>