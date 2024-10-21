<template>
  <div class="on_pn">
    <h2 class="tt_page"><span>Thêm tài khoản nhân viên</span></h2>  
    <div class="on_dskb">
      <div class="wrap">
        <div class="on_choose">
          <div class="on_it">
            <div class="it_3">
            <label>Chọn tài khoản:</label>
            <Dropdown v-model="customer" :options="listCustomer" optionLabel="name" placeholder="Chọn tài khoản" :filter="true">
            </Dropdown>
          </div>
          <div class="it_3 it_ccc">
            <label>Chọn khoa/phòng</label>
          <Dropdown v-model="teamId" :options="teams" optionLabel="name" optionValue="code" placeholder="Chọn khoa/ phòng" :filter="true">
          </Dropdown>
          </div>
          <div class="it_3 it_bk">
          <Button label="Đăng ký" icon="pi pi-plus-circle" iconPos="left" @click="doRegister()" />
          </div>

          </div>
        </div>
        
      </div>
      
    </div>
  </div> 

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
                    name: 'showlistemployee'
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
