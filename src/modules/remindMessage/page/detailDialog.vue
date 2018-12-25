<template>
  <el-dialog title="信息详情" :visible="dialogTableVisible" @close="closeDialog" class="dialog">
    <el-row>
      <el-col :span="3" :offset="4" class="detail detail-label">
        设备号:
      </el-col>
      <el-col :span="3" class="detail">
        {{rowInfo.deviceNo}}
      </el-col>
      <el-col :span="3" :offset="4" class="detail detail-label">
        提醒类型:
      </el-col>
      <el-col :span="3" class="detail">
        {{rowInfo.remindType}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="4" class="detail detail-label">
        提醒内容：
      </el-col>
      <el-col :span="12" style="padding-top: 15px;" class="detail-remind">
        <el-row>车辆可能发生碰撞，请及时查看</el-row>
        <el-row>
          <el-col :span="4" class="detail-remind detail-remind-label">
            车牌号:
          </el-col>
          <el-col :span="4" class="detail-remind">
            {{rowInfo.cardNo}}
          </el-col>
          <el-col :span="4" class="detail-remind detail-remind-label">
            设备号:
          </el-col>
          <el-col :span="4" class="detail-remind">
            {{rowInfo.deviceNo}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="detail-remind detail-remind-label">
            建议:
          </el-col>
          <el-col :span="20" class="detail-remind">
            {{rowInfo.opinion}}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="4" class="detail detail-label">
        阅读状态：
      </el-col>
      <el-col :span="3" class="detail" :class="[rowInfo.status === 0 ? 'read-status' : '']">
        {{rowInfo.status === 1 ? '已读' : '未读'}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="4" :span="17" class="border" />
    </el-row>
    <el-row>
      <el-col :span="3" :offset="4" class="detail detail-label">
        车主姓名:
      </el-col>
      <el-col :span="3" class="detail">
        {{rowInfo.name}}
      </el-col>
      <el-col :span="3" :offset="4" class="detail detail-label">
        手机号:
      </el-col>
      <el-col :span="3" class="detail">
        {{rowInfo.tel}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="4" class="detail detail-label">
        性别:
      </el-col>
      <el-col :span="3" class="detail">
        {{rowInfo.sex}}
      </el-col>
      <el-col :span="3" :offset="4" class="detail detail-label">
        车牌号:
      </el-col>
      <el-col :span="3" class="detail">
        {{rowInfo.cardNo}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="4" class="detail detail-label">
        设备有效期:
      </el-col>
      <el-col :span="3" class="detail">
        {{rowInfo.deviceValidDate}}
      </el-col>
      <el-col :span="3" :offset="3" class="detail detail-label">
        注册时间:
      </el-col>
      <el-col :span="3" class="detail">
        {{rowInfo.registDate}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="4" class="detail detail-label">
        归属店面:
      </el-col>
      <el-col :span="17" class="detail">
        {{rowInfo.belongingShop}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="4" :span="17" class="border" />
    </el-row>
    <!--     <div style="height: 300px;">
      <div v-for="(item,index) in detailInfo" :key="index">
        <el-col :span="3" :offset="4" class="detail detail-label">
          {{item.label}}:
        </el-col>
        <el-col :span="3" class="detail">
          {{item.value}}
        </el-col>
      </div>
    </div> -->
    <el-row>
      <el-col :span="3" :offset="5">
        <el-button type="primary" style="width:98px;">定位</el-button>
      </el-col>
      <el-col :span="3" :offset="5" >
        <el-button type="warning">查看照片</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    rowInfo: {
      type: Object,
      // 对象/数组的默认值要通过工厂函数返回
      default: () => {}
    }
  },
  data () {
    return {
      detailInfo: [{
        label: '车主姓名',
        value: '123456'
      }, {
        label: '手机号',
        value: '12222222'
      }, {
        label: '性别',
        value: '男'
      }, {
        label: '车牌号',
        value: '123456'
      }, {
        label: '设备有效期',
        value: '2020-12-0'
      }, {
        label: '注册时间',
        value: '2018-12-01'
      }, {
        label: '归属店面',
        value: '深圳'
      }]
    }
  },
  methods: {
    closeDialog () {
      this.$emit('on-close')
    }
  }
}

</script>
<style scoped>
.dialog {
  line-height: auto;
}

.el-dialog__title {
  font-size: 40px;
  font-weight: bold;
}

.detail {
  line-height: 50px;
  text-align: left;
  font-weight: bold;
  font-size: 18px;
  vertical-align: center;
}

.detail-label,
.detail-remind-label {
  color: #7f7f7f;
}

.detail-remind {
  line-height: 20px;
  text-align: left;
  font-weight: bold;
  font-size: 15px;
}

.read-status {
  color: red;
}

.border {
  border-top: 1px #7f7f7f solid;
  height:20px;
}

</style>
