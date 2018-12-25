<template>
  <el-dialog title="编辑" :visible="dialogEditFormVisible" @close="closeDialog">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="手机号" prop="tel" :label-width="formLabelWidth">
        <el-input v-model.number="form.tel" autocomplete="off"></el-input>
      </el-form-item>
      <!--       <el-form-item label="设备号" :label-width="formLabelWidth">
        <el-select v-model="form.deviceNo" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="设备号" prop="deviceNo" :label-width="formLabelWidth">
        <el-input v-model="form.deviceNo" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="date" :label-width="formLabelWidth">
        <el-date-picker v-model="form.date" value-format="yyyy-MM-dd" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="提醒类型" prop="remindType" :label-width="formLabelWidth">
        <el-input v-model="form.remindType" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="提醒内容" prop="remindContent" :label-width="formLabelWidth">
        <el-input v-model="form.remindContent" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
        <el-input v-model="form.status" autocomplete="off" disabled></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose('form')">取 消</el-button>
      <el-button type="primary" @click="handleOk('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogEditFormVisible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    // 自定义验证手机号
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        const reg = /^1[385][1-9]\d{8}/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号'))
        }
      }, 1000)
    }
    return {
      // form: {
      //   name: '',
      //   region: '',
      //   date1: '',
      //   date2: '',
      //   delivery: false,
      //   type: [],
      //   resource: '',
      //   desc: ''
      // },
      formLabelWidth: '120px',
      rules: {
        tel: [{ trigger: 'blur', validator: checkTel }
          // { type: 'number', message: '手机号必须为数字值' }
        ],
        deviceNo: [{ required: true, message: '请输入设备号', trigger: 'blur' }],
        date: [{ required: true, message: '请输入日期', trigger: 'blur' }],
        remindType: [{ required: true, message: '请输入消息提醒类型', trigger: 'blur' }],
        remindContent: [{ required: true, message: '请输入消息提醒内容', trigger: 'blur' }]
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    handleClose (form) {
      // 取消后数据还原
      this.$refs[form].resetFields()
      this.$emit('form-close')
    },
    handleOk (form) {
      this.$refs[form].validate((valid) => {
        // console.log(this.form)
        if (valid) {
          this.$emit('form-save', this.form) // this.form修改后的值传给父组件
        } else {
          return false
        }
      })
    },
    closeDialog () {
      this.$emit('form-close')
    }
  }
}

</script>
<style scoped>
</style>
