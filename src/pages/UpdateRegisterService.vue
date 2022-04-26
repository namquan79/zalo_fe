<template>
  <ConfirmPopup></ConfirmPopup>
  <Panel header="Xác nhận lịch khám bệnh">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Họ và tên</label>
        <InputText id="fullname" type="text" v-model="registerServiceUpdate.customerName" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Số điện thoại</label>
        <InputText id="phoneNumber" type="text" v-model="registerServiceUpdate.phoneNumber" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Địa chỉ</label>
        <InputText id="address" type="text" v-model="registerServiceUpdate.address" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Dịch vụ</label>
        <InputText id="service" type="text" v-model="registerServiceUpdate.serviceName" style="text-align: center"/>
      </div>
      <div class="p-field p-col-12 p-sm p-md-6">
        <label for="dateselect">Chọn ngày khám:</label>
        <Calendar
                id="dateselect"
                v-model="registerServiceUpdate.timeBooking"
                selectionMode="single"
                dateFormat="dd/mm/yy"
                :showButtonBar="true"
                :showIcon="true"
                :manualInput="false"
                :monthNavigator="true"
                :yearNavigator="true"
                yearRange="1900:2050"
                :minDate="minDate"
        />
      </div>
    <div class="p-field p-col-12 p-sm-12 p-md-12">
<!--      <div class="p-field p-col-12 p-sm p-md-4">-->
        <Button label="Cập nhật" icon="pi pi-user-edit" :disabled="!valid()" @click="update()"  style="margin-right: 20px; width: 20vw"/>
<!--      </div>-->
    </div>
    </div>
  </Panel>
</template>

<script lang="ts">

import {ref} from 'vue'
import {useToast} from "primevue/usetoast";
import AuthRepository from "@/services/AuthRepository";
import {useStore} from "vuex";
import router from "@/router";
import {Team} from "@/models/team.models";
import {FilterMatchMode} from "primevue/api";
import Province from "@/models/province.models";
import District from "@/models/district.models";
import Ward from "@/models/Ward.models";
import {ThongTinUpdate} from "@/models/thongTinUpdate";
import VaccinationRepository from "@/services/VaccinationRepository";
import {useConfirm} from "primevue/useconfirm";
import {ThongTinDoiTuong} from "@/models/thongTinDoiTuong";
import {RegisterServiceUpdate} from "@/models/registerServiceUpdate";
import ZaloRepository from "@/services/ZaloRepository";

export default {
  props: {
    id: String,
  },
  setup(props){
    const toast = useToast();
    const registerServiceUpdate = ref({} as RegisterServiceUpdate);
    const minDate = ref(new Date());

    const toTimestamp = (strDate) => {
      const dt = Date.parse(strDate);
      return dt / 1000;
    }
    ZaloRepository.registerServiceById(props.id)
        .then((response) => {
          registerServiceUpdate.value = response.data;
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail:err.response.data,
            life: 2500
          })});

    const update = () => {
      registerServiceUpdate.value.timeBooking?.setHours(registerServiceUpdate.value.timeBooking?.getHours() + 7);
      ZaloRepository.updateRegisterService(registerServiceUpdate.value)
          .then((response) => {
            registerServiceUpdate.value = response.data;
            toast.add({
              severity: 'success',
              summary: 'Thành công',
              detail:'Đặt lịch khám thành công',
              life: 2500
            })
          })
          .catch(err => {
            toast.add({
              severity: 'error',
              summary: 'Lỗi',
              detail:err.response.data,
              life: 2500
            })});
    }
    const valid = () => {
      return registerServiceUpdate.value.timeBooking;
    }

    return {
      registerServiceUpdate,
      update,
      valid,
      minDate,
      // nonAccentVietnamese
    }
  }

}
</script>
<style lang="scss">
 label{
   margin-bottom: 8px;
  text-align: initial;
  font-weight: bold;
  margin: 0;
  /*    !*font-size: 13px;*!*/
  }
</style>