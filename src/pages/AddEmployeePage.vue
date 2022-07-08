<template>
<Panel header="Thêm tài khoản nhân viên vào khoa phòng">
  <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Chọn tài khoản</label>
          <Dropdown v-model="customer" :options="listCustomer" optionLabel="name" placeholder="Chọn tài khoản" :filter="true">
          </Dropdown>
        </div>
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Chọn khoa/phòng</label>
          <Dropdown v-model="teamId" :options="teams" optionLabel="name" optionValue="code" placeholder="Chọn khoa/ phòng" :filter="true">
          </Dropdown>
        </div>
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Đăng ký</label>
          <Button label="Đăng ký" icon="pi pi-plus-circle" iconPos="left" @click="doRegister()" />
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
import TeamRepository from "../services/TeamRepository";
import {Team} from "@/models/team.models";
import {ListCustomer} from "@/models/listCustomer";
import ZaloRepository from "@/services/ZaloRepository";
import {EmployeeCreate} from "@/models/employeeCreate";
import zaloRepository from "@/services/ZaloRepository";

export default {

  setup(){
    const router = useRouter();
    const register = ref({} as Register);
    const toast = useToast();
    const store = useStore();
    const error = ref(null);
    const customer = ref({} as ListCustomer);
    const teamId = ref("");
    const listCustomer = ref([] as ListCustomer[]);
    const teams = ref([] as Team[]);

    const employeeCreate = ref({} as EmployeeCreate);

    const valid = computed(()=> register.value.password && register.value.username && register.value.team && register.value.fullname && register.value.address);

    // if(!(store.state.permission == 'mster')){
    //   router.push({
    //     name: 'home'
    //   });
    // }
const getList = () => {
  ZaloRepository.getListCustomerWithOutEmployee()
      .then((response) => {
        listCustomer.value = response.data;
      })
      .catch(err => {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail:'Lỗi khi tải danh sách khách hàng',
          life: 2000
        });
      });
}
    getList();

    TeamRepository.getTeams()
        .then((response) => {
          teams.value = response.data;
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail:'Lỗi khi tải danh sách khoa phòng',
            life: 2000
          });
        });

    const doRegister = () => {
      employeeCreate.value.zaloId = customer.value.id;
      employeeCreate.value.fullName = customer.value.name;
      employeeCreate.value.teamCode = teamId.value;
        zaloRepository.createEmployee(employeeCreate.value)
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
    }

    return {
      register,
      doRegister,
      valid,
      teams,
      error,
      listCustomer,
      customer,
      teamId,
    }
  }
}

</script>
