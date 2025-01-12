<template>
   <div class="on_pn">
    <h2 class="tt_page"><span>Danh sách khách hàng cung cấp thông tin cá nhân</span></h2>
    <div class="on_dskb">
      <div class="wrap">
        <div class="on_choose">
          <div class="on_it">
          <div class="it_3 it_ccc">
            <label>Chọn thời gian tìm kiếm: </label>
            <div class="on_cals">
              <Calendar
              id="date"
              v-model="dateRegisterInfo"
              selectionMode="range"
              dateFormat="dd/mm/yy"
              :showButtonBar="true"
              :showIcon="true"
              :manualInput="false"
              :monthNavigator="true"
              :yearNavigator="true"
              yearRange="2000:2100"
              @date-select="selectCalendarRegister()"
              @clear-click="clearCalendar()"
          />
            </div>
          </div>
          </div>
        </div>
        <div class="on_tables">
          <div class="p-fluid">
      
      <DataTable
              :value="listCustomer" :paginator="true" stripedRows
              :rows="10" :rowsPerPageOptions="[10,25,50]" :rowHover="true"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :globalFilterFields="['fullName','phoneNumber']"
              currentPageReportTemplate="Có tất cả {totalRecords} người đăng ký"
              v-model:filters="filters" style="font-size: 13px">
        <template #header>
          <div class="p-d-flex p-jc-between p-ai-center">
            <Button type="button" icon="pi pi-filter-slash" label="Xoá" class="p-button-outlined" @click="clearFilter()" style="width: 6em"/>
            <span class="p-input-icon-left" style="width: 18em">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Tìm theo tên hoặc số điện thoại" />
                  </span>
          </div>
        </template>
        <Column field="imageLink" header="Ảnh đại diện" sortable>
          <template #body="slotProps">
            <div class="p-fluid p-formgrid p-grid">
              <div class="p-field p-col-5 p-md-5">
                <img :src=slotProps.data.avatar style="width: 60px" />
              </div>
            </div>
          </template>
        </Column>
        <Column field="fullName" header="Họ và tên" sortable></Column>
        <Column field="phoneNumber" header="Số điện thoại"></Column>
        <Column field="address" header="Địa chỉ" sortable></Column>
        <Column field="timeContact" dataType="date" header="Thời gian quan tâm" sortable>
          <template #body="{data}">
            {{formatDateTime(data.timeFollow)}}
          </template>
        </Column>
        <Column field="timeBooking" dataType="date" header="Thời gian cung cấp thông tin" sortable>
          <template #body="{data}">
            {{formatDateTime(data.timeRegisterInfo)}}
          </template>->
        </Column>
        <Column header="">
          <template #body="slotProps">
              <Button type="button" label="Cập nhật thông tin" icon="pi pi-user-edit" @click="selectCustomer(slotProps.data.id)" severity="warn" raised ></Button>
          </template>
        </Column>
        <template #empty>
          Không có thông tin người bệnh.
        </template>
      </DataTable>
            <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
              <Dialog v-model:visible="updateReg" :style="{ width: '90vw'}" :breakpoints="{ '1500px': '70vw', '1150px': '80vw' }">
                <Panel header="Đổi thông tin khách hàng">
                  <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Họ và tên</label>
                      <InputText id="fullname" type="text" v-model="customerUpdate.fullName" style="text-align: center"/>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Số điện thoại</label>
                      <InputNumber inputId="minmax" :min="0" :useGrouping="false"  v-model="customerUpdate.phoneNumber"/>
                    </div>
                    <div class="p-field p-col-12 p-sm p-md-6">
                      <label for="dateselect">Ngày sinh:</label>
                      <Calendar
                          id="dateselect"
                          v-model="customerUpdate.birthday"
                          selectionMode="single"
                          dateFormat="dd/mm/yy"
                          :showButtonBar="true"
                          :showIcon="true"
                          :manualInput="false"
                          :monthNavigator="true"
                          :yearNavigator="true"
                          yearRange="1900:2050"
                          :showTime="true"
                      >
                        <template #body="{data}">
                          {{formatDateTime(data.birthday)}}
                        </template>
                      </Calendar>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
                    </div>
                    <div class="card p-col p-col-12 p-md-12 p-lg-12">
                      <div class="p-grid">
                        <div class="p-offset-4 p-col-4 p-sm-4 p-md-4">
                          <Button label="Cập nhật" icon="pi pi-save" :disabled="!(customerUpdate.fullName && (customerUpdate.phoneNumber?.length >= 10))" @click="update()" severity="warn" raised />
                        </div>
                      </div>
                    </div>
                  </div>
                </Panel>
              </Dialog>
            </div>
            <div class="p-field p-col-12 p-sm-12 p-md-12">
              <Dialog header="Đang xử lý" v-model:visible="loadingBar" >
                <div id="loading">
                  <label>Đang cập nhật dữ liệu...</label>
                  <ProgressBar mode="indeterminate" style="height: .3em" />
                </div>
              </Dialog>
              <ConfirmDialog></ConfirmDialog>
            </div>
    </div>
        </div>
      </div>
      
    </div>
  </div>  
  <!--  </TabPanel>-->

</template>

<script lang="ts">

  import { computed, ref } from 'vue'
  import VaccinationRepository from "@/services/VaccinationRepository";
  import moment from 'moment';
  import {FilterMatchMode, FilterOperator} from "primevue/api";
  import {ThongTin} from "@/models/thongTin";
  import router from "@/router";
  import {useToast} from "primevue/usetoast";
  import {useStore} from "vuex";
  import {Ongtiem} from "@/models/ongtiem";
  import {RegisterService} from "@/models/registerService";
  import ZaloRepository from "@/services/ZaloRepository";
  import {ListService} from "@/models/listService";
  import {useRouter} from "vue-router";
  import {RegisterServiceUpdate} from "@/models/registerServiceUpdate";
  import {Customer} from "@/models/customer";
  import {ReturnResult} from "@/models/returnResult";
  import {CustomerUpdate} from "@/models/customerUpdate";
  import {forEach} from "lodash";

  export default {
    setup() {
      const toast = useToast();
      const store = useStore();
      const list = ref([] as RegisterService[]);
      const listTemp = ref([] as RegisterService[]);
      const date = ref();
      const listService = ref([] as ListService[]);
      const service = ref("");
      const router = useRouter();
      const kind = ref(0);
      const updateReg = ref(false);
      const loadingBar = ref(false);
      const registerServiceUpdate = ref({} as RegisterServiceUpdate);
      const dateRegisterInfo = ref();
      const dateReturnResult = ref();
      const listCustomer = ref([] as Customer[]);
      const listReturnResult = ref([] as ReturnResult[]);
      const customerUpdate = ref({} as CustomerUpdate);

      const toTimestamp = (strDate) => {
        const dt = Date.parse(strDate);
        return dt / 1000;
      }

      const selectCustomer = (id) => {
        updateReg.value = true;
        listCustomer.value.forEach(x => {
          if(x.id == id){
            customerUpdate.value.id = x.id;
            customerUpdate.value.fullName = x.fullName;
            customerUpdate.value.birthday = x.birthday;
            customerUpdate.value.phoneNumber = x.phoneNumber;
          }
        })
      }

      const update = () => {
        loadingBar.value = true;
        ZaloRepository.customerUpdate(customerUpdate.value)
            .then((response) => {
              loadingBar.value = false;
              toast.add({
                severity: 'success',
                summary: 'Thành công',
                detail:'Chỉnh sửa thông tin khách hàng thành công',
                life: 2500
              });
              selectCalendarRegister();
              updateReg.value = false;
            })
            .catch(err => {
              toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail:err.response.data,
                life: 2500
              })});
      }
      const valid = () => {
        return customerUpdate.value.fullName && (customerUpdate.value.phoneNumber.length >= 10);
      }
      const formatDate = (date) => {
        return moment(String(date)).format('YYYY-MM-DDTHH:mm:ss');
      };

      if(!(!!store.state.token)){
        router.push({
          name: 'home'
        });
      }

      const selectCalendarRegister = () => {
        if((dateRegisterInfo.value[0] != null)&&(dateRegisterInfo.value[1] != null))
        {
          loadingBar.value = true;
          listCustomer.value = [];
          ZaloRepository.getListCustomerWithTime(dateRegisterInfo.value[0]/1000, dateRegisterInfo.value[1]/1000)
              .then((response) => {
                loadingBar.value = false;
                listCustomer.value = response.data;
              })
              .catch(err => {
                toast.add({
                  severity: 'error',
                  summary: 'Lỗi',
                  detail:err.response.data,
                  life: 2500
                })})
        }
      };

      const selectCalendarResult = () => {
        if((dateReturnResult.value[0] != null)&&(dateReturnResult.value[1] != null))
        {
          listReturnResult.value = [];
          ZaloRepository.getListReturnResult(dateReturnResult.value[0]/1000, dateReturnResult.value[1]/1000)
              .then((response) => {
                listReturnResult.value = response.data;
              })
              .catch(err => {
                toast.add({
                  severity: 'error',
                  summary: 'Lỗi',
                  detail:err.response.data,
                  life: 2500
                })})
        }
      };

      //selectCalendar();

      const clearCalendar = () => {
        list.value = [];
        listService.value = [];
      }

      const formatDateTime = (date) => {
        if((date == null)||(date == ''))
        {
          return "chưa có thông tin"
        }
        else
        return moment(String(date)).format(' HH:mm DD/MM/YYYY');
      };

      const getFilter = () => {
        if((service.value != null)&&(service.value != ""))
        {
          list.value = listTemp.value.filter(x => x.serviceCode == service.value);
        }
        else{
          list.value = listTemp.value;
        }
      }
      const validDate = (registerService: RegisterService) => {
        return registerService.timeConfirm;
      }

      const clearDate = () => {
        console.log("@@@@@@@@@################ clearDate");
        var temp = ref();
        date.value = temp.value;
      }
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
        formatDateTime,
        list,
        date,
        selectCalendarRegister,
        selectCalendarResult,
        clearCalendar,
        listService,
        service,
        getFilter,
        validDate,
        kind,
        clearDate,
        updateReg,
        valid,
        registerServiceUpdate,
        dateRegisterInfo,
        dateReturnResult,
        listCustomer,
        listReturnResult,
        selectCustomer,
        update,
        customerUpdate,
        clearFilter,
        filters,
        loadingBar,
        // update
      }
    }

  }
</script>
<style lang="scss">
</style>