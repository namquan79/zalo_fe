<template>
  <ConfirmPopup></ConfirmPopup>
  <Panel header="Danh sách tài khoản">
    <div class="p-fluid">
      <DataTable
          :loading="isLoading"
          :value="list" :paginator="true" stripedRows :rows="10"
          :rowsPerPageOptions="[10,25,50]" :rowHover="true"
          v-model:filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :globalFilterFields="['fullname','username']"
          currentPageReportTemplate="Có tổng số {totalRecords} tài khoản" columnResizeMode="fit | expand">
        <template #header>
          <div class="p-d-flex p-jc-between p-ai-center">
            <Button type="button" icon="pi pi-filter-slash" label="Xoá" class="p-button-outlined" @click="clearFilter()" style="width: 6em"/>
            <span class="p-input-icon-left" style="width: 18em">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Tìm theo tên hoặc tài khoản" />
              </span>
          </div>
        </template>
        <Column field="fullname" header="Họ và tên" sortable></Column>
        <Column field="username" header="Tài khoản" sortable></Column>
        <Column field="permission" header="Quyền hạn" sortable></Column>
        <Column header="Chỉnh sửa" style="width: 200px">
          <template #body="slotProps">
            <Button  type="button" label="Chỉnh sửa" icon="pi pi-pencil" @click="loadDataUser(slotProps.data.id)"></Button>
          </template>
        </Column>
<!--        <template #paginatorLeft>-->
<!--          <Button type="button" icon="pi plus-circle" class="p-button-text" @click="loadBook" />-->
<!--        </template>-->
      </DataTable>
      <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
        <Dialog v-model:visible="updateReg" :style="{ width: '70vw'}" :breakpoints="{ '1500px': '50vw', '1150px': '60vw' }">
          <Panel header="Cập nhật tài khoản">
            <div class="p-fluid p-formgrid p-grid">
              <div class="p-field p-col p-col-12 p-md-4 p-lg-4">
                <label>Tên đăng nhập</label>
                <InputText id="username" type="text" v-model="userUpdate.username" />
              </div>
              <div class="p-field p-col p-col-12 p-md-4 p-lg-4">
                <label>Mật khẩu(tối thiểu 6 ký tự)</label>
                <Password id="password" v-model="userUpdate.password" toggleMask :feedback="true" />
              </div>
              <div class="p-field p-col p-col-12 p-md-4 p-lg-3">
                <label>Họ và tên</label>
                <InputText id="fullname" type="text" v-model="userUpdate.fullname" />
              </div>
              <div class="p-field p-col p-col-12 p-md-4 p-lg-3">
                <label>Chọn quyền hạn</label>
                <Dropdown id="permission" v-model="userUpdate.permission" :options="userPermission" optionLabel="label" optionValue="value" placeholder="Vui lòng chọn quyền hạn của tài khoản ...">
                </Dropdown>
              </div>
            </div>
            <!--          <div style="width: 20vw">-->
            <Button label="Cập nhật" icon="pi pi-sync" iconPos="left" @click="doUpdate()" style="width: 15em; margin-right: 2vw; margin-bottom: 20px"/>

            <Button label="Xoá" class="p-button-danger"  icon="pi pi-user-minus" iconPos="left" style="width: 15em; margin-bottom: 20px" @click="del($event)" />
          </Panel>
        </Dialog>
      </div>
    </div>
  </Panel>

</template>

<script lang="ts">
import {computed, ref} from 'vue'
import {useToast} from "primevue/usetoast";
import AuthRepository from "@/services/AuthRepository";
import {useStore} from "vuex";
import router from "@/router";
import {FilterMatchMode} from "primevue/api";
import moment from "moment";
import {UserDetail} from "@/models/userDetail";
import ZaloRepository from "@/services/ZaloRepository";
import {UserUpdate} from "@/models/userUpdate";
import {useConfirm} from "primevue/useconfirm";

export default {
  setup() {
    const toast = useToast();
    const list = ref([] as UserDetail[]);
    const store = useStore();
    const userUpdate = ref({} as UserUpdate);
    const updateReg = ref(false);

    if(!(store.state.permission == 'admin')){
      router.push({
        name: 'home'
      });
    }

    const userPermission = ref([
      {label: "Quản lý", value: "admin", param: 1},
      {label: "Nhân viên", value: "user", param: 2},
    ]);

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

    const activeStatus = (i) => {
      if(i)
      {
        return "Đang hoạt động";
      }
      else
        return "Đang tạm ngưng"
    };

    const loadData = () => {
      AuthRepository.getListUser()
          .then((response) => {
            list.value = response.data;
          })
          .catch(err => {
            toast.add({
              severity: 'error',
              summary: 'Lỗi',
              detail:err.response.data,
              life: 2000
            });
          });
    };

    loadData();
    userUpdate.value.password = "";
    const loadDataUser = (id) => {
      AuthRepository.getUserById(id)
          .then((response) => {
            updateReg.value = true;
            userUpdate.value = response.data;
            userUpdate.value.password = "";
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

    const valid = computed(()=> userUpdate.value.password && userUpdate.value.username && userUpdate.value.fullname);

    if(!(store.state.permission == 'admin')){
      router.push({
        name: 'home'
      });
    }

    const doUpdate = () => {
      console.log("#######$$$$$$$$$$$%%%%%%%%%%%%%%%%% doUpdate222222 userUpdate.value.password.length: " + JSON.stringify(userUpdate.value.password));
      console.log("#######$$$$$$$$$$$%%%%%%%%%%%%%%%%% doUpdate222222 userUpdate.value.password. check value: " + (userUpdate.value.password == null));

      const checkValue = ref(false);
      if(userUpdate.value.password == null){
        checkValue.value = true;
      }
      else{
        if(userUpdate.value.password.length < 6 && userUpdate.value.password.length > 0)
        {
          checkValue.value = false;
          toast.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: 'Mật khẩu không hợp lệ, vui lòng nhập lại mật khẩu',
            life: 2000
          });
        }
        else{
          checkValue.value = true;
        }
      }

      if(checkValue.value) {
        AuthRepository.updateUser(userUpdate.value)
            .then((response) => {
              console.log("#######$$$$$$$$$$$%%%%%%%%%%%%%%%%% doUpdate222222: " + JSON.stringify(userUpdate.value));
              toast.add({
                severity: 'success',
                summary: 'Cập nhật',
                detail: 'Cập nhật thông tin tài khoản thành công',
                life: 2000
              });
              loadData()
              updateReg.value = false;
              // router.push({
              //   name: 'home'
              // });
            })
            .catch(err => {
              toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail:err.response.data,
                life: 2000
              });
            });
      };
    };
    const confirm = useConfirm();
    const del = (event) => {
      confirm.require({
        target: event.currentTarget,
        message: 'Bạn có chắc muốn xoá tài khoản này không?',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        rejectClass: 'p-button-outlined',
        acceptLabel: 'Đồng ý',
        rejectLabel: 'Huỷ',
        accept: () => {
          AuthRepository.deleteUser(userUpdate.value.id)
              .then(response => {
                toast.add({severity:'info', summary:'Confirmed', detail:'Tài khoản đã được xoá thành công', life: 3000});
                loadData()
                updateReg.value = false;
              })
              .finally(()=>{
              });
        },
        reject: () => {
        }
      });
    };

    return {
      list,
      filters,
      clearFilter,
      initFilters,
      activeStatus,
      updateReg,
      userUpdate,
      loadDataUser,
      userPermission,
      doUpdate,
      del
    }
  }
}
</script>

<style scoped>

</style>