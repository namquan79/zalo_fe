<template>
  <ConfirmPopup></ConfirmPopup>
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
      <Button label="Cập nhật" icon="pi pi-sync" iconPos="left" @click="doUpdate()" style="width: 8em; margin-right: 2vw; margin-bottom: 20px"/>

      <Button label="Xoá" class="p-button-danger"  icon="pi pi-user-minus" iconPos="left" style="width: 8em; margin-bottom: 20px" @click="del($event)" />

<!--          </div>-->
        </Panel>
</template>

<script lang="ts">

import { computed, ref } from 'vue'
import AuthRepository from '@/services/AuthRepository'
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import {useStore} from "vuex";
import {useConfirm} from "primevue/useconfirm";
import {UserUpdate} from "@/models/userUpdate";

export default {
  props: {
    id: Number,
  },

  setup(props) {
    const router = useRouter();
    const userUpdate = ref({} as UserUpdate);
    const toast = useToast();
    const store = useStore();
    const error = ref(null);
    userUpdate.value.password = "";

    AuthRepository.getUserById(props.id)
    .then((response) => {
      userUpdate.value = response.data;
      userUpdate.value.password = "";
    })
    .catch(err => {
      toast.add({
        severity: 'error',
        summary: 'Lỗi',
        detail:err.response.data,
        life: 2000
      });
    });

    const valid = computed(()=> userUpdate.value.password && userUpdate.value.username && userUpdate.value.fullname);

    if(!(store.state.permission == 'admin')){
      router.push({
        name: 'home'
      });
    }

    const userPermission = ref([
      {label: "Quản lý", value: "admin", param: 1},
      {label: "Nhân viên", value: "user", param: 2},
    ]);

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
                router.push({
                  name: 'userlist',
                });
              })
              .finally(()=>{
              });
        },
        reject: () => {
        }
      });
    };

    return {
      userUpdate,
      doUpdate,
      valid,
      userPermission,
      error,
      del,
    }
  }
}

</script>
