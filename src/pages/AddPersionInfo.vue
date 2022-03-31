<template>
  <ConfirmPopup></ConfirmPopup>
  <Panel header="Thêm thông tin người được xét nghiệm">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Họ và tên</label>
        <InputText id="fullname" type="text" v-model="thongTinCreate.ten" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Số điện thoại</label>
        <InputText id="username" type="text" v-model="thongTinCreate.soDienThoai" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Địa chỉ</label>
        <InputText id="address" type="text" v-model="thongTinCreate.diaChiCuThe" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Giới tính</label>
        <Dropdown id="sex" v-model="thongTinCreate.gioiTinh" :options="gioiTinh" optionLabel="value" optionValue="value">
        </Dropdown>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>CMND/CCCD/Passport</label>
        <InputText id="cmnd" type="text" v-model="thongTinCreate.cmnd" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Mã đối tượng được lấy mẫu</label>
        <Dropdown id="maDoiTuong" :filter="true" :showClear="true" v-model="thongTinCreate.maDoiTuong" :options="thongtinDoiTuong" optionLabel="maDoiTuong" optionValue="maDoiTuong" placeholder=" - Chọn mã đối tượng -" style="text-align: center">
        </Dropdown>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Địa điểm lấy mẫu</label>
        <Dropdown id="diadiem" :filter="true" :showClear="true" v-model="idDiaDiem" :options="listDiaDiem" optionLabel="diaChi" optionValue="idDiaDiem" @change="getListOngTiem" placeholder=" - Chọn địa chỉ lấy mẫu -" style="text-align: center">
        </Dropdown>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Chọn mã ống tiêm</label>
        <Dropdown id="maOngtiem" :filter="true" :showClear="true" v-model="thongTinCreate.maOngTiem" :options="listOngTiem" optionLabel="maOngTiem" optionValue="maOngTiem" placeholder=" - Chọn mã ống tiêm -" style="text-align: center">
        </Dropdown>
      </div>
      <div class="p-field p-col-12 p-sm p-md-6">
        <label for="dateBirthday">Chọn ngày sinh:</label>
        <Calendar
                id="dateselect"
                v-model="timeSelect"
                selectionMode="single"
                dateFormat="dd/mm/yy"
                :showButtonBar="true"
                :showIcon="true"
                :manualInput="false"
                :monthNavigator="true"
                :yearNavigator="true"
                yearRange="1900:2050"
        />
      </div>
      <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
      </div>
      <div class="p-field p-col-12 p-sm p-md-4">
        <Dropdown id="province" :filter="true" :showClear="true" v-model="province" @change="selectProvince" :options="provinces" optionLabel="provinceName" optionValue="provinceCode" placeholder=" - Chọn Tỉnh/Thành 1 -">
        </Dropdown>
      </div>
      <div class="p-field p-col-12 p-sm p-md-4">
        <Dropdown id="district" :filter="true" :showClear="true" v-model="district" :options="districts" @change="selectDistrict" optionLabel="districtName" optionValue="districtCode" placeholder=" - Chọn Quận/Huyện -" style="text-align: center">
        </Dropdown>
      </div>
      <div class="p-field p-col-12 p-sm p-md-4">
        <Dropdown id="ward" :filter="true" :showClear="true" v-model="ward" :options="wards" optionLabel="wardName" optionValue="wardCode" placeholder=" - Chọn Phường/Xã -" style="text-align: center">
        </Dropdown>
      </div>
    </div>
<!--    <div class="p-field p-col-12 p-sm p-md-4">-->
    <Button label="Thêm" icon="pi pi-user-plus" :disabled="!valid()" @click="add()"  style="margin-right: 20px"/>

<!--    </div>-->
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
import {ThongTinCreate} from "@/models/thongTinCreate";
import {DiaDiemDetail} from "@/models/diaDiemDetail";
import {Ongtiem} from "@/models/ongtiem";
import moment from 'moment';

export default {
  setup(props){
    const toast = useToast();
    const provinces = ref({} as Province[]);
    const districts = ref({} as District[]);
    const wards = ref({} as Ward[]);
    const province = ref(48);
    const district = ref(0);
    const ward = ref(0);
    const thongTinCreate = ref({} as ThongTinCreate);
    const gioiTinh = ref([
      {value: "Nam"},
      {value: "Nữ"},
    ]);
    const thongtinDoiTuong = ref([] as ThongTinDoiTuong[]);
    const confirm = useConfirm();
    const maDoiTuong = ref("");
    const idDiaDiem = ref(0);
    const listDiaDiem = ref([] as DiaDiemDetail[]);
    const listOngTiem = ref([] as Ongtiem[]);

    const toTimestamp = (strDate) => {
      const dt = Date.parse(strDate);
      return dt / 1000;
    }

    const formatDateTime = (date) => {
      return moment(String(date)).format('YYYY-MM-DD');
    };
    const time = ref(new Date);
    const timeSelect = ref(new Date);
    VaccinationRepository.getThongTinDoiTuong(time.value.getTime()/1000)
            .then(response => {
              thongtinDoiTuong.value = response.data;
            })
            .catch(err => {
              toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail:err.response.data,
                life: 2500
              });
            })
            .finally(()=>{
            });

    VaccinationRepository.getListDiaDiem(time.value.getTime()/1000)
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

    const getListOngTiem = () => {
      VaccinationRepository.getListMaOngTiem(time.value.getTime()/1000, idDiaDiem.value)
      .then((response) => {
        listOngTiem.value = response.data;
        console.log("###############$$$$$$$$$$$$$$$$$$$$$$ listOngTiem: " + JSON.stringify(listOngTiem.value));
      })
      .catch(err => {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail:err.response.data,
          life: 2500
        })});
    }
    // if(!(store.state.permission == 'mster')){
    //   router.push({
    //     name: 'home'
    //   });
    // }
    VaccinationRepository.getProvince()
            .then((response) => {
              provinces.value = response.data;
            })
            .catch();

    const selectProvince = () => {
      VaccinationRepository.getDistrict(province.value)
              .then((response) => {
                  districts.value = response.data;
                  wards.value = [];
              })
              .catch();
    };
    selectProvince();
    const selectDistrict = () => {

      VaccinationRepository.getWard(district.value)
              .then((response) => {
                  wards.value = response.data;
              })
              .catch();
    };
    const add = () => {
      thongTinCreate.value.thanhPho = province.value;
      thongTinCreate.value.quan = district.value;
      thongTinCreate.value.phuong = ward.value;
      thongTinCreate.value.ngaySinh = formatDateTime(timeSelect.value);
      console.log("##################$$$$$$$$$$$$$$$$ update thongTinUpdate ngaysinh: " + JSON.stringify(thongTinCreate.value.ngaySinh));
      thongtinDoiTuong.value.filter(x => {
        if(x.maDoiTuong == thongTinCreate.value.maDoiTuong){
          thongTinCreate.value.maDoiTuong = x.maDoiTuong;
          thongTinCreate.value.ghiChu = x.ghiChu;
        }
      });

      console.log("##################$$$$$$$$$$$$$$$$ update thongTinUpdate: " + JSON.stringify(thongTinCreate.value));
      VaccinationRepository.createThongTin(thongTinCreate.value)
                .then(response => {
                  console.log("##################$$$$$$$$$$$$$$$$ update thongTinUpdate 222222: " + JSON.stringify(thongTinCreate.value));
                  toast.add({
                    severity: 'success',
                    summary: 'Thành Công',
                    detail: 'Cập nhật thông tin tiêm chủng thành công.',
                    life: 2500
                  });
                  const temp = ref({} as ThongTinCreate);
                  thongTinCreate.value = temp.value;
                })
                .catch(err => {
                  toast.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail:err.response.data,
                    life: 2500
                  });
                })
                .finally(()=>{
                });
    };

    const valid = () => {
        return thongTinCreate.value.maDoiTuong&&
                province.value&&
                district.value&&
                ward.value&&
                thongTinCreate.value.gioiTinh&&
                thongTinCreate.value.ten&&
                thongTinCreate.value.soDienThoai&&
                thongTinCreate.value.diaChiCuThe&&
                thongTinCreate.value.maOngTiem&&
                idDiaDiem.value&&
                timeSelect.value;
      }

    return {
      thongTinCreate,
      gioiTinh,
      district,
      districts,
      ward,
      wards,
      province,
      provinces,
      selectDistrict,
      selectProvince,
      add,
      thongtinDoiTuong,
      maDoiTuong,
      valid,
      listDiaDiem,
      idDiaDiem,
      getListOngTiem,
      listOngTiem,
      timeSelect,
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