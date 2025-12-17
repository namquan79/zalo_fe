<template>
  <Accordion :activeIndex="0">
    <AccordionTab header="Thêm nhóm">
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Tên nhóm</label>
          <InputText id="firstname" type="text" v-model="group.groupName" placeholder="Tên nhóm" />
        </div>
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Tạo nhóm</label>
          <BaseButton label="Tạo" icon="pi pi-plus-circle" @click="createGroup" :disabled="!group.groupName" />

        </div>
      </div>
    </AccordionTab>
    <AccordionTab header="Thêm nhân viên vào nhóm">
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Chọn tài khoản</label>
          <div class="card flex justify-content-center">
            <Dropdown v-model="member.idZalo" :options="listCustomer" optionLabel="name" optionValue="id"
              placeholder="Chọn tài khoản" :filter="true" class="w-full md:w-14rem">
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <img v-if="slotProps.option.imageUrl" :src=slotProps.option.imageUrl
                    style="width: 20px; margin-right: 3px" />
                  <label style="width: 20px">{{ slotProps.option.name }}</label>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Chọn nhóm</label>
          <Dropdown v-model="member.idGroup" :options="listGroup" optionLabel="groupName" optionValue="id"
            placeholder="Chọn nhóm" :filter="true" @change="getListMemberInGroup(member.idGroup)">
          </Dropdown>
        </div>
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Thêm thành viên</label>
          <BaseButton label="Thêm" icon="pi pi-plus-circle" @click="createMember"
            :disabled="!member.idZalo || !member.idGroup" />
        </div>
      </div>
      <Panel header="Danh sách nhân viên trong nhóm">
        <div class="p-fluid">
          <DataTable :value="listMember" :paginator="true" stripedRows :rows="10" :rowsPerPageOptions="[10, 25, 50]"
            :rowHover="true"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :globalFilterFields="['zaloName', 'groupName']"
            currentPageReportTemplate="Có tất cả {totalRecords} nhân viên" v-model:filters="filters">
            <Column field="zaloName" header="Tên" sortable></Column>
            <Column field="groupName" header="Nhóm" sortable></Column>
            <Column header="Tuỳ chọn">
              <template #body="slotProps">
                <!--            <router-link style="text-decoration: none !important;" :to="{ name: 'registerpage'}" >-->
                <div class="p-fluid p-formgrid p-grid">
                  <div class="p-field p-col-12 p-md-12">
                    <Button type="button" class="p-button-danger" label="Xoá" icon="pi pi-trash"
                      @click="deleteMember(slotProps.data.id)"></Button>
                  </div>
                </div>
                <!--            </router-link>-->
              </template>
            </Column>
            <template #paginatorLeft>
            </template>
            <template #empty>
              Không có thông tin nhân viên.
            </template>
          </DataTable>
          <!--        </div>-->
        </div>
        <!--    </div>-->
      </Panel>
    </AccordionTab>
    <AccordionTab header="Thêm quản lý của nhóm">
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Chọn tài khoản</label>
          <div class="card flex justify-content-center">
            <Dropdown v-model="manager.idZalo" :options="listCustomer" optionLabel="name" optionValue="id"
              placeholder="Chọn tài khoản" :filter="true" class="w-full md:w-14rem">
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <img v-if="slotProps.option.imageUrl" :src=slotProps.option.imageUrl
                    style="width: 20px; margin-right: 3px" />
                  <label style="width: 20px">{{ slotProps.option.name }}</label>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Chọn nhóm</label>
          <Dropdown v-model="manager.idGroup" :options="listGroup" optionLabel="groupName" optionValue="id"
            placeholder="Chọn nhóm" :filter="true" @change="getListManagerOfGroup(manager.idGroup)">
          </Dropdown>
        </div>
        <div class="p-field p-col p-col-12 p-md-3 p-lg-3">
          <label>Thêm quản lý</label>
          <BaseButton label="Thêm" icon="pi pi-plus-circle" @click="createManager"
            :disabled="!manager.idZalo || !manager.idGroup" />
        </div>
      </div>
      <Panel header="Danh sách quản lý nhóm">
        <div class="p-fluid">
          <DataTable :value="listManager" :paginator="true" stripedRows :rows="10" :rowsPerPageOptions="[10, 25, 50]"
            :rowHover="true"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :globalFilterFields="['zaloName', 'groupName']" currentPageReportTemplate="Có tất cả {totalRecords} quản lý"
            v-model:filters="filters">
            <Column field="zaloName" header="Tên" sortable></Column>
            <Column field="groupName" header="Nhóm" sortable></Column>
            <Column header="Tuỳ chọn">
              <template #body="slotProps">
                <!--            <router-link style="text-decoration: none !important;" :to="{ name: 'registerpage'}" >-->
                <div class="p-fluid p-formgrid p-grid">
                  <div class="p-field p-col-12 p-md-12">
                    <Button type="button" class="p-button-danger" label="Xoá" icon="pi pi-trash"
                      @click="deleteManager(slotProps.data.id)"></Button>
                  </div>
                </div>
                <!--            </router-link>-->
              </template>
            </Column>
            <template #paginatorLeft>
            </template>
            <template #empty>
              Không có thông tin quản lý.
            </template>
          </DataTable>
          <!--        </div>-->
        </div>
        <!--    </div>-->
      </Panel>
    </AccordionTab>
  </Accordion>
</template>

<script lang="ts">

import BaseButton from "@/components/base/BaseButton.vue";
import { computed, ref } from 'vue'
import AuthRepository from '@/services/AuthRepository'
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router'
import { Register } from "../models/register";
import { useStore } from "vuex";
import TeamRepository from "../services/TeamRepository";
import { Team } from "@/models/team.models";
import { ListCustomer } from "@/models/listCustomer";
import ZaloRepository from "@/services/ZaloRepository";
import { EmployeeCreate } from "@/models/employeeCreate";
import zaloRepository from "@/services/ZaloRepository";
import { GroupCreate } from "@/models/groupCreate";
import { Group } from "@/models/group";
import { MemberInGroupCreate } from "@/models/memberInGroupCreate";
import { MemberInGroup } from "@/models/memberInGroup";
import { ManagerOfGroupCreate } from "@/models/managerOfGroupCreate";
import { ManagerOfGroup } from "@/models/managerOfGroup";

export default {

  components: { BaseButton },

  setup() {
    const router = useRouter();
    const register = ref({} as Register);
    const toast = useToast();
    const store = useStore();
    const error = ref(null);
    const group = ref({} as GroupCreate);
    const listGroup = ref([] as Group[]);
    const member = ref({} as MemberInGroupCreate);
    const listMember = ref([] as MemberInGroup[]);
    const manager = ref({} as ManagerOfGroupCreate);
    const listManager = ref([] as ManagerOfGroup[]);
    const listCustomer = ref([] as ListCustomer[]);

    // if(!(!!document.cookie)) {
    //   router.push({
    //     name: 'login'
    //   });
    // }

    const getListCustomer = () => {
      ZaloRepository.getListCustomerWithOutEmployee()
        .then((response) => {
          listCustomer.value = response.data;
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Lỗi không tìm thấy danh sách tài khoản',
            life: 2000
          });
        });
    }
    getListCustomer();
    const getList = () => {
      ZaloRepository.listGroup()
        .then((response) => {
          listGroup.value = response.data;
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Lỗi khi tải danh sách khách hàng',
            life: 2000
          });
        });
    }
    getList();
    const createGroup = () => {
      ZaloRepository.createGroup(group.value)
        .then((response) => {
          toast.add({
            severity: 'success',
            summary: 'Tạo nhóm',
            detail: 'Tạo nhóm thành công',
            life: 2000
          });
          getList();
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: err.response.data,
            life: 2000
          });
        });
    }

    const createMember = () => {
      listCustomer.value.forEach(x => {
        if (x.id == member.value.idZalo) member.value.zaloName = x.name;
      })
      listGroup.value.forEach(x => {
        if (x.id == member.value.idGroup) member.value.groupName = x.groupName;
      })
      ZaloRepository.createMemberInGroup(member.value)
        .then((response) => {
          toast.add({
            severity: 'success',
            summary: 'Thêm thành viên',
            detail: 'Thêm thành viên vào nhóm thành công',
            life: 2000
          });
          getListMemberInGroup(member.value.idGroup);
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: err.response.data,
            life: 2000
          });
        });
    }

    const deleteMember = (id: number) => {
      ZaloRepository.deleteMemberInGroup(id)
        .then((response) => {
          toast.add({
            severity: 'success',
            summary: 'Xoá thành viên',
            detail: 'Xóa thành viên khỏi nhóm thành công',
            life: 2000
          });
          listMember.value = listMember.value.filter(x => x.id != id);
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: err.response.data,
            life: 2000
          });
        });
    }

    const getListMemberInGroup = (id: number) => {
      listMember.value = [];
      ZaloRepository.listMemberInGroup(id)
        .then((response) => {
          listMember.value = response.data;
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: err.response.data,
            life: 2000
          });
        });
    }
    const createManager = () => {
      listCustomer.value.forEach(x => {
        if (x.id == manager.value.idZalo) manager.value.zaloName = x.name;
      })
      listGroup.value.forEach(x => {
        if (x.id == manager.value.idGroup) manager.value.groupName = x.groupName;
      })
      ZaloRepository.createManagerOfGroup(manager.value)
        .then((response) => {
          toast.add({
            severity: 'success',
            summary: 'Thêm quản lý',
            detail: 'Thêm quản lý vào nhóm thành công',
            life: 2000
          });
          getListManagerOfGroup(manager.value.idGroup);
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: err.response.data,
            life: 2000
          });
        });
    }

    const deleteManager = (id: number) => {
      ZaloRepository.deleteManagerOfGroup(id)
        .then((response) => {
          toast.add({
            severity: 'success',
            summary: 'Xoá quản lý',
            detail: 'Xóa quản lý khỏi nhóm thành công',
            life: 2000
          });
          listManager.value = listManager.value.filter(x => x.id != id);
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: err.response.data,
            life: 2000
          });
        });
    }

    const getListManagerOfGroup = (id: number) => {
      listManager.value = [];
      ZaloRepository.listManagerOfGroup(id)
        .then((response) => {
          listManager.value = response.data;
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: err.response.data,
            life: 2000
          });
        });
    }

    return {
      group,
      createGroup,
      member,
      listMember,
      manager,
      listManager,
      listGroup,
      createManager,
      createMember,
      deleteManager,
      deleteMember,
      getListManagerOfGroup,
      getListMemberInGroup,
      listCustomer
    }
  }
}

</script>
