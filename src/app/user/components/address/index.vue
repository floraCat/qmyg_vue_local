<template>
  <div class="address-wrapper">
    <app-title title="收货地址"></app-title>
    <div class="content">

      <div v-for="(item, index) in addressList" class="address">
        <div class="set-box">
          <div class="check" v-on:click="handelDefault(item.address_id)" :class="{ on: item.is_default }">
            <i class="icon-select_yes"></i>
            <span>默认地址</span>
          </div>
          <div class="operation">
            <router-link :to="{ name: 'user.EditAddress', params: { id: item.address_id } }">
              <i class="icon-edit"></i>
              <span>编辑</span>
            </router-link>
            <a href="javascript:" v-on:click="handelDelete(item.address_id)">
              <i class="icon-delect"></i>
              <span>删除</span>
            </a>
          </div>
        </div>
        <div class="address-box">
          <div class="user-info">
            <span>{{ item.consignee }}</span>
            <span>{{ item.mobile }}</span>
          </div>
          <div class="detail">
            <span>{{ item.address }}</span>
          </div>
        </div>
      </div>

    </div>
    <div class="add">
      <router-link :to="{ name: 'user.AddAddress' }">添加收货人信息</router-link>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>