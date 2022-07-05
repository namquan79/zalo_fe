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
<!--        <Column field="antecedent" header="Tiền sử bệnh"></Column>-->
        <label>Tiền sử bệnh</label>
        <InputText id="antecedent" type="text" v-model="registerServiceUpdate.antecedent" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Dịch vụ</label>
        <InputText id="service" type="text" v-model="registerServiceUpdate.serviceName" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Yêu cầu</label>
        <InputText id="message" type="text" v-model="registerServiceUpdate.message" style="text-align: center"/>
      </div>
      <div class="p-field p-col-12 p-sm p-md-6">
        <label for="dateselect">Chọn thời gian khám:</label>
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
                :showTime="true"
        >
          <template #body="{data}">
            {{formatDateTime(data.timeBooking)}}
          </template>
        </Calendar>
      </div>
      <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
      </div>
      <div class="card p-col p-col-12 p-md-12 p-lg-12">
        <div class="p-grid">
          <div class="p-offset-4 p-col-4 p-sm-4 p-md-4">
            <Button label="Cập nhật" icon="pi pi-check" :disabled="!valid()" @click="update()"/>
          </div>
        </div>
      </div>
    </div>
  </Panel>
</template>

<script lang="ts">

import {ref} from 'vue'
import {useToast} from "primevue/usetoast";
import moment from "moment";
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
    const loadData = () => {
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
    }

    loadData();

    const update = () => {
      console.log("#######$$$$$$$$$$$$$$$$$ update: ");
      console.log("#######$$$$$$$$$$$$$$$$$ update registerServiceUpdate.value.timeBooking: " + registerServiceUpdate.value.timeBooking);
      console.log("#######$$$$$$$$$$$$$$$$$ update registerServiceUpdate.value.timeBooking formatDate: " + formatDate(registerServiceUpdate.value.timeBooking));
      registerServiceUpdate.value.timeBooking = formatDate(registerServiceUpdate.value.timeBooking);
      ZaloRepository.updateRegisterService(registerServiceUpdate.value)
          .then((response) => {
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
    const formatDateTime = (date) => {
      console.log("########################## formatDateTime: " + moment(String(date)).format('DD/MM/YYYY'));
      return moment(String(date)).format('DD/MM/YYYY');
    };
    const formatDate = (date) => {
      return moment(String(date)).format('YYYY-MM-DDTHH:mm:ss');
    };

    return {
      registerServiceUpdate,
      update,
      valid,
      minDate,
      formatDateTime,
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