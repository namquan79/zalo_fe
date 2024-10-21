<template>
  <!--  </TabPanel>-->
<div class="on_pn">
  <h2 class="tt_page"><span>Danh sách nhân viên hỗ trợ</span></h2>  
  <div class="on_dsnv">
    <div class="p-fluid">
      <DataTable
              :value="listEmployee" :paginator="true" stripedRows
              :rows="10" :rowsPerPageOptions="[10,25,50]" :rowHover="true"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :globalFilterFields="['fullName','zaloId','teamCode']"
              currentPageReportTemplate="Có tất cả {totalRecords} người lấy mẫu"
              v-model:filters="filters"
      >
        <Column field="fullName" header="Họ và tên" sortable></Column>
        <Column field="zaloId" header="Zalo Id"></Column>
        <Column field="teamCode" header="Khoa/Phòng " sortable></Column>
        <Column header="Tuỳ chọn">
          <template #body="slotProps">
            <!--            <router-link style="text-decoration: none !important;" :to="{ name: 'registerpage'}" >-->
            <div class="p-fluid p-formgrid p-grid">
              <div class="p-field p-col-5 p-md-5">
                <Button type="button" class="p-button-secondary" label="Cập nhật"  icon="pi pi-user-edit" @click="openLink(slotProps.data.id)"></Button>
              </div>
              <div class="p-field p-col-5 p-md-5">
                <Button type="button" class="p-button-danger" label="Xoá"  icon="pi pi-trash" @click="deleteEmployee(slotProps.data.id)"></Button>
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
  </div>
</div>
</template>

<script lang="ts">

  import { computed, ref } from 'vue'
  import moment from 'moment';
  import {FilterMatchMode, FilterOperator} from "primevue/api";
  import {ThongTin} from "@/models/thongTin";
  import router from "@/router";
  import {useToast} from "primevue/usetoast";
  import {useStore} from "vuex";
  import {Ongtiem} from "@/models/ongtiem";
  import {Employee} from "@/models/employee";
  import ZaloRepository from "@/services/ZaloRepository";
  import {Team} from "@/models/team.models";
  import TeamRepository from "@/services/TeamRepository";

  export default {
    setup() {
      const toast = useToast();
      const store = useStore();
      const listEmployee = ref([] as Employee[]);
      const teams = ref([] as Team[]);

      const loadData = () => {
        TeamRepository.getTeams()
            .then((response) => {
              teams.value = response.data;
              ZaloRepository.getListEmployee()
                  .then((response) => {
                    listEmployee.value = response.data;
                    listEmployee.value.forEach(x => {teams.value.forEach(y => {if(y.code == x.teamCode) x.teamCode = y.name})});
                  })
                  .catch(err => {
                    toast.add({
                      severity: 'error',
                      summary: 'Lỗi',
                      detail:err.response.data,
                      life: 2500
                    })});
            })
            .catch();
      };

      const deleteEmployee = (id: number) => {
        ZaloRepository.deleteEmployee(id)
            .then((response) => {
              toast.add({
                severity: 'success',
                summary: 'Đăng ký',
                detail: 'Xoá nhân viên thành công',
                life: 2000
              });
              loadData();
            })
            .catch(err => {
              toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail:err.response.data,
                life: 2500
              })});
      };
      loadData();
      const formatDateTime = (date) => {
        return moment(String(date)).format('DD/MM/YYYY HH:mm');
      };

      const formatDateTime2 = (date) => {
        return moment(String(date)).format('DD/MM/YYYY');
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

      const openLink = (id: any) => {
        let routeData = router.resolve({name: 'updateemployee', params: {id: id}});
        window.open(routeData.href, '_blank');
      };

      return {
        formatDateTime,
        filters,
        clearFilter,
        formatDateTime2,
        listEmployee,
        openLink,
        deleteEmployee,
      }
    }

  }
</script>