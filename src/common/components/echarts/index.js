import './index.scss';

import echarts from 'echarts';

export default {
  name: 'echarts',
  data () {
    return {
      datas:{},
      curDays: 7,
      curDaysOn: 0,
      firstDate: 'loading...',
      lastDate: 'loading...'
    };
  },
  computed: {
    // api () {
    //   //return `${this.API_DOMAIN}/visitor7.json`;
    // }
  },
  props: ['type', 'api', 'nameL', 'nameR'],
  mounted () {
    this.$nextTick(function () {
      this.drawPie('main', 7);
    });
  },
  methods: {
    switchDays (index, days) {
      this.curDaysOn = index;
      this.curDays = days;
      this.drawPie('main', days);
    },
    drawPie (id, days) {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api,
        params: {
          store_id: self.$user.get().data.store_info.id,
          days: days
        }
      }).then((res) => {
        // console.log(res);
        //if ('success' === res.state) {
          self.datas = self.assignType(res.data);
          // console.log(self.datas);
          let dates = self.datas.date;
          self.firstDate = dates[0];
          self.lastDate = dates[dates.length - 1];
          this.charts = echarts.init(document.getElementById(id));
           this.charts.setOption({
             xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                  lineStyle: {
                      color: '#eff2f3',
                      width: 0
                  }
              },
              data: dates
            },
            grid: {
                top: 40,
                height: 100,
                backgroundColor: '#eff2f3'
            },
            yAxis: [{
                name: '数量',
                type: 'value',
                nameTextStyle: {
                    color: '#eff2f3',
                    fontWeight: 800,
                    fontSize: 15
                },
                splitLine: {
                    lineStyle: {
                        color: ['#fff'],
                        width: 1
                    }
                },
                splitNumber :3,
                axisLine: {
                    lineStyle: {
                        color: '#eff2f3',
                        width: 0
                    }
                },
                axisTick: {
                    show: false
                }
            }],
            series: [{
              name: self.nameL,
              type: 'line',
              itemStyle: {
                  normal: {
                      color: '#54b4f1',
                  }
              },
              data: self.datas.dataX
            }, {
                name: self.nameR,
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#ec5151',
                    }
                },
                data: self.datas.dataY
            }]
          });
        //}
      });
    },
    assignType (rs) {
      let obj = {};
      obj.date = rs.date;
      if ('visit' === this.type) {
        obj.dataX = rs.uv;
        obj.dataY = rs.pv;
        obj.totalL = rs.total_uv;
        obj.totalR = rs.total_pv;
      }
      if ('order' === this.type) {
        obj.dataX = rs.payed_number;
        obj.dataY = rs.send_number;
        obj.totalL = rs.total_payed;
        obj.totalR = rs.total_send;
      }
      if ('sale' === this.type) {
        obj.dataX = rs.brokerage;
        obj.dataY = rs.sales_volume;
        obj.totalL = rs.total_brokerage;
        obj.totalR = rs.total_sales_volume;
      }
      return obj;
    }
  }
};