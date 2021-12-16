<template>
  <ConfirmPopup></ConfirmPopup>
  <Panel header="Cập nhật thông tin tiêm chủng">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Họ và tên</label>
        <InputText id="fullname" type="text" v-model="thongTinUpdate.ten" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Số điện thoại</label>
        <InputText id="username" type="text" v-model="thongTinUpdate.soDienThoai" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Địa chỉ</label>
        <InputText id="username" type="text" v-model="thongTinUpdate.diaChiCuThe" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Giới tính</label>
        <Dropdown id="sex" v-model="thongTinUpdate.gioiTinh" :options="gioiTinh" optionLabel="value" optionValue="value">
        </Dropdown>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>CMND/CCCD/Passport</label>
        <InputText id="cmnd" type="text" v-model="thongTinUpdate.cmnd" style="text-align: center"/>
      </div>
      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
        <label>Mã đối tượng được lấy mẫu</label>
        <Dropdown id="maDoiTuong" :filter="true" :showClear="true" v-model="thongTinUpdate.maDoiTuong" :options="thongtinDoiTuong" optionLabel="maDoiTuong" optionValue="maDoiTuong" placeholder=" - Chọn mã đối tượng -" style="text-align: center">
        </Dropdown>
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
    <Button label="Cập nhật" icon="pi pi-user-edit" :disabled="!valid()" @click="update()"  style="margin-right: 20px"/>


    <Button label="Xoá" class="p-button-danger"  icon="pi pi-user-minus" iconPos="left" @click="del($event)" />
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

export default {
  props: {
    id: String,
  },
  setup(props){
    const toast = useToast();
    const provinces = ref({} as Province[]);
    const districts = ref({} as District[]);
    const wards = ref({} as Ward[]);
    const province = ref(48);
    const district = ref(0);
    const ward = ref(0);
    const thongTinUpdate = ref({} as ThongTinUpdate);
    const gioiTinh = ref([
      {value: "Nam"},
      {value: "Nữ"},
    ]);
    const thongtinDoiTuong = ref([] as ThongTinDoiTuong[]);
    const confirm = useConfirm();
    const maDoiTuong = ref("");


    const toTimestamp = (strDate) => {
      const dt = Date.parse(strDate);
      return dt / 1000;
    }

    VaccinationRepository.getThongTin(props.id)
            .then((response) => {
              thongTinUpdate.value = response.data;
              province.value = thongTinUpdate.value.thanhPho;
              district.value = thongTinUpdate.value.quan;
              ward.value = thongTinUpdate.value.phuong;

              VaccinationRepository.getThongTinDoiTuongById(thongTinUpdate.value.id)
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
              selectProvince();
              selectDistrict();
            })
            .catch();
    const store = useStore();

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

    const selectDistrict = () => {

      VaccinationRepository.getWard(district.value)
              .then((response) => {
                  wards.value = response.data;
              })
              .catch();
    };
    const update = () => {
      thongTinUpdate.value.thanhPho = province.value;
      thongTinUpdate.value.quan = district.value;
      thongTinUpdate.value.phuong = ward.value;
      thongtinDoiTuong.value.filter(x => {
        if(x.maDoiTuong == thongTinUpdate.value.maDoiTuong){
          thongTinUpdate.value.maDoiTuong = thongTinUpdate.value.maDoiTuong;
          thongTinUpdate.value.ghiChu = x.ghiChu;
        }
      })
      VaccinationRepository.updateThongTin(thongTinUpdate.value)
                .then(response => {
                  toast.add({
                    severity: 'success',
                    summary: 'Thành Công',
                    detail: 'Cập nhật thông tin tiêm chủng thành công.',
                    life: 2500
                  });
                  router.push({
                    name: 'home',
                  });
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
    const del = (event) => {
      confirm.require({
        target: event.currentTarget,
        message: 'Bạn có chắc muốn xoá tài khoản này không?',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        rejectClass: 'p-button-outlined',
        acceptLabel: 'Đồng ý',
        rejectLabel: 'Huỷ',
        accept: () => {
          VaccinationRepository.deleteThongTin(thongTinUpdate.value.id)
                  .then(response => {
                    toast.add({severity:'info', summary:'Confirmed', detail:'Thông tin tiêm chủng đã được xoá thành công', life: 3000});
                    router.push({
                      name: 'home',
                    });
                  })
                  .finally(()=>{
                  });
        },
        reject: () => {
        }
      });
    };

    const valid = () => {
        return thongTinUpdate.value.maDoiTuong&&
                province.value&&
                district.value&&
                ward.value&&
                thongTinUpdate.value.gioiTinh&&
                thongTinUpdate.value.ten&&
                thongTinUpdate.value.cmnd&&
                thongTinUpdate.value.soDienThoai&&
                thongTinUpdate.value.diaChiCuThe;
      }

    return {
      thongTinUpdate,
      gioiTinh,
      district,
      districts,
      ward,
      wards,
      province,
      provinces,
      selectDistrict,
      selectProvince,
      update,
      del,
      thongtinDoiTuong,
      maDoiTuong,
      valid,
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