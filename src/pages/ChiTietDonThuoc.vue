<template>
  <Panel header="Thông tin chi tiết đơn thuốc(được lưu trữ)">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
<!--        <Fieldset>-->
<!--          <template #legend>-->
<!--            Mã đơn thuốc: {{donThuoc.ma_don_thuoc}}-->
<!--          </template>-->
        <Panel>
          <template #header>
            Mã đơn thuốc: {{donThuoc.ma_don_thuoc}}
          </template>
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Họ và tên</label>
              <InputText id="fullname" type="text" v-model="donThuoc.ten_benh_nhan" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Ngày sinh</label>
              <InputText id="birthday" type="text" v-model="donThuoc.ngay_sinh_benh_nhan" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Cân nặng</label>
              <InputText id="weight" type="text" v-model="donThuoc.can_nang" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Giới tính</label>
    <!--          <InputText id="sex" type="text" v-model="donThuoc.gioi_tinh" style="text-align: center"/>-->
              <div class="p-field p-col-12 p-sm-12 p-md-12">
              <input type="radio" id="Nam" name="gioitinh" value="2" v-model="donThuoc.gioi_tinh" readonly/>
              <label for="noitru">&ensp;Nam&emsp;&emsp;&emsp;</label>
              <!--                            <div class="p-col-2 p-md">-->
              <!--                            </div>-->
              <input type="radio" id="Nu" name="gioitinh" value="3" v-model="donThuoc.gioi_tinh" readonly/>
              <label for="ngoaitru">&ensp;Nữ</label>
              </div>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Mã số BHYT(nếu có)</label>
              <InputText id="byht" type="text" v-model="donThuoc.ma_so_the_bao_hiem_y_te" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>CMT/CCCD (nếu có)</label>
              <InputText id="cmnd" type="text" v-model="donThuoc.cmnd" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Mã định danh y tế</label>
              <InputText id="mayte" type="text" v-model="donThuoc.ma_dinh_danh_y_te" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-3 p-lg-3">
              <label>Số điện thoại</label>
              <InputText id="dodienthoai" type="text" v-model="donThuoc.so_dien_thoai_nguoi_kham_benh" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-6 p-lg-6">
              <label>Mã định danh công dân</label>
              <InputText id="madinhdanh" type="text" v-model="donThuoc.ma_dinh_danh_cong_dan" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-6 p-lg-6">
              <label>Địa chỉ liên hệ *</label>
              <InputText id="diachi" type="text" v-model="donThuoc.dia_chi" style="text-align: center"/>
            </div>
          </div>
    <!--    <Panel header="">-->
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-md-12 p-lg-12">
            </div>
            <div class="p-field p-col-12 p-md-12 p-lg-12">
            <label>Chẩn đoán:</label>
            <DataTable :value="chuanDoan" showGridlines responsiveLayout="scroll">
              <Column field="ma_chan_doan" header="Mã"></Column>
              <Column field="ten_chan_doan" header="Chẩn đoán"></Column>
              <Column field="ket_luan" header="Kết luận"></Column>
            </DataTable>
            </div>
          </div>
      <!--    </Panel>-->
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-md-12 p-lg-12">
            </div>
            <div class="p-field p-col-12 p-md-12 p-lg-12">
              <label>Lưu ý</label>
              <InputText id="luuy" type="text" v-model="donThuoc.luu_y" style="text-align: center"/>
            </div>
            <div class="p-field p-col-12 p-md-12 p-lg-12">
            </div>
            <div class="p-field p-col-12 p-md-8 p-lg-6">
              <label>Hình thức điều trị: </label>
              <input type="radio" id="noitru" name="hinhthuc" value="1" v-model="donThuoc.hinh_thuc_dieu_tri" readonly/>
              <label for="noitru">&ensp;Nội trú&emsp;&emsp;&emsp;</label>
              <!--                            <div class="p-col-2 p-md">-->
              <!--                            </div>-->
              <input type="radio" id="ngoaitru" name="hinhthuc" value="2" v-model="donThuoc.hinh_thuc_dieu_tri" readonly/>
              <label for="ngoaitru">&ensp;Ngoại trú</label>
      <!--        <radio-button id="luuy" type="text" v-model="register.cchn" style="text-align: center"/>-->
      <!--        <radio-button id="luuy" type="text" v-model="register.cchn" style="text-align: center"/>-->
            </div>
            <div class="p-fluid p-formgrid p-grid">
              <div class="p-field p-col-12 p-md-12 p-lg-12">
              </div>
            </div>
          </div>
<!--          <div class="p-fluid p-formgrid p-grid">-->
            <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
              <div class="card">
              <label>Thuốc điều trị:</label>
              <DataTable :value="thongtin" showGridlines responsiveLayout="scroll">
                <Column field="" header="Mã thuốc"></Column>
                <Column field="biet_duoc" header="Hoạt chất"></Column>
                <Column field="ten_thuoc" header="Tên thuốc"></Column>
                <Column field="don_vi_tinh" header="ĐVT"></Column>
                <Column field="so_luong" header="SL"></Column>
                <Column field="cach_dung" header="Cách dùng"></Column>
                <Column field="" header="Đã bán"></Column>
              </DataTable>
              </div>
          </div>
          <div class="p-field p-col-12 p-md-12 p-lg-12">
          </div>
<!--          </div>-->
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-12 p-lg-12">
            <label>*Lời dặn:</label>
            <InputText id="loidan" type="text" v-model="donThuoc.loi_dan" style="text-align: center"/>
          </div>
          <div class="p-field p-col-12 p-md-6 p-lg-6">
          </div>
        <div class="p-field p-col-12 p-md-6 p-lg-6">
          <div style="alignment: right">
            <label>{{chitiet.gio}} Ngày {{chitiet.ngay}}</label>
            <br>
            <label style="font-weight:bold">Bác sĩ: {{chitiet.bac_si}}</label>
          </div>
        </div>
        </div>
    <!--      <Button v-else label="Đăng ký" icon="pi pi-plus-circle" iconPos="left" disabled="disabled" />-->
<!--        </Fieldset>-->
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
import {BacSiCreate} from "@/models/bacSiCreate";
import DonThuocRepository from "@/services/DonThuocRepository";
import {DonThuocChiTiet} from "@/models/donThuocChiTiet";
import {ChuanDoan} from "@/models/chuanDoan";
import {ThongTinThuoc} from "@/models/ThongTinThuoc";
import {ChiTietThongTin} from "@/models/chiTietThongTin";

export default {
  props: {
    id: String,
  },

  setup(props){
    const router = useRouter();
    const donThuoc = ref({} as DonThuocChiTiet);
    const toast = useToast();
    const store = useStore();
    const error = ref(null);
    const chuanDoan = ref([] as ChuanDoan[]);
    const thongtin = ref([] as ThongTinThuoc[]);
    const chitiet = ref({} as ChiTietThongTin);

    // if(!(store.state.permission == 'admin')){
    //   router.push({
    //     name: 'home'
    //   });
    // }
    // if(!(!!store.state.token)){
    //   router.push({
    //     name: 'login'
    //   });
    // }
      DonThuocRepository.donThuocChiTiet(props.id)
          .then((response) => {
            donThuoc.value = response.data;
            chuanDoan.value = donThuoc.value.chan_doan;
            thongtin.value = donThuoc.value.thong_tin_don_thuoc;
          })
          .catch(err => {
            toast.add({
              severity: 'error',
              summary: 'Lỗi',
              detail:err.response.data,
              life: 4000
            });
          });
    DonThuocRepository.chiTietTT(props.id)
        .then((response) => {
          chitiet.value = response.data;
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
      donThuoc,
      chuanDoan,
      thongtin,
      chitiet,
      error,
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