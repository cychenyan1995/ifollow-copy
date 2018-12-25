<template>
  <section>
    <!--  <el-progress type="circle" :percentage="25" color="#8e71c7"></el-progress> -->
    <!-- #5ca3ff -->
    <el-row class="section-row header">
      <el-col :span="8" style="">
        <div>
          <span class="el-icon-edit section-btn"></span>
          <span>新消息</span>
        </div>
        <div class="section-desc">255</div>
      </el-col>
      <el-col :span="8" style="">
        <div>
          <span class="el-icon-edit section-btn"></span>
          <span>新消息</span>
        </div>
        <div class="section-desc">255</div>
      </el-col>
      <el-col :span="8" style="">
        <div>
          <span class="el-icon-edit section-btn"></span>
          <span>新消息</span>
        </div>
        <div class="section-desc">255</div>
      </el-col>
    </el-row>
    <el-row class="section-row">
      <el-col :span="12">
        <div id="onlineChart" style="height: 300px">{{origin.totalNum}}</div>
      </el-col>
      <el-col :span="12">
        <div id="readStatusChart" style="height: 300px">{{origin.onlineNum}}</div>
      </el-col>
    </el-row>
    <el-row class="section-row">
      <el-col :span="12">
        <div id="deviceChart" style="height: 300px">{{origin.totalNum}}</div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // notOnlineNum: 0
    }
  },
  methods: {
    initOnlineInfoChart() {
      const myChart = echarts.init(document.getElementById('onlineChart'))
      myChart.showLoading()
      myChart.setOption(this.option)
      myChart.hideLoading()
    },
    initReadStatusChart() {
      const myChart = echarts.init(document.getElementById('readStatusChart'))
      myChart.showLoading()
      myChart.setOption(this.readOption)
      myChart.hideLoading()
    },
    initDeviceChart() {
      const myChart = echarts.init(document.getElementById('deviceChart'))
      myChart.showLoading()
      myChart.setOption(this.deviceOption)
      myChart.hideLoading()
    },
    getChartData() {
      let params = {}
      this.$store.dispatch('deviceManage/fetchOnlineNum', params)
    }
  },
  computed: {
    //从state中取出数据
    ...mapState({
      totalNum: state => state.deviceManage.totalNum,
      onlineNum: state => state.deviceManage.onlineNum,
      deviceLineData: state => state.deviceManage.deviceLineData
    }),
    origin() {
      let yDataList = this.deviceLineData.yDataList.map(item => item['yData'])
      return {
        totalNum: this.totalNum,
        onlineNum: this.onlineNum,
        notOnlineNum: this.totalNum - this.onlineNum,
        deviceLineData: this.deviceLineData,
        yDataList: yDataList
      }
      // return this.$store.state.deviceManage
    },
    option() {
      let obj = {
        title: {
          // text: this.origin.totalNum,//this.totalNum,
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#0580f2',
            fontSize: '30'
          }
        },
        color: ['rgba(176, 212, 251, 1)'],
        legend: {
          show: true,
          itemGap: 12,
          data: ['在线人数', '不在线人数'],
          orient: 'vertical',
          x: 'left',
        },

        series: [{
          name: '在线人数',
          type: 'pie',
          radius: ['50%', '56%'],
          color: '#00cefc',
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: this.origin.onlineNum,
            name: this.origin.onlineNum,
            label: {
              normal: {
                textStyle: {
                  fontSize: 25,
                  fontWeight: 'bold'
                }
              }
            },
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#ce5dec' // 0% 处的颜色
                  }, {
                    offset: 0.8,
                    color: '#5fa1ff' // 100% 处的颜色
                  }]
                },
                label: {
                  show: true
                },
                labelLine: {
                  show: false
                }
              }
            },
            // tooltip:{
            //      trigger: 'item',
            //      formatter: "{a} <br/>计算公式:占比率=({b}/注销总数)*100%<br/> 吊销注销数 : {c}"
            // }
          }, {
            value: this.origin.notOnlineNum,
            name: '不在线人数',
            label: {
              normal: {
                formatter: '\n在线人数',
                textStyle: {
                  color: '#555',
                  fontSize: 16
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#aaa'
              },
              // emphasis: {
              //   color: '#aaa'
              // }
            },
          }]
        }]
      }
      return obj
    },
    readOption() {
      let obj = {
        title: {
          // text: this.origin.totalNum,//this.totalNum,
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#0580f2',
            fontSize: '30'
          }
        },
        color: ['rgba(176, 212, 251, 1)'],
        legend: {
          show: true,
          itemGap: 12,
          data: ['已读', '未读'],
          orient: 'vertical',
          x: 'right',
        },

        series: [{
          name: '已读',
          type: 'pie',
          clockWise: true,
          radius: ['50%', '56%'],
          color: '#017aff',
          itemStyle: {
            normal: {
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            }
          },
          label: {
            normal: {
              position: 'center'
            }
          },
          // hoverAnimation: false,
          data: [{
            value: this.origin.onlineNum, //this.totalNum,
            name: this.origin.onlineNum,
            itemStyle: {
              normal: {
                color: '#017aff', // 完成的圆环的颜色,
                label: {
                  show: true
                },
                labelLine: {
                  show: false
                }
              }
            },
            label: {
              normal: {
                textStyle: {
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'black'
                }
              }
            },
          }, {
            name: '未读',
            value: this.origin.notOnlineNum, //this.onlineNum
            itemStyle: {
              normal: {
                color: 'red', // 完成的圆环的颜色,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            label: {
              normal: {
                formatter: '\n提醒消息',
                textStyle: {
                  color: '#555',
                  fontSize: 16
                }
              },
            }
          }]
        }]
      }
      return obj
    },
    deviceOption() {
      let obj = {
        title: {
          text: '新增设备信息',
          x: 'center'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.origin.deviceLineData.xDataList,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],

        series: [{
          name: '新增设备数',
          type: 'bar',
          barWidth: '60%',
          data: this.origin.yDataList,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            },
            label: {
              show: true
            },
          },
        }]
      }
      return obj
    }
  },
  mounted() {
    // action
    this.getChartData()
    // 在线人数echarts
    this.initOnlineInfoChart()
    // 阅读状态 echarts
    this.initReadStatusChart()
    // 设备 柱状图
    this.initDeviceChart()
  },
  updated() {
    //this.$nextTick(function () {
    // 在线人数echarts
    this.initOnlineInfoChart()
    // 阅读状态 echarts
    this.initReadStatusChart()
    // 设备 柱状图
    this.initDeviceChart()
    //})
  }
}

</script>
<style>
.section-btn {
  font-size: 30px;
}

.section-row {
  background-color: #fff;
  margin-top: 20px;
}

.section-row.header {
  height: 200px;
  text-align: center;
  padding-top: 70px;
}
.section-desc{
  font-size: 25px;
  font-weight: bold;
}

</style>
