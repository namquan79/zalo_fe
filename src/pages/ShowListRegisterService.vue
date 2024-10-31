<template>
   <div class="on_pn">
    <h2 class="tt_page"><span>Danh sách người đăng ký khám bệnh</span></h2>  
    <div class="on_dskb">
      <div class="wrap">
        <div class="on_choose">
          <div class="on_it">
            <div class="it_3">
            <label>Chọn loại thời gian:</label>
            <div class="field-radiobutton">
            <RadioButton id="city1" name="city" value="2" v-model="kind" style="margin-right: 5px" @change="clearDate"/>
            <label for="city1" style="margin-right: 20px">Thời gian theo ngày đặt lịch</label>
         </div>
          <div class="field-radiobutton">
            <RadioButton id="city2" name="city" value="1" v-model="kind" style="margin-right: 5px" @change="clearDate"/>
            <label for="city2">Thời gian theo ngày liên hệ</label>
          </div>
          </div>
          <div class="it_3 it_ccc">
            <label>Chọn thời gian tìm kiếm: </label>
            <div class="on_cals" v-if="kind > 0">
              <Calendar
              id="date"
              v-model="date"
              selectionMode="range"
              dateFormat="dd/mm/yy"
              :showButtonBar="true"
              :showIcon="true"
              :manualInput="false"
              :monthNavigator="true"
              :yearNavigator="true"
              yearRange="2000:2100"
              @date-select="selectCalendar()"
              @clear-click="clearCalendar()"
          />
            </div>
          </div>
          <div class="it_3">
            <label>Chọn loại dịch vụ:</label>
            <span class="p-input-icon-right">
                <Dropdown id="dichvu" v-model="service" :options="listService" optionLabel="serviceName" optionValue="serviceCode" placeholder="Vui lòng chọn dịch vụ"
                          emptyMessage="Không có dữ liệu" @change="getFilter" showClear="true">
                </Dropdown>
            </span>
          </div>

          </div>
        </div>
        <div class="on_tables">
          <div class="p-fluid">
      
      <DataTable
              :value="list" :paginator="true" stripedRows
              :rows="10" :rowsPerPageOptions="[10,25,50]" :rowHover="true"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :globalFilterFields="['customerName','serviceName']"
              currentPageReportTemplate="Có tất cả {totalRecords} người đăng ký"
              v-model:filters="filters" style="font-size: 13px">
        <Column field="customerName" header="Họ và tên" sortable></Column>
        <Column field="serviceName" header="Tên dịch vụ" sortable></Column>
        <Column field="address" header="Địa chỉ"></Column>
        <Column field="year" header="Năm sinh" sortable></Column>
        <Column field="antecedent" header="Tiền sử bệnh"></Column>
        <Column field="message" header="Yêu cầu"></Column>
        <Column field="phoneNumber" header="Số điện thoại"></Column>
        <Column field="userConfirm" header="Người xác nhận" sortable></Column>
        <Column field="timeContact" dataType="date" header="Thời gian liên hệ" sortable>
          <template #body="{data}">
            {{formatDateTime(data.timeContact)}}
          </template>
<!--          <template #filter="{filterModel}">-->
<!--            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />-->
<!--          </template>-->
        </Column>
        <Column field="timeBooking" dataType="date" header="Thời gian đặt lịch" sortable>
          <template #body="{data}">
            {{formatDateTime(data.timeBooking)}}
          </template>
<!--          <template #filter="{filterModel}">-->
<!--            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />-->
<!--          </template>-->
        </Column>
        <Column header="Tuỳ chọn">
          <template #body="slotProps">
<!--            <router-link style="text-decoration: none !important;" :to="{ name: 'updateregisterservice', params: {id: slotProps.data.id}}">-->
              <Button type="button" label="Đặt lịch"  icon="pi pi-spinner" v-if="!validDate(slotProps.data)" @click="loadData(slotProps.data.id)"></Button>
              <Button type="button" label="Đổi lịch" class="p-button-secondary" icon="pi pi-check-circle" v-else @click="loadData(slotProps.data.id)"></Button>
<!--            </router-link>-->
          </template>
        </Column>
        <template #empty>
          Không có thông tin người bệnh.
        </template>
      </DataTable>
            <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
              <Dialog v-model:visible="updateReg" :style="{ width: '90vw'}" :breakpoints="{ '1500px': '70vw', '1150px': '80vw' }">
                <Panel header="Xác nhận lịch khám bệnh">
                  <div class="p-fluid p-formgrid p-grid">
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Họ và tên</label>
                      <InputText id="fullname" type="text" v-model="registerServiceUpdate.customerName" style="text-align: center"/>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Số điện thoại</label>
                      <InputText id="phoneNumber" type="text" v-model="registerServiceUpdate.phoneNumber" style="text-align: center"/>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Địa chỉ</label>
                      <InputText id="address" type="text" v-model="registerServiceUpdate.address" style="text-align: center"/>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <!--        <Column field="antecedent" header="Tiền sử bệnh"></Column>-->
                      <label>Tiền sử bệnh</label>
                      <InputText id="antecedent" type="text" v-model="registerServiceUpdate.antecedent" style="text-align: center"/>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Dịch vụ</label>
                      <InputText id="service" type="text" v-model="registerServiceUpdate.serviceName" style="text-align: center"/>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Yêu cầu</label>
                      <InputText id="message" type="text" v-model="registerServiceUpdate.message" style="text-align: center"/>
                    </div>
                    <div class="p-field p-col-12 p-sm p-md-6">
                      <label for="dateselect">Chọn thời gian khám:</label>
                      <Calendar
                          id="dateselect"
                          v-model="registerServiceUpdate.timeBooking"
                          selectionMode="single"
                          dateFormat="dd/mm/yy"
                          :showButtonBar="true"
                          :showIcon="true"
                          :manualInput="false"
                          :monthNavigator="true"
                          :yearNavigator="true"
                          yearRange="1900:2050"
                          :minDate="minDate"
                          :showTime="true"
                      >
                        <template #body="{data}">
                          {{formatDateTime(data.timeBooking)}}
                        </template>
                      </Calendar>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
                    </div>
                    <div class="card p-col p-col-12 p-md-12 p-lg-12">
                      <div class="p-grid">
                        <div class="p-offset-4 p-col-4 p-sm-4 p-md-4">
                          <Button label="Cập nhật" icon="pi pi-check" :disabled="!valid()" @click="update()"/>
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
                  <label>Đang xử lý xuất biên bản...</label>
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
      const registerServiceUpdate = ref({} as RegisterServiceUpdate);
      const minDate = ref(new Date());

      const toTimestamp = (strDate) => {
        const dt = Date.parse(strDate);
        return dt / 1000;
      }
      const loadData = (id) => {
        updateReg.value = true;
        ZaloRepository.registerServiceById(id)
            .then((response) => {
              registerServiceUpdate.value = response.data;
            })
            .catch(err => {
              toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail:err.response.data,
                life: 2500
              })});
      }


      const update = () => {
        console.log("#######$$$$$$$$$$$$$$$$$ update: ");
        console.log("#######$$$$$$$$$$$$$$$$$ update registerServiceUpdate.value.timeBooking: " + registerServiceUpdate.value.timeBooking);
        console.log("#######$$$$$$$$$$$$$$$$$ update registerServiceUpdate.value.timeBooking formatDate: " + formatDate(registerServiceUpdate.value.timeBooking));
        registerServiceUpdate.value.timeBooking = formatDate(registerServiceUpdate.value.timeBooking);
        ZaloRepository.updateRegisterService(registerServiceUpdate.value)
            .then((response) => {
              toast.add({
                severity: 'success',
                summary: 'Thành công',
                detail:'Chỉnh sửa khám thành công',
                life: 2500
              });
              selectCalendar();
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
        return registerServiceUpdate.value.timeBooking;
      }
      const formatDate = (date) => {
        return moment(String(date)).format('YYYY-MM-DDTHH:mm:ss');
      };

      if(!(!!store.state.token)){
        router.push({
          name: 'home'
        });
      }

      const selectCalendar = () => {
        if((date.value[0] != null)&&(date.value[1] != null))
        {
          listTemp.value = [];
          list.value = [];
          ZaloRepository.getListRegister(date.value[0]/1000, date.value[1]/1000, kind.value)
              .then((response) => {
                listTemp.value = list.value = response.data;
                list.value.forEach(x => {
                  const check = ref(false);
                  listService.value.forEach(y => {
                    if(y.serviceCode == x.serviceCode)
                      check.value = true;
                  });
                  if(!check.value)
                  {
                    listService.value.push({
                      serviceCode: x.serviceCode,
                      serviceName: x.serviceName
                    });
                  }
                });
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

      return {
        formatDateTime,
        list,
        date,
        selectCalendar,
        clearCalendar,
        listService,
        service,
        getFilter,
        validDate,
        kind,
        clearDate,
        updateReg,
        valid,
        loadData,
        registerServiceUpdate,
        update
      }
    }

  }
</script>
<style lang="scss">
</style>