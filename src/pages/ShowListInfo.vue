<template>
  <!--  </TabPanel>-->
  <Panel header="Danh sách người tiêm">
    <div class="p-fluid">
      <DataTable
              :value="dsThongtin" :paginator="true" stripedRows
              :rows="10" :rowsPerPageOptions="[10,25,50]" :rowHover="true"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :globalFilterFields="['ten','soDienThoai','diaChi','maOngTiem','thoiGian']"
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
        <Column field="ten" header="Họ và tên" sortable></Column>
        <Column field="soDienThoai" header="Số điện thoại"></Column>
        <Column field="diaChi" header="Địa chỉ" sortable></Column>
        <Column field="maOngTiem" header="Mã ống tiêm" sortable></Column>
        <Column field="thoiGian" dataType="date" header="Thời gian" sortable>
          <template #body="{data}">
            {{formatDateTime(data.thoiGian)}}
          </template>
          <template #filter="{filterModel}">
            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
          </template>
        </Column>
        <template #paginatorLeft>
        </template>
        <template #empty>
          Không có thông tin tiêm chủng.
        </template>
      </DataTable>
<!--        </div>-->
    </div>
<!--    </div>-->
  </Panel>
</template>

<script lang="ts">

  import { computed, ref } from 'vue'
  import VaccinationRepository from "@/services/VaccinationRepository";
  import moment from 'moment';
  import {FilterMatchMode, FilterOperator} from "primevue/api";
  import {ThongTin} from "@/models/thongTin";

  export default {
      props: {
          id: Number,
      },
    setup(props) {
      const dsThongtin = ref([] as ThongTin[]);

      VaccinationRepository.getListsInfor(props.id)
              .then((response) => {
                  dsThongtin.value = response.data;
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
      return {
          dsThongtin,
        formatDateTime,
        filters,
        clearFilter,
      }
    }

  }
</script>