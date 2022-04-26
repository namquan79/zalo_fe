<template>

  <panel>
    <div class="p-field p-col-12 p-sm-12 p-md-12">
      <Button class="p-button-outlined" label="Đính kèm tập tin" onclick="document.getElementById('myFile').click()" icon="pi pi-paperclip" style="margin-right: 5vw"/>
      <Button label="Đăng hình" @click="upload()" icon="pi pi-plus-circle" style="margin-right: 5vw"/>
    </div>
    <div class="p-field p-col-4 p-sm-4 p-md-3">
      <form enctype="multipart/form-data">
        <input id="myFile" type="file" style="display: none;" accept=".jpeg,.png,.jpg" name="files" multiple="multiple" v-on:change="fileChange($event.target.files)" :disabled="loadingBar" />
      </form>
    </div>

    <div class="p-field p-col-12 p-md-12" v-if="listFileName.length > 0">
      <DataTable :value="listFileName" showGridlines responsiveLayout="scroll" style="font-size: 13px">
        <Column field="nameFile" header="Tập tin"></Column>
        <Column field="" header="" style="width: 20px">
          <template #body="slotProps">
            <Button class="p-button-danger" label="Xóa" icon="pi pi-trash" @click="deleteFile(slotProps.data.nameFile)" style="font-size: 13px"/>
          </template>
        </Column>
      </DataTable>
    </div>
  </panel>
  <div class="p-field p-col-12 p-sm-12 p-md-12">
    <Dialog header="Tải hình" v-model:visible="loadingBar" >
      <div id="loading">
        <label>Đang tải hình lên máy chủ ...</label>
        <ProgressBar mode="indeterminate" style="height: .3em" />
      </div>
    </Dialog>
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script lang="ts">

  import { computed, ref } from 'vue'
  import ZaloRepository from "@/services/ZaloRepository";
  import {ListImage} from "@/models/listImage";
  import {useToast} from "primevue/usetoast";
  import axios from "axios";
  import {FileDetail} from "@/models/fileDetail.models";
  import {useStore} from "vuex";
  import {useRouter} from "vue-router";

  export default {
      props: {
          id: String,
      },
    setup(props) {
        const products = ref([] as ListImage[]);
      const layout = ref('grid');
      const toast = useToast();
      const show = ref(false);
      const store = useStore();
      const router = useRouter();

      if(!(!!store.state.token)){
        router.push({
          name: 'home'
        });
      }
      const getListImage = () => {
        ZaloRepository.getListImage()
            .then((response) => {
              products.value = response.data;
            })
            .catch(err => {
              // toast.add({
              //   severity: 'error',
              //   summary: 'Lỗi',
              //   detail:'Lỗi khi tải địa điểm',
              //   life: 2000
              // });
            });
      }
      const deleteFile = (name: string) =>
      {
        listFileName.value.findIndex(x => x.nameFile == name);
        listFileName.value.splice(listFileName.value.findIndex(x => x.nameFile == name), 1);
      };
      getListImage();
      const listLink = ref([] as string[]);
      let listFileName = ref([] as FileDetail[]);
      const loadingBar = ref(false);
      const fileChange = (fileList) => {
        var leng = fileList.length;
        for (var i = 0; i < leng; i++)
        {
          var filetemp = ref({} as FileDetail);
          filetemp.value.nameFile = fileList[i].name;
          filetemp.value.value = fileList[i];
          listFileName.value.push(filetemp.value);
        }
      };
      const upload = () => {
        {
          listLink.value = [];
          var files = new FormData();
          listFileName.value.forEach(x =>
          {
            files.append("formFiles", x.value, x.nameFile);
          });
          loadingBar.value = true;
          axios.post(`/api/file/Upload`, files,
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data'
                }
              }).then(response => {
                  loadingBar.value = false;
                  listFileName.value = [];
                  toast.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail:'Tải ảnh lên thành công',
                    life: 2000
                  });
          })
              .catch(err => {
                toast.add({
                  severity: 'error',
                  summary: 'Lỗi',
                  detail:err.response.data,
                  life: 2500
                })});
        }
      };
      const imageClick = (index) => {
        console.log("############$$$$$$$$$$$$$$$$$$$$$ imageClick: " + index);
        show.value = false;
      }
      const showListImage = () => {
        show.value = true;
      }

      return {
        products,
        layout,
        upload,
        loadingBar,
        listFileName,
        fileChange,
        imageClick,
        show,
        showListImage,
        deleteFile
      }
    }

  }
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: .5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 200px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 .5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: .5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: .5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: .5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>