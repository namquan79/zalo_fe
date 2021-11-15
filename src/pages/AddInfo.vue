<template>
  <!--  </TabPanel>-->

  <Panel header="Tạo đơn vị tiêm">
    <div class="card">
      <div class="p-fluid">
        <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-sm p-md-4">
              <label>Nhập tên đơn vị:</label>
                <span class="p-input-icon-right">
                <InputText id="ten" :filter="true" :showClear="true" type="text" v-model="donVi.ten" placeholder="Vui lòng nhập tên đơn vị" style="margin-bottom: 0.5em;text-align: center"/>
                </span>
            </div>
            <div class="p-field p-col-12 p-sm p-md-4">
              <label>Nhập mã đơn vị:</label>
              <span class="p-input-icon-right">
                <InputText id="madonvi" :filter="true" :showClear="true" type="text" v-model="donVi.ma" placeholder="Vui lòng nhập mã đơn vị" style="margin-bottom: 0.5em;text-align: center"/>
                </span>
            </div>
            <div class="p-field p-col-12 p-sm p-md-4">
              <label>Xác nhận</label>
              <Button type="button" icon="pi pi-plus-circle" label="Thêm đơn vị" @click="add()" :disabled="!valid()"/>
            </div>
        </div>
      </div>
    </div>
  </Panel>
  <Panel header="Thêm ống tiêm">
    <div class="card">
      <div class="p-fluid">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-sm p-md-4">
            <label>Thêm ống tiêm</label>
            <Button type="button" icon="pi pi-plus-circle" label="Thêm ống tiêm mới" @click="addOngTiem()"/>
          </div>
          <div class="p-field p-col-12 p-sm-12 p-md-12">
          </div>
          <div class="p-field p-col-12 p-sm p-md-4" v-if="taoThanhCong">
            <label>Mã ống tiêm:</label>
            <span class="p-input-icon-right">
                <InputText id="maOngTiem" :filter="true" :showClear="true" type="text" v-model="ongTiem.maOngTiem" style="margin-bottom: 0.5em;text-align: center" readonly/>
                </span>
          </div>
          <div class="p-field p-col-12 p-sm p-md-4" v-if="taoThanhCong">
            <label>Đơn vị:</label>
            <span class="p-input-icon-right">
                <InputText id="maOngTiem" :filter="true" :showClear="true" type="text" v-model="ongTiem.donVi" style="margin-bottom: 0.5em;text-align: center" readonly/>
                </span>
          </div>
          <div class="p-field p-col-12 p-sm p-md-4" v-if="taoThanhCong">
            <label>Ngày tạo:</label>
            <span class="p-input-icon-right">
                <InputText id="maOngTiem" :filter="true" :showClear="true" type="text" v-model="ngayTao" style="margin-bottom: 0.5em;text-align: center" readonly/>
                </span>
          </div>
        </div>
      </div>
    </div>
  </Panel>
</template>

<script lang="ts">

  import { computed, ref } from 'vue';
  import {useToast} from "primevue/usetoast";
  import VaccinationRepository from "@/services/VaccinationRepository";
  import moment from 'moment';
  import {FilterMatchMode, FilterOperator} from "primevue/api";
  import {DonViCreate} from "@/models/donViCreate";
  import {Ongtiem} from "@/models/ongtiem";

  export default {
    setup() {
      const donVi = ref({} as DonViCreate);
      const toast = useToast();
      const ongTiem = ref({} as Ongtiem);
      const ngayTao = ref("");
      const taoThanhCong = ref(false);

      const formatDateTime = (date) => {
        return moment(String(date)).format('DD/MM/YYYY HH:mm');
      };

      const filters = ref({
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
      });

      const clearFilter = () => {
        initFilters();
      };

      const initFilters = () => {
        filters.value = {
          'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
      };

      const valid = () => {
        return donVi.value.ten && donVi.value.ma;
      };

      const add = () =>{
        VaccinationRepository.createDonVi(donVi.value)
                .then((response) => {
                  toast.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail:'Đơn vị đã được tạo thành công',
                    life: 2500
                  });
                  donVi.value.ma = "";
                  donVi.value.ten = "";
                })
                .catch(err => {
                  toast.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail:err.response.data,
                    life: 2500
                  })});
      };
      const addOngTiem = () => {
        VaccinationRepository.createOngTiem()
                .then((response) => {
                  ongTiem.value = response.data;
                  ngayTao.value = formatDateTime(ongTiem.value.ngayTao);
                  taoThanhCong.value = true;
                 // console.log("##########$$$$$$$$$$$$$$$ addOngTiem: " + JSON.stringify(ongTiem.value));
                })
                .catch(err => {
                  toast.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail:err.response.data,
                    life: 2500
                  })});
      };

      return {
        formatDateTime,
        filters,
        clearFilter,
        donVi,
        valid,
        add,
        addOngTiem,
        ongTiem,
        ngayTao,
        taoThanhCong,
      }
    }

  }
</script>