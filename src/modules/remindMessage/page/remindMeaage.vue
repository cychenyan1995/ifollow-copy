<template>
  <section class="section">
    <el-row>
      <div class="show-section top">
        <span class="show-section-title">提醒信息管理</span>
      </div>
    </el-row>
    <el-row style="line-height: 160px;">
      <el-col :span="3" :offset="1">
        <!--  <el-button round class=" show-section-btn">设备号</el-button> -->
        <!-- <el-input class="show-section-input" v-model="input" placeholder="设备号"></el-input> -->
        <div class="show-section-input el-input" clearable>
          <input type="text" autocomplete="off" v-model="deviceNo" placeholder="设备号" class="el-input__inner show-section-input" @keyup.enter="enterSearch">
        </div>
        <!-- <input class="show-section-input" v-model="input" placeholder="设备号"></input> -->
      </el-col>
      <el-col :span="2" style="text-align:center;">
        <span class="glyphicon glyphicon-search show-section-search" @click="onSearch" aria-hidden="true"></span>
      </el-col>
      <el-col :span="1">
        <a class="show-section show-section-a" href="javascript:;" @click="clearSearch">清空</a>
      </el-col>
      <el-col :span="2">
        <a class="show-section show-section-a" href="javascript:;">导出列表</a>
      </el-col>
      <el-col :span="2" :offset="10">
        <el-popover placement="left" width="300" trigger="click" style="top: 290px;">
          <el-checkbox-group v-model="checkList" @change="checkboxSearch">
            <el-checkbox v-for="(item,index) in ckeckboxList" :key="index" :class="index === 0 ? 'show-section-checkbox' : ''" :label="item"></el-checkbox>
          </el-checkbox-group>
          <div slot="reference">
            <span class="show-section show-section-select">筛选</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </el-popover>
      </el-col>
    </el-row>
    <div class="show-section-table">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @cell-click="toDetail" :cell-class-name="Rowpointer">
        <!-- @row-click="toDetail" -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="tel" label="手机号" width="120">
          <template slot-scope="scope">
            {{ scope.row.tel }}
          </template>
        </el-table-column>
        <el-table-column prop="deviceNo" label="设备号" width="120">
        </el-table-column>
        <el-table-column prop="date" label="时间" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="remindType" label="提醒类型" width="120">
        </el-table-column>
        <el-table-column prop="remindContent" label="提醒内容" width="300" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <!--  fixed="right" -->
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope"><span :class="[scope.row.status === 0 ? 'read-status' : '']">{{ scope.row.status === 1 ? '已读' : '未读' }}</span></template>
        </el-table-column>
      </el-table>
      <div class="block" style="float:right;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <detail-dialog :dialogTableVisible="dialogTableVisible" :rowInfo="rowInfo" @on-close="closeDialog"></detail-dialog>
    <form-dialog :dialogEditFormVisible="dialogEditFormVisible" @form-close="closeFormDialog" @form-save="editSaveForm" :form="rowInfo"></form-dialog>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import detailDialog from '../page/detailDialog'
import formDialog from '../page/formDialog'
export default {
  data () {
    return {
      deviceNo: '',
      checkList: ['手机号'],
      ckeckboxList: ['手机号', '设备号', '时间类型', '提醒类型', '操作', '状态'],
      // tableData: [],
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      currentPage: 1,
      // total: 0,
      multipleSelection: [],
      dialogTableVisible: false,
      dialogEditFormVisible: false,
      rowInfo: {},
      currIndex: 999
    }
  },
  components: {
    detailDialog,
    formDialog
  },
  methods: {
    // 选择多行
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    clearSearch () {
      this.deviceNo = ''
      this.getTableList()
    },
    getTableList (currPage) {
      this.currPage = currPage === undefined ? 1 : currPage
      this.deviceNo = this.deviceNo.replace(/s/g, '')
      let params = {
        currPage: this.currPage,
        pageSize: this.pageSize,
        deviceNo: this.deviceNo
      }
      // this.$store.dispatch('fetchTableList', { param: params, ref: this })
      // namespace:true   在页面上使用action mutation getters都需要加上模块名
      this.$store.dispatch('remindMessage/fetchTableListByPage', { param: params, ref: this })
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.getTableList(this.currPage)
    },
    handleCurrentChange (currPage) {
      this.currPage = currPage
      this.getTableList(currPage)
    },
    // 按钮查询
    onSearch () {
      this.getTableList()
    },
    // 回车查询
    enterSearch () {
      this.getTableList()
    },
    // checknox勾选查询
    checkboxSearch () {
      console.log(this.checkList)
    },
    toDetail (row, column, cell, event) {
      if (column.property !== 'status' && column.label !== '操作') {
        this.dialogTableVisible = true
        this.rowInfo = row
      }
    },
    // 关闭弹窗
    closeDialog () {
      this.dialogTableVisible = false
    },
    // 给table的每一行设置鼠标样式  返回样式名称
    Rowpointer ({ row, column, rowIndex, columnIndex }) {
      // console.log(column)
      if (column.property !== 'status' && column.label !== '操作') {
        return 'pointer'
      }
    },
    // 编辑
    handleEdit (index, row) {
      this.dialogEditFormVisible = true
      this.rowInfo = row
      this.currIndex = index
    },
    // 删除
    handleDel (index, row) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          id: row.id, // mock中自增id
          currPage: this.currPage,
          pageSize: this.pageSize
          // tableData: this.tableData
        }
        this.$store.dispatch('remindMessage/fetchDelRow', { params: params })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

      // this.$store.commit('remindMessage/setDelStatus', {params: params})
    },
    // 关闭编辑的弹窗
    closeFormDialog () {
      this.dialogEditFormVisible = false
    },
    // 保存修改
    editSaveForm (form) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          currIndex: this.currIndex,
          record: form,
          currPage: this.currPage,
          pageSize: this.pageSize
        }
        this.$store.dispatch('remindMessage/fetchEditRow', { params: params })
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.dialogEditFormVisible = false
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '修改失败！'
        })
      })
    }
  },
  // 页面挂载到html时执行
  mounted () {
    console.log('mounted')
    this.getTableList()
  },
  computed: mapState({
    tableData: state => {
      console.log('computed')
      return state.remindMessage.tableData
    },
    pageTotal: state => state.remindMessage.pageTotal
  })
}

</script>
<style>
.section {
  background-color: #fff;
  /*  height: 100px;*/
}

.show-section {
  border-radius: 4px;
  height: 60px;
}

.show-section-title {
  font-size: 24px;
  margin-top: 40px;
  line-height: 100px;
  text-align: center;
}

.show-section.top {
  font-weight: bold;
  text-align: center;
}

.show-section-search {
  font-size: 24px;
  color: #20a0ff;
  margin-left: 25px;
  margin-top: 65px;
}

.show-section-input {
  width: 150px;
  height: 40px;
  border-radius: 30px;
}

.show-section-a {
  text-decoration: underline;
  color: black;
  font-weight: bold;
  font-size: 20px;
}

.show-section-table {
  margin: 0 30px;
  line-height: 30px;
}

.show-section-select {
  font-size: 20px;
}

.read-status {
  color: red;
}

.show-section-checkbox {
  margin-left: 30px;
}

/* 设置超出提示的样式 */
.el-tooltip__popper {
  max-width: 400px;
  line-height: 180%;
}

/* 鼠标变成小手 */
.pointer {
  cursor: pointer;
}

</style>
