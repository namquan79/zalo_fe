<template>
  <!--  </TabPanel>-->
    <Panel header="Tạo địa chỉ tiêm">
        <div class="card">
            <div class="p-fluid">
                <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col-12 p-sm p-md-4">
                        <label>Nhập tên địa chỉ:</label>
                        <InputText id="diachi" :filter="true" :showClear="true" type="text" v-model="diaDiem.diaChi" placeholder="Vui lòng nhập địa chỉ" style="margin-bottom: 0.5em;text-align: center"/>
                    </div>
                    <div class="p-field p-col-12 p-sm p-md-4">
                        <label for="dateselect">Vui lòng lựa chọn ngày:</label>
                        <Calendar
                                id="locationdateselect"
                                v-model="timeLocation"
                                selectionMode="single"
                                dateFormat="dd/mm/yy"
                                :showButtonBar="true"
                                :showIcon="true"
                                :manualInput="false"
                                :monthNavigator="true"
                                :yearNavigator="true"
                                yearRange="2000:2100"
                        />
                    </div>
                    <div class="p-field p-col-12 p-sm p-md-4">
                        <label>Thêm địa chỉ</label>
                        <Button type="button" icon="pi pi-plus-circle" label="Thêm địa chỉ" @click="addLocation()"/>
                    </div>
                </div>
            </div>
        </div>
    </Panel>
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
                <label>Chọn địa điểm lấy mẫu:</label>
                <span class="p-input-icon-right">
                    <Dropdown id="donvi" v-model="idDiaDiem" :options="listDiaDiem" optionLabel="diaChi" optionValue="idDiaDiem" placeholder="Vui lòng chọn địa điểm">
                    </Dropdown>
                </span>
            </div>
            <div class="p-field p-col-12 p-sm p-md-4">
                <label>Nhập đối tượng lấy mẫu:</label>
                <span class="p-input-icon-right">
                <InputText id="doituong" :filter="true" :showClear="true" type="text" v-model="ongtiemshort.doiTuongLayMau" placeholder="Vui lòng nhập đối tượng..." style="margin-bottom: 0.5em;text-align: center"/>
                </span>
            </div>
            <div class="p-field p-col-12 p-sm p-md-4">
                <label for="dateselect">Vui lòng lựa chọn ngày:</label>
                <Calendar
                        id="dateselect"
                        v-model="ngayChon"
                        selectionMode="single"
                        dateFormat="dd/mm/yy"
                        :showButtonBar="true"
                        :showIcon="true"
                        :manualInput="false"
                        :monthNavigator="true"
                        :yearNavigator="true"
                        yearRange="2000:2100"
                        @date-select="loadListDiaDiem()"
                />
            </div>
          <div class="p-field p-col-12 p-sm p-md-4">
            <label>Tạo ống tiêm mới</label>
            <Button type="button" icon="pi pi-plus-circle" label="Thêm ống tiêm mới" @click="addOngTiem()" :disabled="!validOngTiem()"/>
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
  import {DiaDiem} from "@/models/diaDiem";
  import {DiaDiemDetail} from "@/models/diaDiemDetail";

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
      const ngayChon = ref(new Date());
      const diaDiem = ref({} as DiaDiem);
      const timeLocation = ref(new Date());
      const listDiaDiem = ref([] as DiaDiemDetail[]);
      const idDiaDiem = ref(0);


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

        const validOngTiem = () => {
            return (idDiaDiem.value != 0) && ongtiemshort.value.doiTuongLayMau && ngayChon.value;
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
          //ongtiemshort.value.ngayChon = ngayChon.value.getTime()/1000;
          ongtiemshort.value.ngayChon = ngayChon.value;
          ongtiemshort.value.idDiaDiem = idDiaDiem.value;
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

      const addLocation = () => {
          diaDiem.value.thoiGian = timeLocation.value;
          VaccinationRepository.createDiaDiem(diaDiem.value)
              .then((response) => {
                  toast.add({
                      severity: 'success',
                      summary: 'Thành công',
                      detail:'Thông tin địa điểm đã được tạo thành công',
                      life: 2500
                  });
                  loadListDiaDiem();
              })
              .catch(err => {
                  toast.add({
                      severity: 'error',
                      summary: 'Lỗi',
                      detail:err.response.data,
                      life: 2500
                  })});
      };

        const loadListDiaDiem = () => {
            idDiaDiem.value = 0;
            VaccinationRepository.getListDiaDiem(ngayChon.value.getTime()/1000)
                .then((response) => {
                    listDiaDiem.value = response.data;
                })
                .catch(err => {
                    toast.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail:err.response.data,
                        life: 2500
                    })});
        };


        loadListDiaDiem();


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
        exportFileDetail,
          maDoiTuong,
          addMaDoiTuong,
          validObject,
          loadingBar,
          ngayChon,
          validOngTiem,
          diaDiem,
          timeLocation,
          addLocation,
          listDiaDiem,
          idDiaDiem,
          loadListDiaDiem,
      }
    }

  }
</script>