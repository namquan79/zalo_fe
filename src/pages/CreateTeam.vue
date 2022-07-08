<template>
        <Panel header="Thêm khoa phòng">
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
          <label>Tên khoa/phòng</label>
          <InputText id="username" type="text" v-model="register.username" />
        </div>
        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
          <label>Mã</label>
          <Password id="password" v-model="register.password" toggleMask :feedback="true" />
        </div>
        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
          <label>Họ và tên</label>
          <InputText id="fullname" type="text" v-model="register.fullname" />
        </div>
<!--        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">-->
<!--          <label>Chọn đơn vị</label>-->
<!--          <Dropdown id="donvi" v-model="register.companyCode" :options="donVi" optionLabel="ten" optionValue="ma" placeholder="Vui lòng chọn đơn vị">-->
<!--          </Dropdown>-->
<!--&lt;!&ndash;          <InputText id="fullname" type="text" v-model="register.companyCode" />&ndash;&gt;-->
<!--        </div>-->
        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
          <label>Chọn quyền hạn</label>
          <Dropdown id="permission" v-model="register.permission" :options="accPermission" optionLabel="label" optionValue="value" placeholder="Vui lòng chọn quyền hạn của tài khoản ...">
          </Dropdown>
        </div>
      </div>
      <Button v-if="valid" label="Đăng ký" icon="pi pi-plus-circle" iconPos="left" @click="doRegister()" />
      <Button v-else label="Đăng ký" icon="pi pi-plus-circle" iconPos="left" disabled="disabled" />
        </Panel>
</template>

<script lang="ts">

import { computed, ref } from 'vue'
import AuthRepository from '@/services/AuthRepository'
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router'
import {Register} from "../models/register";
import {useStore} from "vuex";
import TeamRepository from "../services/TeamRepository";
import {Team} from "@/models/team.models";
import {RegisterUser} from "@/models/registerUser";
import {AccountPermission} from "@/models/accountPermission";
import {DonViCreate} from "@/models/donViCreate";

export default {

  setup(){
    const router = useRouter();
    const register = ref({} as RegisterUser);
    const toast = useToast();
    const store = useStore();
    const error = ref(null);

    const valid = computed(()=> register.value.password && register.value.username && register.value.fullname );

    console.log("@@@############### debug permission: " + store.state.permission);
    if(!(store.state.permission == 'admin')){
      router.push({
        name: 'home'
      });
    }
    const teams = ref({} as Team[]);

    const accPermission = ref([{
      label: "Quản lý" , value: "admin"
    },
      {
        label: "Nhân viên" , value: "user"
      }]);


    TeamRepository.getTeams()
            .then((response) => {
              teams.value = response.data;
            })
            .catch();

    const doRegister = () => {
      if(register.value.password.length < 6)
      {
        toast.add({
          severity: 'error',
          summary: 'Thất bại',
          detail: 'Mật khẩu không hợp lệ, vui lòng nhập lại mật khẩu',
          life: 2000
        });
      }
      else {
        AuthRepository.registerUser(register.value)
                .then((response) => {
                  toast.add({
                    severity: 'success',
                    summary: 'Đăng ký',
                    detail: 'Đăng ký thành viên thành công vào hệ thống',
                    life: 2000
                  });
                  router.push({
                    name: 'home'
                  });
                })
                .catch(err => {
                  toast.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail:err.response.data,
                    life: 2000
                  });
                });
      };
    }

    return {
      register,
      doRegister,
      valid,
      teams,
      accPermission,
      error,
      // donVi,
    }
  }
}

</script>
