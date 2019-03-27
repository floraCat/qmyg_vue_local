<template>
  <div class="recruit-page">
    <app-title title="深圳全民易购火热招商"></app-title>

    <div class="recruit-main">
      <div class="head">
        <h3>全民易购海外旗舰店，100%正品</h3>
      </div>

      <div class="nav">
        <div class="video">
          <h3>深圳全民易购宣传视频大创客篇</h3>
        </div>
      </div>

      <div class="item-block">
        <div class="head">
          <span>立即成为店主，享受超值服务</span>
        </div>

        <div class="body">
          <p class="text">只要198元</p>
          <p class="text">轻松开启创富生活</p>

          <div class="view">
            <a href="#">立即开启</a>
          </div>
        </div>
      </div>

      <div class="item-block">
        <div class="head">
          <span>大创客店铺权益</span>
        </div>

        <div class="body">
          <ul class="list">
            <li class="item item-01">
              <div class="title">一、仅需投入198：</div>
              <div class="content">
                <p>获得商城永久性超级店铺,一键代理全网百万级SKU正品行货,不压货，不操心,买卖都赚商品毛利70%,按家庭一年光消费就省几千元</p>
              </div>
            </li>

            <li class="item item-02">
              <div class="title">二、共享收益保障：</div>
              <div class="content">
                <p>注册即获得平台每天固定2元的新人微共享收益，持续共享30天，等于60元每月收益，真正的躺赚共享模式</p>
              </div>
            </li>

            <li class="item item-03">
              <div class="title">三、团队推荐奖励：</div>
              <div class="content">
                <p>只需直接推荐1人，即可获得30元奖励，30天收回198成本，并可持续发展；直推平台每天奖励2元，等于每月60元固定共享收益，间推平台每天奖励1元，等于每月30元固定共享收益；推荐团队越大，赚钱速度越快</p>
              </div>
            </li>

            <li class="item item-04">
              <div class="title">四、共享助力机制：</div>
              <div class="content">
                <p>只要每个月固定续费，就可以享受团队几何倍增的收益。倡导人人共建，收益整体共享</p>
              </div>
            </li>

            <li class="item item-05">
              <div class="title">五、团队消费收益：</div>
              <div class="content">
                <p>只花68元升级，就可获得平台两级团队消费毛利的5%；30%团队收益的平台特定消费机制，源源不断，数额惊人</p>
              </div>
            </li>

          </ul>

          <p class="agreement">
            更多详情阅读
            <span>《全民易购大创客用户协议》</span>
          </p>
        </div>
      </div>

      <div class="recruit-boxs">
        <div class="item-box item-box-01" ref="item-box-01">
          <div class="info">成大创客，轻松开店</div>
          <div class="info">精准分销，没有库存</div>
          <div class="info">一键转发，快速推广</div>
          <div class="info">自动结算，坐等收钱</div>
        </div>

        <div class="item-box item-box-02">
          <ul class="book-list">
            <li class="item item-01">
              <div class="info">
                <div class="pic">
                  <img src="~assets/images/recruit/themeGoods1.jpg">
                </div>
                <p>利润<span>￥68</span></p>
              </div>
            </li>

            <li class="item item-02">
              <div class="info">
                <div class="pic">
                  <img src="~assets/images/recruit/themeGoods2.jpg">
                </div>
                <p>利润<span>￥68</span></p>
              </div>
            </li>

            <li class="item item-03">
              <div class="info">
                <div class="pic">
                  <img src="~assets/images/recruit/themeGoods3.jpg">
                </div>
                <p>利润<span>￥68</span></p>
              </div>
            </li>
          </ul>

          <div class="bot">
            <p>直接享有厂家总代利润</p>
            <button>上架到我的小店</button>
          </div>
        </div>

        <div class="item-box item-box-03">
          <div class="info">累计收入<span>￥ {{ income }}</span></div>
          <div class="info">未结算易购豆<span>￥ {{ yigoud }}</span></div>
          <div class="info">可提现金额<span class="orange">￥ {{ extract }}</span></div>

          <div class="bot">
            <button>立即提现</button>
          </div>
        </div>

        <div class="item-box item-box-04">
          <div class="info info-01">
            <span>卖家付款</span>
            <img src="~assets/images/recruit/pic1.jpg" alt="卖家付款">
          </div>
          <div class="info info-02">
            <img src="~assets/images/recruit/pic2.jpg" alt="小店收到订单">
            <span>小店收到订单</span>
          </div>

          <div class="info info-03">
            <img src="~assets/images/recruit/pic3.jpg" alt="供货商发货">
            <span>供货商发货</span>
          </div>

          <div class="arrow arrow-01"></div>
          <div class="arrow arrow-02"></div>
          <div class="arrow arrow-03"></div>
        </div>

      </div>

      <div class="copyright">
        <p>2017深圳全民易购 版权所有</p>
        <p>ICP许可证号 粤ICP备16096235号</p>

        <div class="item-body">
          <div class="text">支付198，开店做老板</div>
          <a href="#">立即支付</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>