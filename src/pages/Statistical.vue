<template>
  <!--  </TabPanel>-->
  <Panel header="Thống kê danh sách ống tiêm">
    <div class="p-fluid">
      <DataTable
              :value="dsOngTiem" :paginator="true" stripedRows
              :rows="10" :rowsPerPageOptions="[10,25,50]" :rowHover="true"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :globalFilterFields="['maOngTiem','soMauThu','donVi','ngayTao']"
              currentPageReportTemplate="Có tất cả {totalRecords} ống tiêm"
              v-model:filters="filters"
      >
        <template #header>
          <div class="p-d-flex p-jc-between p-ai-center">
            <Button type="button" icon="pi pi-filter-slash" label="Xoá" class="p-button-outlined" @click="clearFilter()" style="width: 6em"/>
            <span class="p-input-icon-left" style="width: 18em">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Tìm kiếm" />
              </span>
          </div>
        </template>
        <Column field="maOngTiem" header="Mã ống tiêm" sortable></Column>
        <Column field="soMauThu" header="Số mẫu thử đã dùng"></Column>
        <Column field="donVi" header="Đơn vị" sortable></Column>
        <Column field="ngayTao" dataType="date" header="Thời gian" sortable>
          <template #body="{data}">
            {{formatDateTime(data.ngayTao)}}
          </template>
          <template #filter="{filterModel}">
            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
          </template>
        </Column>
        <Column header="Chi tiết">
          <template #body="slotProps">
<!--            <router-link style="text-decoration: none !important;" :to="{ name: 'registerpage'}" >-->
            <div class="p-field p-col-6 p-md-8">
              <Button v-if="checkValue(slotProps.data.soMauThu)" type="button" label="Xem chi tiết"  icon="pi pi-eye" @click="thongTin(slotProps.data.maOngTiem)"></Button>
              <Button  v-else type="button" label="Chưa có ds" disabled icon="pi pi-eye" class="p-button-secondary"></Button>
            </div>
<!--            </router-link>-->
          </template>
        </Column>
        <template #paginatorLeft>
        </template>
        <template #empty>
          Không có thông tin ống tiêm.
        </template>
      </DataTable>
<!--        </div>-->
    </div>
<!--    </div>-->
  </Panel>
</template>

<script lang="ts">

  import { computed, ref } from 'vue'
  import router from "@/router";
  import {Ongtiem} from "@/models/ongtiem";
  import VaccinationRepository from "@/services/VaccinationRepository";
  import moment from 'moment';
  import {FilterMatchMode, FilterOperator} from "primevue/api";
  import {DonViCreate} from "@/models/donViCreate";

  export default {
    setup() {
      const dsOngTiem = ref([] as Ongtiem[]);
      const dsDonVi = ref([] as DonViCreate[]);

      VaccinationRepository.getListDonVi()
              .then((response) => {
                dsDonVi.value = response.data;
                //console.log("######################## getListDonVi: " +JSON.stringify(dsDonVi.value));
              })
              .catch();

      VaccinationRepository.getLists()
              .then((response) => {
                dsOngTiem.value = response.data;
                dsOngTiem.value.forEach(x => {
                  dsDonVi.value.forEach(y =>{
                    if(y.ma == x.donVi)
                    {
                      x.donVi = y.ten;
                    }
                  })
                })
              })
              .catch();

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

      const thongTin = (id: any) => {
        let routeData = router.resolve({name: 'showlistinfo', params: {id: id}});
        window.open(routeData.href, '_blank');
      };

      const checkValue = (val) => {
        return val == 0? false : true;
      }
      return {
        dsOngTiem,
        formatDateTime,
        filters,
        clearFilter,
        checkValue,
        thongTin,
      }
    }

  }
</script>