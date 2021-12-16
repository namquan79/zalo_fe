<template>
  <!--  </TabPanel>-->
  <Panel header="Danh sách người tiêm">
    <div class="p-fluid">
      <DataTable
              :value="dsThongtin" :paginator="true" stripedRows
              :rows="10" :rowsPerPageOptions="[10,25,50]" :rowHover="true"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :globalFilterFields="['ten','soDienThoai','diaChi','maOngTiem','thoiGian']"
              currentPageReportTemplate="Có tất cả {totalRecords} người tiêm"
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
        <Column field="ngaySinh" dataType="date" header="Ngày sinh" sortable>
          <template #body="{data}">
            {{formatDateTime2(data.ngaySinh)}}
          </template>
          <template #filter="{filterModel}">
            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
          </template>
        </Column>
        <Column field="thoiGian" dataType="date" header="Thời gian" sortable>
          <template #body="{data}">
            {{formatDateTime(data.thoiGian)}}
          </template>
          <template #filter="{filterModel}">
            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
          </template>
        </Column>
        <Column header="Tuỳ chọn">
          <template #body="slotProps">
            <!--            <router-link style="text-decoration: none !important;" :to="{ name: 'registerpage'}" >-->
<!--            <div class="p-field p-col-6 p-md-8">-->
              <Button type="button" label="Chỉnh sửa"  icon="pi pi-eye" @click="editInfo(slotProps.data.id)"></Button>
<!--            </div>-->
            <!--            </router-link>-->
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
  import router from "@/router";

  export default {
      props: {
          id: Number,
      },
    setup(props) {
      const dsThongtin = ref([] as ThongTin[]);

      VaccinationRepository.getListsInfo(props.id)
              .then((response) => {
                  dsThongtin.value = response.data;
              })
              .catch();

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

      const editInfo = (id: any) => {
        let routeData = router.resolve({name: 'updateinfo', params: {id: id}});
        window.open(routeData.href, '_blank');
      };
      return {
          dsThongtin,
        formatDateTime,
        filters,
        clearFilter,
        editInfo,
        formatDateTime2,
      }
    }

  }
</script>