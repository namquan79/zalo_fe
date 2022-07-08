<template>
  <Panel header="Kết quả cận lâm sàn">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
<!--        <Fieldset>-->
<!--          <template #legend>-->
<!--            Mã đơn thuốc: {{donThuoc.ma_don_thuoc}}-->
<!--          </template>-->
        <Panel>
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Họ và tên</label>
              <InputText id="fullname" type="text" v-model="subclinicalResults.tenBenhNhan" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Số vào viện</label>
              <InputText id="number" type="text" v-model="subclinicalResults.soVaoVien" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Năm sinh</label>
              <InputText id="birthday" type="text" v-model="subclinicalResults.namSinh" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Số điện thoại</label>
              <InputText id="weight" type="text" v-model="subclinicalResults.soDienThoai" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>CMT/CCCD (nếu có)</label>
              <InputText id="cmnd" type="text" v-model="subclinicalResults.cmnd" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Địa chỉ</label>
              <InputText id="diachi" type="text" v-model="subclinicalResults.diaChi" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Ngày yêu cầu</label>
              <InputText id="dodienthoai" type="text" v-model="subclinicalResults.ngayYeuCau" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Số phiếu yêu cầu</label>
              <InputText id="sophieuyeucau" type="text" v-model="subclinicalResults.soPhieuYeuCau" style="text-align: center"/>
            </div>
          </div>
    <!--    <Panel header="">-->
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-md-12 p-lg-12">
            </div>
            <lv v-for="sub of listSubclinicalResults">
              <Panel>
              <div class="p-field p-col-12 p-md-12 p-lg-12">
                <label>Tên nhóm dịch vụ:  {{sub.tenNhomDichVu}}</label>
              </div>
            <div class="p-field p-col-12 p-md-12 p-lg-12">
            <label>Kết quả:</label>
            <DataTable :value="sub.chiTietKetQua" showGridlines responsiveLayout="scroll">
              <Column field="noiDungCap_1" header="Nội dung cấp 1"></Column>
              <Column field="noiDungCap_2" header="Nội dung cấp 2"></Column>
              <Column field="noiDungCap_3" header="Nội dung cấp 3"></Column>
              <Column field="noiDung" header="Nội dung"></Column>
              <Column field="ketQua" header="Kết quả"></Column>
              <Column field="dvt" header="Đơn vị tính"></Column>
            </DataTable>
            </div>
              </Panel>
            </lv>
          </div>
        </Panel>
      </div>
    </div>
  </Panel>
</template>

<script lang="ts">

import { computed, ref } from 'vue'
import AuthRepository from '@/services/AuthRepository'
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router'
import {Register} from "../models/register";
import {useStore} from "vuex";
import {SubclinicalResults} from "@/models/subclinicalResults";
import zaloRepository from "@/services/ZaloRepository";

export default {
  props: {
    svv: String,
    sdt: String,
  },

  setup(props){
    const router = useRouter();
    const toast = useToast();
    const store = useStore();
    const error = ref(null);
    const listSubclinicalResults = ref([] as SubclinicalResults[]);
    const subclinicalResults = ref({} as SubclinicalResults);

      zaloRepository.getListSubclinicalResult(props.svv,props.sdt)
          .then((response) => {
            listSubclinicalResults.value = response.data;
            // console.log("############$$$$$$$$$$$$$$$$$$$ listSubclinicalResults: " + JSON.stringify(listSubclinicalResults.value));
            subclinicalResults.value = listSubclinicalResults.value[0];

            // console.log("############$$$$$$$$$$$$$$$$$$$ subclinicalResults: " + JSON.stringify(subclinicalResults.value));
          })
          .catch(err => {
            toast.add({
              severity: 'error',
              summary: 'Lỗi',
              detail:err.response.data,
              life: 4000
            });
          });

    return {
      subclinicalResults,
      listSubclinicalResults
    }
  }
}

</script>
<style lang="scss" scoped>
.fieldset p {
  line-height: 1.5;
  margin: 0;
}
</style>