<template>
  <!--  </TabPanel>-->
  <Panel header="Thống kê danh sách ống tiêm">
    <div class="p-fluid">
<!--      <div class="p-fluid p-formgrid p-grid">-->
<!--        <div class="p-field p-col-12 p-sm p-md-4">-->
<!--          <label>Chọn thời gian tìm kiếm: </label>-->
<!--          <Calendar-->
<!--                  id="date"-->
<!--                  v-model="date"-->
<!--                  selectionMode="range"-->
<!--                  dateFormat="dd/mm/yy"-->
<!--                  :showButtonBar="true"-->
<!--                  :showIcon="true"-->
<!--                  :manualInput="false"-->
<!--                  :monthNavigator="true"-->
<!--                  :yearNavigator="true"-->
<!--                  yearRange="2000:2100"-->
<!--                  @date-select="selectCalendar()"-->
<!--                  @clear-click="clearCalendar()"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="p-field p-col-12 p-sm p-md-4">-->
<!--          <label>Tìm kiếm khai báo theo tên:</label>-->
<!--          <Dropdown id="listname" :filter="true" :showClear="true" v-model="name" emptyMessage="Không có dữ liệu, vui lòng lựa chọn thời gian" :options="listName" optionLabel="ten" optionValue="ten" @change="searchName()">-->
<!--          </Dropdown>-->
<!--        </div>-->
<!--        <div class="p-field p-col-12 p-sm p-md-4" v-if="masterPermission">-->
<!--          <label>Tìm KB theo nhân viên:</label>-->
<!--          <Dropdown id="listusername" :filter="true" :showClear="true" v-model="user" emptyMessage="Không có dữ liệu, vui lòng lựa chọn thời gian" :options="shortListUser" optionLabel="user_name" optionValue="id" @change="searchUser()">-->
<!--          </Dropdown>-->
<!--        </div>-->
<!--        <div class="p-field p-col-12 p-sm p-md-4" v-if="checkStatus">-->
<!--          <label>Lọc theo tình trạng:</label>-->
<!--          <Dropdown id="statuslist" :filter="true" :showClear="true" v-model="slStatus" emptyMessage="Chưa tải được tình trạng" :options="statusList" optionLabel="label" optionValue="value" @change="selectStatus()">-->
<!--          </Dropdown>-->
<!--        </div>-->
<!--        <div class="p-field p-col-12 p-sm p-md-4" v-if="checkStatus">-->
<!--          <label for="gioi_tinh">Giới tính </label>-->
<!--          <div class="p-field-radiobutton">-->
<!--            <input type="radio" id="nam" name="sex" value="nam" v-model="gioiTinh" @change="selectSex"/>-->
<!--            <label for="nam"> Nam</label>-->
<!--            <div class="p-col p-md-1">-->
<!--            </div>-->
<!--            <input type="radio" id="nu" name="sex" value="nữ" v-model="gioiTinh" @change="selectSex"/>-->
<!--            <label for="nu"> Nữ</label>-->
<!--            <div class="p-col p-md-1">-->
<!--            </div>-->
<!--            <input type="radio" id="tatca" name="sex" value="tất cả" v-model="gioiTinh" @change="selectSex"/>-->
<!--            <label for="tatca"> Tất cả</label>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="p-field p-col-12 p-sm p-md-4" v-if="checkStatus && masterPermission">-->
<!--          <Button type="button" v-if="selectedGroup.length > 0" label="Tải danh sách" icon="pi pi-save" class="p-button-raised" @click="createPDF"/>-->
<!--        </div>-->
<!--        <div class="p-field p-col-12 p-sm p-md-4" v-if="checkStatus && masterPermission">-->
<!--          <Button type="button" v-if="selectedGroup.length > 0" label="Biểu đồ thống kê khai báo y tế" icon="pi pi-chart-bar" class="p-button-raised" @click="groups"/>-->
<!--        </div>-->
<!--        <div class="p-field p-col-12 p-sm p-md-4" v-if="checkStatus && masterPermission">-->
<!--          <Button type="button" v-if="selectedGroup.length > 0" label="Biểu đồ thống kê theo Quận/Huyện" icon="pi pi-chart-bar" class="p-button-raised" @click="districtCountGroup"/>-->
<!--        </div>-->
<!--      </div>-->
<!--        <div class="p-field p-col-12 p-sm-12 p-md-12">-->
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