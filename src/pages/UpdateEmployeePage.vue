<template>
<Panel header="Chỉnh sửa tài khoản nhân viên">
  <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Họ và tên:</label>
          <InputText id="username" type="text" v-model="employee.fullName" readonly/>
        </div>
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Zalo Id:</label>
          <InputText id="zaloid" type="text" v-model="employee.zaloId" readonly/>
        </div>
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Chọn khoa/phòng</label>
          <Dropdown v-model="employee.teamCode" :options="teams" optionLabel="name" optionValue="code" placeholder="Chọn khoa/ phòng" :filter="true">
          </Dropdown>
        </div>
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Cập nhật</label>
          <Button label="Cập nhật thông tin" icon="pi pi-plus-circle" iconPos="left" @click="update()" />
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
import {Employee} from "@/models/employee";
import {EmployeeUpdate} from "@/models/employeeUpdate";

export default {
  props: {
    id: String,
  },
  setup(props){
    const router = useRouter();
    const toast = useToast();
    const store = useStore();
    const employee = ref({} as Employee);
    const employeeUpdate = ref({} as EmployeeUpdate);
    const teams = ref([] as Team[]);

    const employeeCreate = ref({} as EmployeeCreate);

    // if(!(store.state.permission == 'mster')){
    //   router.push({
    //     name: 'home'
    //   });
    // }
  ZaloRepository.employeeById(props.id)
      .then((response) => {
        employee.value = response.data;
      })
      .catch(err => {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail:'Lỗi khi tải danh sách khách hàng',
          life: 2000
        });
      });

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

    const update = () => {
      employeeUpdate.value.zaloId = employee.value.zaloId ;
      employeeUpdate.value.fullName = employee.value.fullName;
      employeeUpdate.value.teamCode = employee.value.teamCode;
      employeeUpdate.value.id = employee.value.id;
        zaloRepository.updateEmployee(employeeUpdate.value)
                .then((response) => {
                  toast.add({
                    severity: 'success',
                    summary: 'Đăng ký',
                    detail: 'Cập nhật thông tin nhân viên thành công',
                    life: 2000
                  });
                  // router.push({
                  //   name: 'home'
                  // });
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
      update,
      employee,
      teams
    }
  }
}

</script>
