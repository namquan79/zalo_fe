<template>
  <TabView>
    <!-- ================= TAB 1: GỬI TIN THƯỜNG ================= -->
    <TabPanel header="Gửi tin nhắn thông thường">
      <div id="tabs_tn1" class="tabs_tn">
        <div class="wrap_tn">
          <div class="on_tn on_choose">
            <div class="it_3">
              <label>Lựa chọn phạm vi gửi tin nhắn</label>
              <Dropdown id="kind" v-model="action" :options="lsAction" optionLabel="label" optionValue="value" />
            </div>

            <div class="it_3 it_ccc" v-if="action === 'location'">
              <label>Lựa chọn khu vực gửi tin</label>
              <Dropdown id="location" v-model="province" :options="listProvince" optionLabel="provinceName"
                optionValue="provinceCode" :filter="true" :showClear="true" />
            </div>

            <div class="it_3 it_ccc" v-if="action === 'gender'">
              <label>A3. Giới tính </label>
              <div class="ps">
                <input type="radio" id="nam" name="sex" value="Nam" v-model="gender" />
                <label for="nam" style="margin-right: 60px">&ensp;Nam</label>
                <input type="radio" id="nu" name="sex" value="Nữ" v-model="gender" />
                <label for="nu">&ensp;Nữ</label>
              </div>
            </div>

            <div class="it_3 it_ccc" v-if="action === 'age'">
              <label>Chọn phạm vi độ tuổi: {{ age }}</label>
              <Slider v-model="age" :range="true" />
            </div>

            <div class="it_3 it_ccc" v-if="action === 'group'">
              <label>Lựa chọn nhóm gửi tin</label>
              <Dropdown id="group" v-model="idGroup" :options="listGroup" optionLabel="groupName" optionValue="id"
                :filter="true" :showClear="true" />
            </div>

            <div class="it_full">
              <label>Nội dung tin nhắn</label>
              <Textarea id="message" type="text" v-model="message.mess" style="height: 100px" />
            </div>

            <div class="it_bt">
              <Button label="gửi tin nhắn" icon="pi pi-plus-circle" iconPos="left" class="btn-send"
                @click="doSendMessage" :disabled="!valid()" />
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT LIST TAB 1 -->
      <div id="tabs_tn1_Right" class="tabs_tn1_Right">
        <div class="customer-list">
          <div class="customer-list__toolbar">
            <div class="customer-select" @click.stop>
              <Checkbox v-model="selectAllTab1" :binary="true" :disabled="action !== 'customer'" />
            </div>
            <div class="title">Danh sách khách hàng</div>
            <div class="hint" v-if="action === 'all'">(Đã tự chọn tất cả)</div>
          </div>

          <div v-for="c in listCustomer" :key="c.id" class="customer-item" @click="toggleCustomerTab1(c)"
            style="cursor: pointer">
            <div class="customer-select" @click.stop>
              <Checkbox v-model="listIdMessage" :value="c" :disabled="action !== 'customer'" />
            </div>

            <div class="customer-avatar">
              <img src="https://via.placeholder.com/100" alt="avatar" />
            </div>

            <div class="customer-info">
              <div class="customer-name">{{ getCustomerName(c) }}</div>
              <div class="customer-phone">{{ getCustomerPhone(c) }}</div>
            </div>
          </div>
        </div>
      </div>
    </TabPanel>

    <!-- ================= TAB 2: GỬI TIN THEO MẪU ================= -->
    <TabPanel header="Gửi tin nhắn theo mẫu đính kèm">
      <div id="tabs_tn2" class="tabs_tn">
        <div class="wrap_tn">
          <div class="on_tn on_choose">
            <div class="it_3">
              <label>Lựa chọn phạm vi gửi tin nhắn</label>
              <Dropdown id="kind2" v-model="action2" :options="lsAction" optionLabel="label" optionValue="value" />
            </div>

            <div class="it_3 it_ccc" v-if="action2 === 'location'">
              <label>Lựa chọn khu vực gửi tin</label>
              <Dropdown id="location2" v-model="province2" :options="listProvince" optionLabel="provinceName"
                optionValue="provinceCode" :filter="true" :showClear="true" />
            </div>

            <div class="it_3 it_ccc" v-if="action2 === 'group'">
              <label>Lựa chọn nhóm gửi tin</label>
              <Dropdown id="group2" v-model="idGroup2" :options="listGroup" optionLabel="groupName" optionValue="id"
                :filter="true" :showClear="true" />
            </div>

            <div class="it_3 it_ccc" v-if="action2 === 'gender'">
              <label>A3. Giới tính </label>
              <div class="ps">
                <input type="radio" id="nam2" name="sex2" value="Nam" v-model="gender2" />
                <label for="nam2" style="margin-right: 60px">&ensp;Nam</label>
                <input type="radio" id="nu2" name="sex2" value="Nữ" v-model="gender2" />
                <label for="nu2">&ensp;Nữ</label>
              </div>
            </div>

            <div class="it_3 it_ccc" v-if="action2 === 'age'">
              <label>Chọn phạm vi độ tuổi: {{ age2 }}</label>
              <Slider v-model="age2" :range="true" />
            </div>
          </div>

          <div class="pannel_tk">
            <Panel header="Thiết kế khung chính của tin nhắn">
              <div class="p-fluid p-formgrid p-grid">
                <div class="p-fluid-left">
                  <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
                    <div class="p-fluid p-formgrid p-grid">
                      <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
                        <label>Tiêu đề của khung chính</label>
                        <Textarea id="titleMain" type="text" v-model="element1.title" />
                        <small v-if="element1.title?.length > 0" class="p-error">
                          Tiêu đề đang có độ dài {{ element1.title?.length }} ký tự (tối đa 100 ký tự).
                        </small>
                      </div>

                      <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
                        <label>Nội dung khung chính</label>
                        <Textarea id="subtitleMain" type="text" v-model="element1.subtitle" autoResize rows="10" />
                        <small v-if="element1.subtitle?.length > 0" class="p-error">
                          Nội dung đang có độ dài {{ element1.subtitle?.length }} ký tự (tối đa 500 ký tự).
                        </small>
                      </div>

                      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                        <label>Đường dẫn hình ảnh chính</label>
                        <div class="p-inputgroup">
                          <Textarea id="imageUrlMain" type="text" v-model="element1.image_url" />
                          <Button label="chọn hình" class="btn-pick-image" @click="showListImage(1)" />
                        </div>
                      </div>

                      <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                        <label>Đường dẫn khung chính</label>
                        <Textarea id="defaultUrl" type="text" v-model="element1.url" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- LIST KHÁCH (TAB 2) -->
                <div id="p-fluid-right" class="p-fluid-right">
                  <div class="customer-list-fluid-right">
                    <div class="customer-list__toolbar">
                      <div class="customer-select" @click.stop>
                        <Checkbox v-model="selectAllTab2" :binary="true" :disabled="action2 !== 'customer'" />
                      </div>
                      <div class="title">Danh sách khách hàng</div>
                      <div class="hint" v-if="action2 === 'all'">(Đã tự chọn tất cả)</div>
                    </div>

                    <div v-for="c in listCustomer" :key="c.id" class="customer-item" @click="toggleCustomerTab2(c)"
                      style="cursor: pointer">
                      <div class="customer-select" @click.stop>
                        <Checkbox v-model="listId" :value="c" :disabled="action2 !== 'customer'" />
                      </div>

                      <div class="customer-avatar">
                        <img src="https://via.placeholder.com/100" alt="avatar" />
                      </div>

                      <div class="customer-info">
                        <div class="customer-name">{{ getCustomerName(c) }}</div>
                        <div class="customer-phone">{{ getCustomerPhone(c) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            <Panel header="Thiết kế thành phần">
              <div class="p-fluid p-formgrid p-grid">
                <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
                  <Accordion :multiple="true" :activeIndex="[0, 1]">
                    <!-- Tham số 1 -->
                    <AccordionTab header="Tham số 1">
                      <div class="p-fluid p-formgrid p-grid">
                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Tiêu đề của tham số 1</label>
                          <InputText id="title1" type="text" v-model="element2.title" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Đường dẫn hình ảnh của tham số 1</label>
                          <div class="p-inputgroup">
                            <InputText id="imageUrl1" type="text" v-model="element2.image_url" />
                            <Button label="chọn hình" class="btn-pick-image" @click="showListImage(2)" />
                          </div>
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Loại hành động tham số 1</label>
                          <Dropdown v-model="element2.type" :options="actionTypes" optionLabel="label"
                            optionValue="param" showClear />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element2.type === 1">
                          <label>Đường dẫn của tham số 1</label>
                          <InputText id="defaultUrl1" type="text" v-model="element2.url" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6"
                          v-if="element2.type === 2 || element2.type === 3">
                          <label>Nội dung tin nhắn của tham số 1</label>
                          <InputText id="automessage" type="text" v-model="element2.payload" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element2.type === 4">
                          <label>Nội dung tin nhắn sms 1</label>
                          <InputText id="smscontent" type="text" v-model="payload1.content" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6"
                          v-if="element2.type === 4 || element2.type === 5">
                          <label>Thông tin số điện thoại 1</label>
                          <InputMask mask="(9999)999999" v-model="payload1.phone_code" placeholder="" />
                        </div>
                      </div>
                    </AccordionTab>

                    <!-- Tham số 2 -->
                    <AccordionTab header="Tham số 2">
                      <div class="p-fluid p-formgrid p-grid">
                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Tiêu đề của tham số 2</label>
                          <InputText id="title2" type="text" v-model="element3.title" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Đường dẫn hình ảnh của tham số 2</label>
                          <div class="p-inputgroup">
                            <InputText id="imageUrl2" type="text" v-model="element3.image_url" />
                            <Button label="chọn hình" class="btn-pick-image" @click="showListImage(3)" />
                          </div>
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Loại hành động tham số 2</label>
                          <Dropdown v-model="element3.type" :options="actionTypes" optionLabel="label"
                            optionValue="param" showClear />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element3.type === 1">
                          <label>Đường dẫn của tham số 2</label>
                          <InputText id="defaultUrl2" type="text" v-model="element3.url" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6"
                          v-if="element3.type === 2 || element3.type === 3">
                          <label>Nội dung tin nhắn của tham số 2</label>
                          <InputText id="automessage2" type="text" v-model="element3.payload" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element3.type === 4">
                          <label>Nội dung tin nhắn sms 2</label>
                          <InputText id="smscontent2" type="text" v-model="payload2.content" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6"
                          v-if="element3.type === 4 || element3.type === 5">
                          <label>Thông tin số điện thoại 2</label>
                          <InputMask mask="(9999)999999" v-model="payload2.phone_code" placeholder="" />
                        </div>
                      </div>
                    </AccordionTab>

                    <!-- Tham số 3 -->
                    <AccordionTab header="Tham số 3">
                      <div class="p-fluid p-formgrid p-grid">
                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Tiêu đề của tham số 3</label>
                          <InputText id="title3" type="text" v-model="element4.title" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Đường dẫn hình ảnh của tham số 3</label>
                          <div class="p-inputgroup">
                            <InputText id="imageUrl3" type="text" v-model="element4.image_url" />
                            <Button label="chọn hình" class="btn-pick-image" @click="showListImage(4)" />
                          </div>
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Loại hành động tham số 3</label>
                          <Dropdown v-model="element4.type" :options="actionTypes" optionLabel="label"
                            optionValue="param" showClear />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element4.type === 1">
                          <label>Đường dẫn của tham số 3</label>
                          <InputText id="defaultUrl3" type="text" v-model="element4.url" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6"
                          v-if="element4.type === 2 || element4.type === 3">
                          <label>Nội dung tin nhắn của tham số 3</label>
                          <InputText id="automessage3" type="text" v-model="element4.payload" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element4.type === 4">
                          <label>Nội dung tin nhắn sms 3</label>
                          <InputText id="smscontent3" type="text" v-model="payload3.content" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6"
                          v-if="element4.type === 4 || element4.type === 5">
                          <label>Thông tin số điện thoại 3</label>
                          <InputMask mask="(9999)999999" v-model="payload3.phone_code" placeholder="" />
                        </div>
                      </div>
                    </AccordionTab>

                    <!-- Tham số 4 -->
                    <AccordionTab header="Tham số 4">
                      <div class="p-fluid p-formgrid p-grid">
                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Tiêu đề của tham số 4</label>
                          <InputText id="title4" type="text" v-model="element5.title" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Đường dẫn hình ảnh của tham số 4</label>
                          <div class="p-inputgroup">
                            <InputText id="imageUrl4" type="text" v-model="element5.image_url" />
                            <Button label="chọn hình" class="btn-pick-image" @click="showListImage(5)" />
                          </div>
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                          <label>Loại hành động tham số 4</label>
                          <Dropdown v-model="element5.type" :options="actionTypes" optionLabel="label"
                            optionValue="param" showClear />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element5.type === 1">
                          <label>Đường dẫn của tham số 4</label>
                          <InputText id="defaultUrl4" type="text" v-model="element5.url" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6"
                          v-if="element5.type === 2 || element5.type === 3">
                          <label>Nội dung tin nhắn của tham số 4</label>
                          <InputText id="automessage4" type="text" v-model="element5.payload" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element5.type === 4">
                          <label>Nội dung tin nhắn sms 4</label>
                          <InputText id="smscontent4" type="text" v-model="payload4.content" />
                        </div>

                        <div class="p-field p-col p-col-12 p-md-6 p-lg-6"
                          v-if="element5.type === 4 || element5.type === 5">
                          <label>Thông tin số điện thoại 4</label>
                          <InputMask mask="(9999)999999" v-model="payload4.phone_code" placeholder="" />
                        </div>
                      </div>
                    </AccordionTab>
                  </Accordion>
                </div>
              </div>
            </Panel>
          </div>

          <div class="bt_gtn">
            <Button label="gửi tin nhắn" icon="pi pi-plus-circle" iconPos="left" class="btn-send"
              @click="doSendMessageWithAttachment" :disabled="!valid2()" />
          </div>
        </div>
      </div>
    </TabPanel>
  </TabView>

  <!-- ================= DIALOGS ================= -->
  <div class="tum_lunm">
    <div class="p-field p-col-12 p-sm-12 p-md-12">
      <Dialog header="gửi tin nhắn" v-model:visible="loadingBar">
        <div id="loading">
          <label>Đang gửi tin nhắn, vui lòng chờ ...</label>
          <ProgressBar mode="indeterminate" style="height: 0.3em" />
        </div>
      </Dialog>
      <ConfirmDialog />
    </div>

    <div class="p-field p-col-10 p-sm-10 p-md-10">
      <div class="card">
        <div class="p-field p-col-10 p-sm-10 p-md-10">
          <Dialog header="Tập tin lưu trên máy chủ" v-model:visible="show">
            <div class="p-fluid p-formgrid p-grid">
              <div class="p-field p-col p-col-12 p-md-4 p-lg-4">
                <InputText id="find" type="text" v-model="find" @input="search" placeholder="Tìm kiếm" />
              </div>

              <div class="p-field p-col p-col-12 p-md-4 p-lg-4">
                <Button label="Xóa hình" @click="deleteImage" icon="pi pi-trash" style="margin-right: 5vw"
                  :disabled="!validImageSelect()" />
              </div>

              <div class="p-field p-col-4 p-sm-4 p-md-3">
                <form enctype="multipart/form-data">
                  <input id="myFile" type="file" style="display: none" accept=".jpeg,.png,.jpg" name="files"
                    multiple="multiple" v-on:change="fileChange($event.target.files)" :disabled="loadingBar" />
                </form>
              </div>
            </div>

            <DataView :value="listImageFull" :layout="layout" :paginator="true" :rows="20">
              <template #grid="slotProps">
                <div class="col-12 md:col-4">
                  <div class="product-grid-item card">
                    <div class="product-grid-item-content" style="margin: 10px">
                      <Card>
                        <template #content>
                          <img class="imageupload" :src="slotProps.data.link"
                            @click="imageClick(slotProps.data.link)" />
                          <div class="product-name" style="font-size: 10px">{{ slotProps.data.fileName }}</div>
                          <Checkbox v-model="slotProps.data.delete" :binary="true" />
                        </template>
                      </Card>
                    </div>
                  </div>
                </div>
              </template>
            </DataView>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";

import ZaloRepository from "@/services/ZaloRepository";
import { Message } from "@/models/message";
import { MessageWithAttachment } from "@/models/messageWithAttachment";
import { ElementParamater } from "@/models/elementParamater";
import { ListCustomer } from "@/models/listCustomer";
import Province from "@/models/province.models";
import { ListImage } from "@/models/listImage";
import { ListImageFull } from "@/models/listImageFull";
import { Group } from "@/models/group";

type ActionScope = "customer" | "all" | "gender" | "age" | "location" | "group" | "";

export default {
  setup() {
    // ================= Core
    const router = useRouter();
    const store = useStore();
    const toast = useToast();

    // ================= Flags
    const USE_MOCK_CUSTOMERS = true;

    // ================= UI state
    const loadingBar = ref(false);
    const show = ref(false);

    // ================= Master data
    const listCustomer = ref<ListCustomer[]>([]);
    const listProvince = ref<Province[]>([]);
    const listGroup = ref<Group[]>([]);

    // ================= Tab 1
    const message = ref({} as Message);
    const action = ref<ActionScope>("");
    const gender = ref("");
    const age = ref<[number, number]>([10, 100]);
    const province = ref<any>();
    const idGroup = ref<number>(0);
    const listIdMessage = ref<ListCustomer[]>([]);

    // ================= Tab 2
    const messageWithAttachment = ref({} as MessageWithAttachment);
    const action2 = ref<ActionScope>("");
    const gender2 = ref("");
    const age2 = ref<[number, number]>([10, 100]);
    const province2 = ref<any>();
    const idGroup2 = ref<number>(0);
    const listId = ref<ListCustomer[]>([]);

    const element1 = ref({} as ElementParamater);
    const element2 = ref({} as ElementParamater);
    const element3 = ref({} as ElementParamater);
    const element4 = ref({} as ElementParamater);
    const element5 = ref({} as ElementParamater);

    // ================= Dialog images
    const find = ref("");
    const products = ref<ListImage[]>([]);
    const listImageFull = ref<ListImageFull[]>([]);
    const listImageFullTemp = ref<ListImageFull[]>([]);
    const layout = ref("grid");
    const index = ref<number>(0);

    // ================= Options
    const lsAction = [
      { label: "gửi tin nhắn cho từng khách hàng", value: "customer" },
      { label: "gửi tin nhắn cho tất cả khách hàng", value: "all" },
      { label: "gửi tin nhắn theo giới tính", value: "gender" },
      { label: "gửi tin nhắn theo độ tuổi", value: "age" },
      { label: "gửi tin nhắn theo khu vực", value: "location" },
      { label: "gửi tin nhắn theo nhóm", value: "group" },
    ];

    const actionTypes = [
      { label: "mở 1 đường dẫn", value: "oa.open.url", param: 1 },
      { label: "gửi 1 tin nhắn đến OA", value: "oa.query.show", param: 2 },
      { label: "gửi 1 tin nhắn ẩn đến OA", value: "oa.query.hide", param: 3 },
      { label: "mở ứng dụng gửi sms với nội dung và sdt cho sẵn", value: "oa.open.sms", param: 4 },
      { label: "mở ứng dụng gọi điện thoại với số cho sẵn", value: "oa.open.phone", param: 5 },
    ];

    // ================= Payloads (sms/phone)
    const payload1 = ref({ content: "", phone_code: "" });
    const payload2 = ref({ content: "", phone_code: "" });
    const payload3 = ref({ content: "", phone_code: "" });
    const payload4 = ref({ content: "", phone_code: "" });

    // ================= Helpers
    const getCustomerName = (c: any) => c?.name ?? c?.fullName ?? c?.customerName ?? c?.customer_name ?? "---";
    const getCustomerPhone = (c: any) => c?.phone ?? c?.phoneNumber ?? c?.mobile ?? c?.phone_code ?? "";

    const buildUserId = (
      scope: ActionScope,
      selected: ListCustomer[],
      g: string,
      a: [number, number],
      p: any,
      groupId: number
    ) => {
      if (scope === "customer") return selected.map((x: any) => x.id).join(",") + (selected.length ? "," : "");
      if (scope === "all") return "all";
      if (scope === "gender") return `gender,${g === "Nam" ? "1" : "0"}`;
      if (scope === "age") return `age,${a[0]},${a[1]}`;
      if (scope === "location") return `location,${p}`;
      if (scope === "group") return `group,${groupId}`;
      return "";
    };

    const mapElementTypeToAction = (typeNum: any) => {
      const n = Number(typeNum);
      const found = actionTypes.find((x) => x.param === n);
      return found?.value ?? typeNum;
    };

    const createSelectAllComputed = (scopeRef: any, selectedRef: any) =>
      computed<boolean>({
        get() {
          if (scopeRef.value === "all") return true;
          if (scopeRef.value !== "customer") return false;
          return listCustomer.value.length > 0 && selectedRef.value.length === listCustomer.value.length;
        },
        set(val) {
          if (scopeRef.value !== "customer") return;
          selectedRef.value = val ? [...listCustomer.value] : [];
        },
      });

    // ================= Select all (tab1/tab2)
    const selectAllTab1 = createSelectAllComputed(action, listIdMessage);
    const selectAllTab2 = createSelectAllComputed(action2, listId);

    // ================= Watch: auto select all when scope = all
    watch(action, (val) => {
      listIdMessage.value = val === "all" ? [...listCustomer.value] : [];
    });

    watch(action2, (val) => {
      listId.value = val === "all" ? [...listCustomer.value] : [];
    });

    // ================= UI actions: toggle customer
    const toggleCustomerTab1 = (c: any) => {
      if (action.value !== "customer") return;
      const idx = listIdMessage.value.findIndex((x: any) => x.id === c.id);
      idx >= 0 ? listIdMessage.value.splice(idx, 1) : listIdMessage.value.push(c);
    };

    const toggleCustomerTab2 = (c: any) => {
      if (action2.value !== "customer") return;
      const idx = listId.value.findIndex((x: any) => x.id === c.id);
      idx >= 0 ? listId.value.splice(idx, 1) : listId.value.push(c);
    };

    // ================= Validation
    const valid = () => {
      if (!action.value || !message.value.mess) return false;
      if (action.value === "customer" && listIdMessage.value.length < 1) return false;
      return true;
    };

    const valid2 = () => {
      return (
        !!action2.value &&
        !!element1.value.title &&
        !!element1.value.subtitle &&
        !!element1.value.image_url &&
        !!element1.value.url
      );
    };

    // ================= API loads
    const loadGroups = async () => {
      try {
        const res = await ZaloRepository.listGroup();
        listGroup.value = res.data;
      } catch {
        toast.add({ severity: "error", summary: "Lỗi", detail: "Lỗi không tìm thấy group", life: 2000 });
      }
    };

    const loadProvinces = async () => {
      try {
        const res = await ZaloRepository.getProvince();
        listProvince.value = res.data;
      } catch {
        toast.add({ severity: "error", summary: "Lỗi", detail: "Lỗi khi tải địa điểm", life: 2000 });
      }
    };

    const loadCustomers = async () => {
      if (USE_MOCK_CUSTOMERS) {
        listCustomer.value = [
          { id: 101, fullName: "Nguyễn Văn A", phone: "0825 295 505" } as any,
          { id: 102, fullName: "Trần Thị B", phone: "0901 234 567" } as any,
          { id: 103, fullName: "Lê Văn C", phone: "0912 345 678" } as any,
          { id: 104, fullName: "Phạm Văn D", phone: "0988 111 222" } as any,
          { id: 105, fullName: "Hoàng Thị E", phone: "0977 333 444" } as any,
        ];
        return;
      }

      try {
        const res = await ZaloRepository.getListCustomer();
        listCustomer.value = res.data;
      } catch {
        toast.add({ severity: "error", summary: "Lỗi", detail: "Lỗi khi tải danh sách khách hàng", life: 2000 });
      }
    };

    const getListImage = async () => {
      try {
        const res = await ZaloRepository.getListImage();
        products.value = res.data;

        listImageFull.value = products.value.map((x: any) => ({
          link: x.link,
          fileName: (x.link || "").toString().split("\\")[1] ?? (x.link || ""),
          delete: false,
        }));
        listImageFullTemp.value = [...listImageFull.value];

        products.value.forEach((x: any) => {
          x.link = window.location.href.split(window.location.pathname)[0] + "/" + x.link.replace("\\", "/");
        });
      } catch {
        // ignore
      }
    };

    // ================= Send message (tab1)
    const doSendMessage = async () => {
      if (!valid()) return;

      message.value.userid = buildUserId(action.value, listIdMessage.value, gender.value, age.value, province.value, idGroup.value);

      try {
        loadingBar.value = true;
        await ZaloRepository.sendMessage(message.value);
        message.value = {} as Message;
        toast.add({ severity: "success", summary: "gửi tin", detail: "gửi tin nhắn thành công", life: 2000 });
      } catch (err: any) {
        toast.add({ severity: "error", summary: "Lỗi", detail: err?.response?.data ?? "gửi tin thất bại", life: 2000 });
      } finally {
        loadingBar.value = false;
      }
    };

    // ================= Send message (tab2)
    const doSendMessageWithAttachment = async () => {
      if (action2.value === "customer" && listId.value.length < 1) {
        toast.add({ severity: "error", summary: "Lỗi", detail: "Vui lòng chọn danh sách khách hàng cần gửi", life: 3000 });
        return;
      }

      messageWithAttachment.value.userid = buildUserId(
        action2.value,
        listId.value,
        gender2.value,
        age2.value,
        province2.value,
        idGroup2.value
      );

      if ((element1.value.subtitle || "").length > 500) {
        toast.add({ severity: "error", summary: "Lỗi", detail: "Nội dung khung chính vượt quá 500 ký tự", life: 3000 });
        return;
      }

      const types = [
        Number((element2.value as any).type),
        Number((element3.value as any).type),
        Number((element4.value as any).type),
        Number((element5.value as any).type),
      ];

      if (types[0] === 4 || types[0] === 5) element2.value.payload = payload1.value as any;
      if (types[1] === 4 || types[1] === 5) element3.value.payload = payload2.value as any;
      if (types[2] === 4 || types[2] === 5) element4.value.payload = payload3.value as any;
      if (types[3] === 4 || types[3] === 5) element5.value.payload = payload4.value as any;

      const elements = [element1.value, element2.value, element3.value, element4.value, element5.value]
        .filter((x: any) => x && x.type != null)
        .map((x: any) => ({
          title: x.title,
          subtitle: x.subtitle,
          image_url: x.image_url,
          type: mapElementTypeToAction(x.type),
          url: x.url,
          payload: x.payload,
        }));

      messageWithAttachment.value.elements = elements as any;

      try {
        loadingBar.value = true;
        await ZaloRepository.sendMessageWithAttachmentList(messageWithAttachment.value);
        messageWithAttachment.value = {} as MessageWithAttachment;
        toast.add({ severity: "success", summary: "gửi tin", detail: "gửi tin nhắn thành công", life: 2000 });
      } catch (err: any) {
        toast.add({ severity: "error", summary: "Lỗi", detail: err?.response?.data ?? "gửi tin thất bại", life: 2000 });
      } finally {
        loadingBar.value = false;
      }
    };

    // ================= Image dialog actions
    const showListImage = (i: number) => {
      show.value = true;
      index.value = i;
    };

    const imageClick = (link: string) => {
      show.value = false;

      let fixed = (link || "").replace("\\", "/");
      fixed = window.location.href.split(window.location.pathname)[0] + "/" + fixed.replace("\\", "/");
      fixed = fixed.replaceAll(" ", "%20");

      if (index.value === 1) element1.value.image_url = fixed;
      if (index.value === 2) element2.value.image_url = fixed;
      if (index.value === 3) element3.value.image_url = fixed;
      if (index.value === 4) element4.value.image_url = fixed;
      if (index.value === 5) element5.value.image_url = fixed;
    };

    const search = () => {
      listImageFull.value = listImageFullTemp.value.filter((x) => (x.fileName || "").includes(find.value));
    };

    const validImageSelect = () => listImageFull.value.some((x) => x.delete);

    const deleteImage = async () => {
      const listDelete = listImageFull.value.filter((x) => x.delete).map((x) => ({ link: x.fileName })) as any;

      try {
        await ZaloRepository.deleteImageFile(listDelete);
        toast.add({ severity: "success", summary: "Xóa", detail: "Xóa thành công hình ảnh", life: 2000 });

        listImageFullTemp.value = listImageFull.value.filter((x) => !x.delete);
        listImageFull.value = [...listImageFullTemp.value];
      } catch {
        toast.add({ severity: "error", summary: "Lỗi", detail: "Lỗi xóa hình ảnh không thành công", life: 2000 });
      }
    };

    const fileChange = (_files: FileList) => {
      // TODO: implement upload if needed
    };

    // ================= Auth + init
    if (!store.state.token) router.push({ name: "home" });

    onMounted(() => {
      element1.value.type = 1 as any;
      loadGroups();
      loadProvinces();
      loadCustomers();
      getListImage();
    });

    return {
      // tab1
      action,
      gender,
      age,
      province,
      idGroup,
      message,
      listCustomer,
      listIdMessage,
      selectAllTab1,
      toggleCustomerTab1,
      doSendMessage,
      valid,

      // tab2
      action2,
      gender2,
      age2,
      province2,
      idGroup2,
      listId,
      selectAllTab2,
      toggleCustomerTab2,
      messageWithAttachment,
      doSendMessageWithAttachment,
      valid2,

      element1,
      element2,
      element3,
      element4,
      element5,
      payload1,
      payload2,
      payload3,
      payload4,

      // options
      lsAction,
      actionTypes,
      listProvince,
      listGroup,

      // dialog image
      show,
      find,
      layout,
      listImageFull,
      showListImage,
      imageClick,
      search,
      deleteImage,
      validImageSelect,
      fileChange,

      // helper
      getCustomerName,
      getCustomerPhone,

      // ui
      loadingBar,
    };
  },
};
</script>

<style lang="scss">
/* ===== Common ===== */
TabPanel {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}

/* ===== Buttons (reuse) ===== */
.btn-send,
.btn-pick-image {
  background: #06b649 !important;
  border: 1px solid #06b649 !important;
  color: #fff !important;
}

.btn-send:hover:not(:disabled),
.btn-pick-image:hover:not(:disabled) {
  filter: brightness(0.95);
}

.btn-send:active:not(:disabled),
.btn-pick-image:active:not(:disabled) {
  filter: brightness(0.9);
}

.btn-send:disabled,
.btn-pick-image:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== Customer list ===== */
.customer-list,
.customer-list-fluid-right {
  max-width: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  max-height: 480px;
  overflow-y: auto;
}

.customer-list {
  margin: 40px auto;
  padding: 12px 0;
}

.customer-list-fluid-right {
  margin: 30px auto;
}

.customer-list__toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
}

.customer-list__toolbar .title {
  font-weight: 700;
}

.customer-list__toolbar .hint {
  font-size: 12px;
  color: #666;
}

.customer-select {
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.customer-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
}

.customer-item:last-child {
  border-bottom: none;
}

.customer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
  background: #ddd;
}

.customer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.customer-info {
  display: flex;
  flex-direction: column;
}

.customer-name {
  font-weight: 600;
  margin-bottom: 2px;
}

.customer-phone {
  font-size: 13px;
  color: #555;
}

.imageupload {
  max-width: 100px;
  max-height: 100px;
}

/* ===== Layout old float (giữ nguyên của bạn) ===== */
#tabs_tn1_Right {
  height: 500px;
  width: 22%;
  float: right;
  margin-right: 4%;
}

#tabs_tn1 {
  height: 500px;
  width: 70%;
  float: left;
  margin-left: 4%;
}

/* ===== TabView header style: xanh #06b649 ===== */
.p-tabview .p-tabview-nav {
  border-bottom: 2px solid #06b649;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  background: #fff !important;
  color: #06b649 !important;
  border: 0 !important;
  border-bottom: 3px solid #06b649 !important;
  border-radius: 8px 8px 0 0;
  transition: background 0.15s ease, color 0.15s ease;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:hover {
  background: #06b649 !important;
  color: #fff !important;
}

.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #06b649 !important;
  color: #fff !important;
  border-bottom-color: #06b649 !important;
}

.p-tabview .p-tabview-ink-bar {
  background: #06b649 !important;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link .p-tabview-title,
.p-tabview .p-tabview-nav li .p-tabview-nav-link .p-tabview-left-icon,
.p-tabview .p-tabview-nav li .p-tabview-nav-link .p-tabview-right-icon {
  color: inherit !important;
}

/* ===== PrimeVue Checkbox: đổi sang xanh #06b649 ===== */
:root {
  --primary-color: #06b649;
  --primary-color-text: #ffffff;
}


/* ô vuông */
.p-checkbox .p-checkbox-box {
  border: 2px solid var(--tn-green) !important;
}

/* hover */
.p-checkbox:not(.p-disabled) .p-checkbox-box:hover {
  border-color: var(--tn-green) !important;
}

/* khi checked */
.p-checkbox.p-highlight .p-checkbox-box {
  background: var(--tn-green) !important;
  border-color: var(--tn-green) !important;
}

/* icon dấu check */
.p-checkbox.p-highlight .p-checkbox-box .p-checkbox-icon {
  color: #fff !important;
}

/* focus ring (tuỳ theme) */
.p-checkbox:not(.p-disabled) .p-checkbox-box.p-focus {
  box-shadow: 0 0 0 0.2rem rgba(6, 182, 73, 0.25) !important;
}

:root {
  --tn-green: #06b649;
}

/* viền */
:deep(.p-checkbox .p-checkbox-box) {
  border: 2px solid var(--tn-green) !important;
}

/* checked - PrimeVue có thể dùng 1 trong 2 kiểu highlight */
:deep(.p-checkbox.p-highlight .p-checkbox-box),
:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background: var(--tn-green) !important;
  border-color: var(--tn-green) !important;
}

/* icon check */
:deep(.p-checkbox.p-highlight .p-checkbox-box .p-checkbox-icon),
:deep(.p-checkbox .p-checkbox-box.p-highlight .p-checkbox-icon) {
  color: #fff !important;
}

/* hover */
:deep(.p-checkbox:not(.p-disabled) .p-checkbox-box:hover) {
  border-color: var(--tn-green) !important;
}

/* focus ring */
:deep(.p-checkbox:not(.p-disabled) .p-checkbox-box.p-focus) {
  box-shadow: 0 0 0 0.2rem rgba(6, 182, 73, 0.25) !important;
}
</style>
