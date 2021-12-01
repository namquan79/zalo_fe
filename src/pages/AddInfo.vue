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
    <Panel header="Thêm thông tin đối tượng">
        <div class="card">
            <div class="p-fluid">
                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12 p-sm p-md-4">
                        <label>Mã đối tượng được lấy mẫu:</label>
                        <span class="p-input-icon-right">
                <InputText id="maDoiTuong" :filter="true" :showClear="true" type="text" v-model="maDoiTuong.maDoiTuong" placeholder="Vui lòng nhập mã đối " style="margin-bottom: 0.5em;text-align: center"/>
                </span>
                    </div>
                    <div class="p-field p-col-12 p-sm p-md-4">
                        <label>Ghi rõ thông tin đối tượng:</label>
                        <span class="p-input-icon-right">
                <InputText id="ghiChu" :filter="true" :showClear="true" type="text" v-model="maDoiTuong.ghiChu" placeholder="Vui lòng ghi rõ thông tin đối tượng" style="margin-bottom: 0.5em;text-align: center"/>
                </span>
                    </div>
                    <div class="p-field p-col-12 p-sm p-md-4">
                        <label>Xác nhận</label>
                        <Button type="button" icon="pi pi-plus-circle" label="Thêm thông tin đối tượng" @click="addMaDoiTuong()" :disabled="!validObject()"/>
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
                <label>Nhập địa điểm lấy mẫu:</label>
                <span class="p-input-icon-right">
                <InputText id="diadiem" :filter="true" :showClear="true" type="text" v-model="ongtiemshort.diaDiemLayMau" placeholder="Vui lòng nhập địa điểm..." style="margin-bottom: 0.5em;text-align: center"/>
                </span>
            </div>
            <div class="p-field p-col-12 p-sm p-md-4">
                <label>Nhập đối tượng lấy mẫu:</label>
                <span class="p-input-icon-right">
                <InputText id="doituong" :filter="true" :showClear="true" type="text" v-model="ongtiemshort.doiTuongLayMau" placeholder="Vui lòng nhập đối tượng..." style="margin-bottom: 0.5em;text-align: center"/>
                </span>
            </div>
          <div class="p-field p-col-12 p-sm p-md-4">
            <label>Thêm ống tiêm</label>
            <Button type="button" icon="pi pi-plus-circle" label="Thêm ống tiêm mới" @click="addOngTiem()"/>
          </div>
          <div class="p-field p-col-12 p-sm-12 p-md-12">
          </div>
            <Panel header="Thông tin ống tiêm được thêm mới" v-if="taoThanhCong">
                <div class="card">
                    <div class="p-fluid">
                        <div class="p-fluid p-formgrid p-grid">
                            <div class="p-field p-col-12 p-sm p-md-4">
                                <label>Mã ống tiêm:</label>
                                <span class="p-input-icon-right">
                                    <InputText id="maOngTiem" :filter="true" :showClear="true" type="text" v-model="ongTiem.maOngTiem" style="margin-bottom: 0.5em;text-align: center" readonly/>
                                </span>
                            </div>
                            <div class="p-field p-col-12 p-sm p-md-4">
                                <label>Đơn vị:</label>
                                <span class="p-input-icon-right">
                                    <InputText id="maOngTiem" :filter="true" :showClear="true" type="text" v-model="ongTiem.donVi" style="margin-bottom: 0.5em;text-align: center" readonly/>
                                </span>
                            </div>
                            <div class="p-field p-col-12 p-sm p-md-4">
                                <label>Ngày tạo:</label>
                                <span class="p-input-icon-right">
                                    <InputText id="maOngTiem" :filter="true" :showClear="true" type="text" v-model="ngayTao" style="margin-bottom: 0.5em;text-align: center" readonly/>
                                </span>
                            </div>
                            <div class="p-field p-col-12 p-sm p-md-4">
                                <label>Địa điểm lấy mẫu:</label>
                                <span class="p-input-icon-right">
                                    <InputText id="maOngTiem" :filter="true" :showClear="true" type="text" v-model="ongTiem.diaDiemLayMau" style="margin-bottom: 0.5em;text-align: center" readonly/>
                                </span>
                            </div>
                            <div class="p-field p-col-12 p-sm p-md-4">
                                <label>Đối tượng lấy mẫu:</label>
                                <span class="p-input-icon-right">
                                    <InputText id="maOngTiem" :filter="true" :showClear="true" type="text" v-model="ongTiem.doiTuongLayMau" style="margin-bottom: 0.5em;text-align: center" readonly/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>
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
  import {Ongtiemshort} from "@/models/ongtiemshort";
  import axios from "axios";
  import {MaDoiTuong} from "@/models/maDoiTuong";

  export default {
    setup() {
      const donVi = ref({} as DonViCreate);
      const toast = useToast();
      const ongTiem = ref({} as Ongtiem);
      const ngayTao = ref("");
      const taoThanhCong = ref(false);
      const ongtiemshort = ref({} as Ongtiemshort);
      const fileNameExport = ref("");
      const exportFileDetail = ref(false);
      const maDoiTuong = ref({} as MaDoiTuong);
      const loadingBar = ref(false);

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

        const validObject = () => {
            return maDoiTuong.value.maDoiTuong && maDoiTuong.value.ghiChu;
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
        VaccinationRepository.createOngTiem(ongtiemshort.value)
                .then((response) => {
                    toast.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail:'Ống  đã được tạo thành công',
                        life: 2500
                    });
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
      const addMaDoiTuong = () => {
        VaccinationRepository.createMaDoiTuong(maDoiTuong.value)
                .then((response) => {
                    toast.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail:'Thông tin đối tượng đã được tạo thành công',
                        life: 2500
                    });
                })
                .catch(err => {
                  toast.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail:err.response.data,
                    life: 2500
                  })});
      };

        const exportFile = () =>{
            loadingBar.value = true;
            VaccinationRepository.getExport()
                .then((response) => {
                    fileNameExport.value = response.data;
                    exportFileDetail.value = true;
                    loadingBar.value = false;
                })
                .catch(err => {
                    loadingBar.value = false;
                    toast.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail:err.response.data,
                        life: 2500
                    })});
        };
        const downloadFile = () => {
            axios({
                url: 'api/vaccination/DownloadResult/'+fileNameExport.value,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', fileNameExport.value);
                document.body.appendChild(fileLink);

                fileLink.click();
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
        ongtiemshort,
        exportFile,
        downloadFile,
        exportFileDetail,
          maDoiTuong,
          addMaDoiTuong,
          validObject,
          loadingBar,
      }
    }

  }
</script>