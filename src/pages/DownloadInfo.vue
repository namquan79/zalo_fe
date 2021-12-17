<template>
  <!--  </TabPanel>-->
  <Panel header="Tải thông ">
    <div class="card">
      <div class="p-fluid">
        <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-sm p-md-4">
                <label for="dateselect">Vui lòng lựa chọn ngày:</label>
                <Calendar
                        id="dateselect"
                        v-model="time"
                        selectionMode="single"
                        dateFormat="dd/mm/yy"
                        :showButtonBar="true"
                        :showIcon="true"
                        :manualInput="false"
                        :monthNavigator="true"
                        :yearNavigator="true"
                        yearRange="2000:2100"
                        @date-select="loadListDiaDiem()"
                />
            </div>
            <div class="p-field p-col-12 p-sm p-md-4">
                <label>Chọn địa điểm lấy mẫu:</label>
                <span class="p-input-icon-right">
                    <Dropdown id="donvi" v-model="idDiaDiem" :options="listDiaDiem" optionLabel="diaChi" optionValue="idDiaDiem" placeholder="Vui lòng chọn địa điểm" emptyMessage="Không có dữ liệu">
                    </Dropdown>
                </span>
            </div>
            <div class="p-field p-col-12 p-sm p-md-4">
                <label>Xuất tập tin:</label>
                <span class="p-input-icon-right">
                    <Button type="button" @click="exportFile()" style="margin-right: 10px" :disabled="!valid()">Thực hiện</Button>
                </span>
            </div>
            <div class="p-field p-col-12 p-sm p-md-4" v-if="exportFileDetail">
                <label>Tải tập tin:</label>
                <span class="p-input-icon-right">
                    <Button type="button" @click="downloadFile()" style="margin-right: 10px">Tải</Button>
                </span>
            </div>
        </div>
      </div>
    </div>
  </Panel>
    <div class="p-field p-col-12 p-sm-12 p-md-12">
    <Dialog header="Đang xử " v-model:visible="loadingBar" >
        <div id="loading">
            <label>Đang xử lý xuất thông , vui lòng chờ ...</label>
            <ProgressBar mode="indeterminate" style="height: .3em" />
        </div>
    </Dialog>
    </div>
</template>

<script lang="ts">

  import { computed, ref } from 'vue';
  import {useToast} from "primevue/usetoast";
  import VaccinationRepository from "@/services/VaccinationRepository";
  import moment from 'moment';
  import {FilterMatchMode, FilterOperator} from "primevue/api";
  import {DonViCreate} from "@/models/donViCreate";
  import {Ongtiem} from "@/models/ongtiem";
  import {Ongtiemshort} from "@/models/ongtiemshort";
  import axios from "axios";
  import {MaDoiTuong} from "@/models/maDoiTuong";
  import {DiaDiemDetail} from "@/models/diaDiemDetail";

  export default {
    setup() {
      const toast = useToast();
      const fileNameExport = ref("");
      const exportFileDetail = ref(false);
      const loadingBar = ref(false);
      const time = ref(new Date());
      const idDiaDiem = ref(0);
        const listDiaDiem = ref([] as DiaDiemDetail[]);
        const exportFile = () =>{
            loadingBar.value = true;
            exportFileDetail.value = false;
            VaccinationRepository.getExport(time.value.getTime()/1000, idDiaDiem.value)
                .then((response) => {
                    fileNameExport.value = response.data;
                    exportFileDetail.value = true;
                    loadingBar.value = false;
                })
                .catch(err => {
                    loadingBar.value = false;
                    toast.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail:err.response.data,
                        life: 2500
                    })});
        };
        const downloadFile = () => {
            axios({
                url: 'api/vaccination/DownloadResult/'+fileNameExport.value,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', fileNameExport.value);
                document.body.appendChild(fileLink);

                fileLink.click();
            })
                .catch(err => {
                    toast.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail:err.response.data,
                        life: 2500
                    })});
        };
        const valid = () => {
            return time.value&&idDiaDiem.value;
        };
        const loadListDiaDiem = () => {
            idDiaDiem.value = 0;
            VaccinationRepository.getListDiaDiem(time.value.getTime()/1000)
                .then((response) => {
                    listDiaDiem.value = response.data;
                })
                .catch(err => {
                    toast.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail:err.response.data,
                        life: 2500
                    })});
        };


        loadListDiaDiem();

      return {
        exportFile,
        downloadFile,
        exportFileDetail,
        loadingBar,
          time,
          valid,
          idDiaDiem,
          loadListDiaDiem,
          listDiaDiem
      }
    }

  }
</script>