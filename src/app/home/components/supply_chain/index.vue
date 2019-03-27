<template>
  <div class="supply_chain">
		<app-title title="深圳全民易购-超级供应链"></app-title>
    <div class="first_part">
      <div class="first_top" onclick="window.location.href='http://www.eggou.com/mobile/index.php?r=share/index/mv2'">
        <img src="~assets/images/supply_chain/supply_infoBg1.jpg" alt="#">
        <p>
          <a href="http://www.eggou.com/mobile/index.php?r=share/index/mv2">
            深圳全民易购宣传视频供应链篇<img src="~assets/images/icon/icon_movie.png" alt="#">
          </a>
        </p>
        <div class="logo">
          <img src="~assets/images/svg/eggouWhite.svg">
        </div>
        <div class="words">
          <p>
            <span>寻</span><span>找</span><span>中</span><span>国</span><span>好</span><span>产</span><span>品</span>
          </p>
          <p>免费入驻大平台</p>
        </div>
      </div>
      <div class="first_mid">
        <div>
          <p>自由合伙人供货专享</p>
          <p>您发现和推荐身边的好产品、好工厂</p>
          <p>只需联系平台招商经理，就可以轻松供货平台</p>
          <p>坐享平台百万创客团队带来的销售回报！</p>
        </div>
        <ul>
          <li :class="{on:gifFirst, active:gifFirsts}">
            <div>发现好产品</div>
            <div>优质、特色、有市场潜力</div>
          </li>
          <li :class="{on:gifFirst, active:gifFirsts}">
            <div>找到合适供应商</div>
            <div>找到供应商、代理商或厂家</div>
          </li>
          <li :class="{on:gifFirst, active:gifFirsts}">
            <div>联系平台招商经理</div>
            <div>提交相关产品资料即可</div>
          </li>
          <li :class="{on:gifFirst, active:gifFirsts}">
            <div>评估审核</div>
            <div>绿色通道，快速审核评估</div>
          </li>
          <li :class="{on:gifFirst, active:gifFirsts}">
            <div>商品入驻上架</div>
            <div>免费上架，平台一站搞掂</div>
          </li>
        </ul>
      </div>
      <div class="first_bot">
        <img src="~assets/images/supply_chain/supply_infoBg2.jpg">
        <div class="zrInfoWrapWords2">
          <p>好眼光，好产品</p>
          <p>货卖全国轻松创富！</p>
        </div>
      </div>
    </div>
    <div class="second_part">
      <div class="second_top">
        <img src="~assets/images/supply_chain/supply_infoBg1.jpg" alt="#">
        <div class="logo">
          <img src="~assets/images/svg/eggouWhite.svg">
        </div>
        <div class="words">
          <p>一张图看懂</p>
          <p>供应链打造和供应链输出</p>
        </div>
      </div>
      <div class="second_mid">
        <div class="mid_first mid_div">
          <p>大量闲置资源</p>
          <p>白白浪费</p>
          <p>无法变现</p>
        </div>
        <div class="mid_second mid_div">
          <div :class="{on:gifSec[0]}">
            <img src="~assets/images/supply_chain/supply_tips1.png" alt="">
          </div>
          <div :class="{on:gifSec[1]}">
            <img src="~assets/images/supply_chain/supply_tips2.png" alt="">
          </div>
          <div :class="{on:gifSec[2]}">
            <img src="~assets/images/supply_chain/supply_tips3.png" alt="">
          </div>
          <div :class="{on:gifSec[3]}">
            <img src="~assets/images/supply_chain/supply_tips4.png" alt="">
          </div>
          <div :class="{on:gifSec[4]}">
            <img src="~assets/images/supply_chain/supply_tips5.png" alt="">
          </div>
          <div :class="{on:gifSec[5]}">
            <img src="~assets/images/supply_chain/supply_tips6.png" alt="">
          </div>
          <div :class="{on:gifSec[6]}">
            <img src="~assets/images/supply_chain/supply_tips7.png" alt="">
          </div>
        </div>
        <div class="mid_third">
          <div></div>
          <div>
            <div>
              <div class="mid_div" :class="{on:gifSec[7]}">
                <p>海量平台</p>
                <p>商家</p>
              </div>
              <div class="mid_div" :class="{on:gifSec[8]}">
                <img src="~assets/images/supply_chain/supply_bg3.png">
              </div>
              <div class="mid_div" :class="{on:gifSec[9]}">
                <p class="special">通讯平台</p>
              </div>
              <div class="mid_div" :class="{on:gifSec[10]}">
                <p class="special">网络平台</p>
              </div>
              <div class="mid_div" :class="{on:gifSec[11]}">
                <img src="~assets/images/supply_chain/supply_bg7.png">
              </div>
            </div>
          </div>
        </div>
        <div class="mid_forth">
          <div class="line_box" :class="{on:gifThird[0]}">
            <div class="clearfix">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
          <div class="line_box" :class="{on:gifThird[1]}">
            <div class="clearfix">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
          <div class="line_box" :class="{on:gifThird[2]}">
            <div class="clearfix">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
          <div class="words_box">
            全网输送
          </div>
          <div class="big_box">
            <div></div>
            <div class="mid_div">
              <div>
                <div class="mid_div_first">
                  <img src="~assets/images/supply_chain/supply_hand.png">
                </div>
                <div class="mid_div_second">
                  <p>成千上万厂家商品</p>
                  <p>入驻深圳全民易购</p>
                </div>
                <div class="mid_div_third">
                  打造
                </div>
                <div class="mid_div_forth">
                  <p>流量导入，资源共享</p>
                  <p>品牌孵化，商家对接</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mid_fifth">
          <div class="line_box" :class="{on:gifForth[0]}">
            <div class="clearfix">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
          <div class="line_box" :class="{on:gifForth[1]}">
            <div class="clearfix">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
          <div class="line_box" :class="{on:gifForth[2]}">
            <div class="clearfix">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
          <div class="fifth_first">
            <div></div>
            <div class="mid_div">
              <div>
                <div class="mid_div_first">
                  <img src="~assets/images/supply_chain/supply_bg11.png">
                </div>
                <div class="mid_div_second">
                  <p>平台具有</p>
                  <p>百万级大创客</p>
                  <p>全网帮销</p>
                </div>
              </div>
            </div>
            <div class="words_box">
              <p>资源变现，人脉变现</p>
              <p>流量变现</p>
            </div>
          </div>
        </div>
      </div>
      <div class="second_bot">
        <img src="~assets/images/supply_chain/supply_infoBg2.jpg">
        <div class="logo">
          <img src="~assets/images/svg/eggouWhite.svg">
        </div>
        <div class="words">
          <p>打造超级供应链</p>
          <p>货卖全国<span></span>轻松创富</p>
        </div>
      </div>
    </div>
    <div class="third_part">
      <p>2017深圳全民易购 版权所有</p>
      <p>ICP许可证号 粤ICP备16096235号</p>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>