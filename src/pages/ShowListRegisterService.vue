<template>
  <!--  </TabPanel>-->
  <Panel header="Danh sách người đăng ký khám bệnh">
    <div class="p-fluid">
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col-12 p-md-5">
          <label>Chọn loại thời gian:</label>
          <div class="field-radiobutton">
            <RadioButton id="city1" name="city" value="2" v-model="kind" style="margin-right: 5px" @change="clearDate"/>
            <label for="city1" style="margin-right: 20px">Thời gian theo ngày đặt lịch</label>
            <RadioButton id="city2" name="city" value="1" v-model="kind" style="margin-right: 5px" @change="clearDate"/>
            <label for="city2">Thời gian theo ngày liên hệ</label>
          </div>
        </div>
        <div class="p-field p-col-12 p-md-4" v-if="kind > 0">
          <label>Chọn thời gian tìm kiếm: </label>
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
        <div class="p-field p-col-12 p-md-3">
          <label>Chọn loại dịch vụ:</label>
          <span class="p-input-icon-right">
              <Dropdown id="dichvu" v-model="service" :options="listService" optionLabel="serviceName" optionValue="serviceCode" placeholder="Vui lòng chọn dịch vụ"
                        emptyMessage="Không có dữ liệu" @change="getFilter" showClear="true">
              </Dropdown>
          </span>
        </div>
      </div>
      <DataTable
              :value="list" :paginator="true" stripedRows
              :rows="10" :rowsPerPageOptions="[10,25,50]" :rowHover="true"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :globalFilterFields="['customerName','serviceName']"
              currentPageReportTemplate="Có tất cả {totalRecords} người đăng ký"
              v-model:filters="filters">
        <Column field="customerName" header="Họ và tên" sortable></Column>
        <Column field="serviceName" header="Tên dịch vụ" sortable></Column>
        <Column field="address" header="Địa chỉ"></Column>
        <Column field="message" header="Yêu cầu"></Column>
        <Column field="phoneNumber" header="Số điện thoại"></Column>
        <Column field="userConfirm" header="Người xác nhận"></Column>
        <Column field="time" dataType="date" header="Ngày liên hệ" sortable>
          <template #body="{data}">
            {{formatDateTime(data.timeContact)}}
          </template>
          <template #filter="{filterModel}">
            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
          </template>
        </Column>
        <Column field="time" dataType="date" header="Ngày đặt lịch" sortable>
          <template #body="{data}">
            {{formatDateTime(data.timeBooking)}}
          </template>
          <template #filter="{filterModel}">
            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
          </template>
        </Column>
        <Column header="Tuỳ chọn">
          <template #body="slotProps">
            <router-link style="text-decoration: none !important;" :to="{ name: 'updateregisterservice', params: {id: slotProps.data.id}}"  v-if="!validDate(slotProps.data)">
              <Button type="button" label="Đặt lịch"  icon="pi pi-eye" @click="editInfo(slotProps.data.id)"></Button>
            </router-link>
            <Button type="button" label="Đã đặt lịch" class="p-button-secondary" icon="pi pi-check-circle" v-else></Button>
          </template>
        </Column>
        <template #empty>
          Không có thông tin người bệnh.
        </template>
      </DataTable>
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
  import {useToast} from "primevue/usetoast";
  import {useStore} from "vuex";
  import {Ongtiem} from "@/models/ongtiem";
  import {RegisterService} from "@/models/registerService";
  import ZaloRepository from "@/services/ZaloRepository";
  import {ListService} from "@/models/listService";
  import {useRouter} from "vue-router";

  export default {
    setup() {
      const toast = useToast();
      const store = useStore();
      const list = ref([] as RegisterService[]);
      const listTemp = ref([] as RegisterService[]);
      const date = ref(new Date());
      const listService = ref([] as ListService[]);
      const service = ref("");
      const router = useRouter();
      const kind = ref(0);

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
        return moment(String(date)).format('DD/MM/YYYY');
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
        return registerService.timeBooking;
      }

      const clearDate = () => {
        console.log("@@@@@@@@@################ clearDate");
        date.value = new Date();
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
        clearDate
      }
    }

  }
</script>