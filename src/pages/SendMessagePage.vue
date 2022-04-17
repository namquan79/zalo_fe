<template>
  <Accordion :activeIndex="0">
    <AccordionTab header="Gởi tin nhắn thông thường">
<!--      <Panel header="Gởi tin nhắn thông thường cho người sử dụng">-->
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-sm-4 p-md-4">
              <label>Lựa chọn phạm vi gởi tin nhắn</label>
              <Dropdown id="kind" v-model="action" :options="lsAction" optionLabel="label" optionValue="value">
              </Dropdown>
            </div>
            <div class="p-field p-col-12 p-sm-4 p-md-4" v-if="action == 'location'">
              <label>Lựa chọn khu vực gởi tin</label>
              <Dropdown id="location" v-model="province" :options="listProvince" optionLabel="provinceName" optionValue="provinceCode" :filter="true" :showClear="true">
              </Dropdown>
            </div>
            <div class="p-field p-col-12 p-sm-4 p-md-4"  style="text-align: center" v-if="action == 'gender'">
              <label>A3. Giới tính </label>
              <div class="p-field p-col-12 p-sm-12 p-md-12">
                <input type="radio" id="nam" name="sex" value="Nam" v-model="gender"/>
                <label for="nam" style="margin-right: 60px">&ensp;Nam</label>
                <input type="radio" id="nu" name="sex" value="Nữ" v-model="gender"/>
                <label for="nu">&ensp;Nữ</label>
              </div>
            </div>
            <div class="p-field p-col-12 p-sm-4 p-md-4" v-if="action == 'customer'">
<!--              listIdMessage-->
              <label>Chọn khách hàng gởi</label>
              <MultiSelect v-model="listIdMessage" :options="listCustomer" optionLabel="name" placeholder="Chọn khách hàng" :filter="true">
              </MultiSelect>
              <small id="id-note1" class="p-error">* Vui lòng chọn danh sách khách hàng gởi</small>
            </div>
            <div class="p-field p-col-12 p-sm-4 p-md-4" v-if="action == 'age'">
<!--              listIdMessage-->
              <label>Chọn phạm vi độ tuổi: {{age}}</label>
              <h5></h5>
              <Slider v-model="age" :range="true" />
            </div>
            <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
              <label>Nội dung tin nhắn</label>
              <Textarea id="message" type="text" v-model="message.mess" style="height: 100px"/>
            </div>
          </div>
          <Button label="Gởi tin nhắn" icon="pi pi-plus-circle" iconPos="left" @click="doSendMessage()" :disabled="!valid()"/>
<!--      </Panel>-->
    </AccordionTab>
    <AccordionTab header="Gởi tin nhắn theo mẫu đính kèm">
<!--        <Panel header="Gởi tin nhắn theo mẫu đính kèm cho người sử dụng">-->
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col-12 p-sm-4 p-md-4">
              <label>Lựa chọn phạm vi gởi tin nhắn</label>
              <Dropdown id="kind2" v-model="action2" :options="lsAction" optionLabel="label" optionValue="value">
              </Dropdown>
            </div>
            <div class="p-field p-col-12 p-sm-4 p-md-4" v-if="action2 == 'location'">
              <label>Lựa chọn khu vực gởi tin</label>
              <Dropdown id="location2" v-model="province2" :options="listProvince" optionLabel="provinceName" optionValue="provinceCode" :filter="true" :showClear="true">
              </Dropdown>
            </div>
            <div class="p-field p-col-12 p-sm-4 p-md-4"  style="text-align: center" v-if="action2 == 'gender'">
              <label>A3. Giới tính </label>
              <div class="p-field p-col-12 p-sm-12 p-md-12">
                <input type="radio" id="nam2" name="sex" value="Nam" v-model="gender2"/>
                <label for="nam" style="margin-right: 60px">&ensp;Nam</label>
                <input type="radio" id="nu2" name="sex" value="Nữ" v-model="gender2"/>
                <label for="nu">&ensp;Nữ</label>
              </div>
            </div>
            <div class="p-field p-col-12 p-sm-4 p-md-4" v-if="action2 == 'customer'">
                <label>Chọn khách hàng gởi</label>
                <MultiSelect v-model="listId" :options="listCustomer" optionLabel="name" placeholder="Chọn khách hàng" :filter="true">
                </MultiSelect>
                <small id="id-note2" class="p-error">* Vui lòng chọn danh sách khách hàng gởi</small>
            </div>
            <div class="p-field p-col-12 p-sm-4 p-md-4" v-if="action2 == 'age'">
              <!--              listIdMessage-->
              <label>Chọn phạm vi độ tuổi: {{age2}}</label>
              <h5></h5>
              <Slider v-model="age2" :range="true" />
            </div>
          </div>
          <Panel header="Thiết kế khung chính của tinh nhắn">
            <div class="p-fluid p-formgrid p-grid">
              <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                <label>Tiêu đề của khung chính</label>
                <Textarea id="titleMain" type="text" v-model="element1.title" />
              </div>
              <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                <label>Nội dung khung chính</label>
                <Textarea id="subtitleMain" type="text" v-model="element1.subtitle" />
              </div>
              <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                <label>Đường dẫn hình ảnh chính</label>
                <div class="p-inputgroup">
                  <Textarea id="imageUrlMain" type="text" v-model="element1.image_url" />
                  <Button label="chọn hình" @click="showListImage(1)"/>
                </div>
              </div>
              <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                <label>Link khung chính</label>
                <Textarea id="defaultUrl" type="text" v-model="element1.url" />
              </div>
            </div>
          </Panel>
          <Panel header="Thiết kế thành phần">
            <div class="p-fluid p-formgrid p-grid">
              <div class="p-field p-col p-col-12 p-md-12 p-lg-12">
              <Accordion :multiple="true" :activeIndex="[0,1]">
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
                        <Button label="chọn hình" @click="showListImage(2)"/>
                      </div>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Loại hành động tham số 1</label>
                      <Dropdown v-model="element2.type" :options="list" optionLabel="label" optionValue="param" showClear="true"></Dropdown>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element2.type == 1">
                      <label>Link của tham số 1</label>
                      <InputText id="defaultUrl1" type="text" v-model="element2.url" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="(element2.type == 2)||(element2.type == 3)">
                      <label>Nội dung tin nhắn của tham số 1</label>
                      <InputText id="automessage" type="text" v-model="element2.payload" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element2.type == 4">
                      <label>Nội dung tin nhắn sms 1</label>
                      <InputText id="smscontent" type="text" v-model="payload1.content" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="(element2.type == 4)||(element2.type == 5)">
                      <label>Thông tin số điện thoại 1</label>
        <!--              <InputNumber id="phonenumber" type="text" v-model="payload1.phone_code" mode="decimal" :useGrouping="false"/>-->
                      <InputMask mask="(9999)999999" v-model="payload1.phone_code" placeholder="" />
                    </div>
                  </div>
                </AccordionTab>
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
                        <Button label="chọn hình" @click="showListImage(3)"/>
                      </div>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Loại hành động tham số 2</label>
                      <Dropdown v-model="element3.type" :options="list" optionLabel="label" optionValue="param" showClear="true"></Dropdown>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element3.type == 1">
                      <label>Link của tham số 2</label>
                      <InputText id="defaultUrl2" type="text" v-model="element3.url" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="(element3.type == 2)||(element3.type == 3)">
                      <label>Nội dung tin nhắn của tham số 2</label>
                      <InputText id="automessage2" type="text" v-model="element3.payload" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element3.type == 4">
                      <label>Nội dung tin nhắn sms 2</label>
                      <InputText id="smscontent2" type="text" v-model="payload2.content" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="(element3.type == 4)||(element3.type == 5)">
                      <label>Thông tin số điện thoại 2</label>
                      <InputMask mask="(9999)999999" v-model="payload2.phone_code" placeholder="" />
                    </div>
                  </div>
                </AccordionTab>
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
                        <Button label="chọn hình" @click="showListImage(4)"/>
                      </div>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Loại hành động tham số 3</label>
                      <Dropdown v-model="element4.type" :options="list" optionLabel="label" optionValue="param" showClear="true"></Dropdown>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element4.type == 1">
                      <label>Link của tham số 3</label>
                      <InputText id="defaultUrl3" type="text" v-model="element4.url" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="(element4.type == 2)||(element4.type == 3)">
                      <label>Nội dung tin nhắn của tham số 3</label>
                      <InputText id="automessage3" type="text" v-model="element4.payload" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element4.type == 4">
                      <label>Nội dung tin nhắn sms 3</label>
                      <InputText id="smscontent3" type="text" v-model="payload3.content" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="(element4.type == 4)||(element4.type == 5)">
                      <label>Thông tin số điện thoại 3</label>
                      <InputMask mask="(9999)999999" v-model="payload3.phone_code" placeholder="" />
                    </div>
                  </div>
                </AccordionTab>
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
                        <Button label="chọn hình" @click="showListImage(5)"/>
                      </div>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                      <label>Loại hành động tham số 4</label>
                      <Dropdown v-model="element5.type" :options="list" optionLabel="label" optionValue="param" showClear="true"></Dropdown>
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element5.type == 1">
                      <label>Link của tham số 4</label>
                      <InputText id="defaultUrl4" type="text" v-model="element5.url" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="(element5.type == 2)||(element5.type == 3)">
                      <label>Nội dung tin nhắn của tham số 4</label>
                      <InputText id="automessage4" type="text" v-model="element5.payload" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="element5.type == 4">
                      <label>Nội dung tin nhắn sms 4</label>
                      <InputText id="smscontent4" type="text" v-model="payload4.content" />
                    </div>
                    <div class="p-field p-col p-col-12 p-md-6 p-lg-6" v-if="(element5.type == 4)||(element5.type == 5)">
                      <label>Thông tin số điện thoại 4</label>
                      <InputMask mask="(9999)999999" v-model="payload4.phone_code" placeholder="" />
                    </div>
                  </div>
                </AccordionTab>
              </Accordion>
            </div>
            </div>
          </Panel>
          <Button label="Gởi tin nhắn" icon="pi pi-plus-circle" iconPos="left" @click="doSendMessageWithAttachment()" :disabled="!valid2()"/>
      <!--  </Panel>-->
    </AccordionTab>
  </Accordion>
  <div class="p-field p-col-12 p-sm-12 p-md-12">
    <Dialog header="Gởi tin nhắn" v-model:visible="loadingBar" >
      <div id="loading">
        <label>Đang gởi tin nhắn, vui lòng chờ ...</label>
        <ProgressBar mode="indeterminate" style="height: .3em" />
      </div>
    </Dialog>
    <ConfirmDialog></ConfirmDialog>
  </div>
  <div class="card">
    <Dialog header="Tập tin lưu trên máy chủ" v-model:visible="show" >
      <DataView :value="products" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
        <template #grid="slotProps">
          <div class="col-6">
            <div class="product-list-item"  badge="8">
              <Card style="width: 170px; height: 170px;">
                <template #content>
                  <img :src=slotProps.data.link style="max-width: 150px" @click="imageClick(slotProps.data.link)"/>
                </template>
              </Card>
            </div>
          </div>
        </template>
      </DataView>
    </Dialog>
  </div>
</template>

<script lang="ts">

import { computed, ref } from 'vue'
import ZaloRepository from "@/services/ZaloRepository";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router'
import {Register} from "../models/register";
import {useStore} from "vuex";
import TeamRepository from "../services/TeamRepository";
import {Team} from "@/models/team.models";
import {Message} from "@/models/message";
import {MessageWithAttachment} from "@/models/messageWithAttachment";
import {ElementParamater} from "@/models/elementParamater";
import { ListCustomer } from '@/models/listCustomer';
import Province from "@/models/province.models";
import {ListImage} from "@/models/listImage";

export default {

  setup(){
    const router = useRouter();
    const register = ref({} as Register);
    const toast = useToast();
    const store = useStore();
    const error = ref(null);
    const message = ref({} as Message);
    const messageWithAttachment = ref({} as MessageWithAttachment);
    const element1 = ref({} as ElementParamater);
    const element2 = ref({} as ElementParamater);
    const element3 = ref({} as ElementParamater);
    const element4 = ref({} as ElementParamater);
    const element5 = ref({} as ElementParamater);
    const listId = ref([] as ListCustomer[]);
    const listIdMessage = ref([] as ListCustomer[]);
    const loadingBar = ref(false);
    const action = ref("");
    const gender = ref("");
    const age = ref([10,100]);
    const action2 = ref("");
    const gender2 = ref("");
    const age2 = ref([10,100]);
    const lsAction = ref([
        {label: 'Gởi tin nhắn cho từng khách hàng', value: 'customer'},
        {label: 'Gởi tin nhắn cho tất cả khách hàng', value: 'all'},
        {label: 'Gởi tin nhắn theo giới tính', value: 'gender'},
        {label: 'Gởi tin nhắn theo độ tuổi', value: 'age'},
        {label: 'Gởi tin nhắn theo khu vực', value: 'location'},
    ])
    const list = ref([
      { label: 'mở 1 link', value: 'oa.open.url' , param: 1},
      { label: 'gởi 1 tin nhắn đến OA', value: 'oa.query.show', param: 2},
      { label: 'gởi 1 tin nhắn ẩn đến OA', value: 'oa.query.hide', param: 3},
      { label: 'mở ứng dụng gởi sms với nội dung và sdt cho sẵn', value: 'oa.open.sms', param: 4},
      { label: 'mở ứng dụng gọi điện thoại với số cho sẵn', value: 'oa.open.phone', param: 5},
    ]);
    const listdefault = ref([
      { label: 'mở 1 link', value: 'oa.open.url' , param: 1},
    ]);
    const payload1 = ref({content: "", phone_code: ""});
    const payload2 = ref({content: "", phone_code: ""});
    const payload3 = ref({content: "", phone_code: ""});
    const payload4 = ref({content: "", phone_code: ""});
    const listCustomer = ref([] as ListCustomer[]);
    const listProvince = ref([] as Province[]);
    const province = ref();
    const province2 = ref();

    // const valid = computed(()=> action.value && message.value.mess);
    const valid = () => {
      return action.value && message.value.mess;
    };
    const valid2 = () => {
      return action2.value && element1.value.title && element1.value.subtitle && element1.value.image_url && element1.value.url;
    };
    element1.value.type = '1';

    // const returnValue = (st: any) => {
    //   const value = ref();
    //   value.value = list.value.filter(x => x.param == st);
    //   return value.value.value;
    // }
    ZaloRepository.getProvince()
        .then((response) => {
          listProvince.value = response.data;
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail:'Lỗi khi tải địa điểm',
            life: 2000
          });
        });
    ZaloRepository.getListCustomer()
        .then((response) => {
          listCustomer.value = response.data;
        })
        .catch(err => {
          toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail:'Lỗi khi tải danh sách khách hàng',
            life: 2000
          });
        });
    const doSendMessage = () => {
      if((listIdMessage.value.length < 1) && (action.value == "customer"))
      {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail:'Vui lòng chọn danh sách khách hàng cần gởi',
          life: 3000
        });
      }
      else
      {
        message.value.userid = "";
        listIdMessage.value.forEach(x => {
          message.value.userid = message.value.userid + x.id + ",";
        });
        if(action.value == "all")
        {
          message.value.userid = "all";
        }
        else if(action.value == "gender")
        {
          message.value.userid = "gender,";
          if(gender.value == "Nam") {
            message.value.userid = message.value.userid + "1";
          }
          else {
            message.value.userid = message.value.userid + "0";
          }
        }
        else if(action.value == "age")
        {
          message.value.userid = "age,";
          message.value.userid = message.value.userid + age.value[0]+",";
          message.value.userid = message.value.userid + age.value[1];
        }
        else if(action.value == "location")
        {
          message.value.userid = "location," + province.value;
        }
        loadingBar.value = true;
        ZaloRepository.sendMessage(message.value)
            .then((response) => {
              const temp = ref({} as Message);
              message.value = temp.value;
              toast.add({
                severity: 'success',
                summary: 'Gởi tin',
                detail: 'Gởi tin nhắn thành công',
                life: 2000
              });
              loadingBar.value = false;
            })
            .catch(err => {
              loadingBar.value = false;
              toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail:err.response.data,
                life: 2000
              });
            });
      }
      };

    const doSendMessageWithAttachment = () => {
      console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment listId lenght: " + listId.value.length);
      console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment listId: " + JSON.stringify(listId.value));
      if((listId.value.length < 1) && (action2.value == "customer"))
      {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail:'Vui lòng chọn danh sách khách hàng cần gởi',
          life: 3000
        });
      }
      else
      {
        messageWithAttachment.value.userid = "";
        listId.value.forEach(x => {
          messageWithAttachment.value.userid = messageWithAttachment.value.userid + x.id + ",";
        });
        if(action2.value == "all")
        {
          messageWithAttachment.value.userid = "all";
        }
        else if(action2.value == "gender")
        {
          messageWithAttachment.value.userid = "gender,";
          if(gender2.value == "Nam") {
            messageWithAttachment.value.userid = messageWithAttachment.value.userid + "1";
          }
          else {
            messageWithAttachment.value.userid = messageWithAttachment.value.userid + "0";
          }
        }
        else if(action2.value == "age")
        {
          messageWithAttachment.value.userid = "age,";
          messageWithAttachment.value.userid = messageWithAttachment.value.userid + age2.value[0]+",";
          messageWithAttachment.value.userid = messageWithAttachment.value.userid + age2.value[1];
        }
        else if(action2.value == "location")
        {
          messageWithAttachment.value.userid = "location," + province2.value;
        }
        loadingBar.value = true;
        const elements = ref([] as ElementParamater[]);
        if((element2.value.type == "4")||(element2.value.type == "5")) element2.value.payload = payload1.value;
        if((element3.value.type == "4")||(element3.value.type == "5")) element3.value.payload = payload2.value;
        if((element4.value.type == "4")||(element4.value.type == "5")) element4.value.payload = payload3.value;
        if((element5.value.type == "4")||(element5.value.type == "5")) element5.value.payload = payload4.value;
        if(element1.value.type != null)
          elements.value.push(element1.value);
        if(element2.value.type != null)
          elements.value.push(element2.value);
        if(element3.value.type != null)
          elements.value.push(element3.value);
        if(element4.value.type != null)
          elements.value.push(element4.value);
        if(element5.value.type != null)
          elements.value.push(element5.value);
        const elementstemp = ref([] as ElementParamater[]);
        elements.value.forEach(x => {
          elementstemp.value.push(
              {
                title: x.title,
                subtitle: x.subtitle,
                image_url: x.image_url,
                type: x.type,
                url: x.url,
                payload: x.payload
              }
          )
        })
        elementstemp.value.forEach(x => {
          list.value.filter(y => {if(y.param.toString() == x.type) x.type = y.value});
        });
        console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment elementstemp: " + JSON.stringify(elementstemp.value));
        messageWithAttachment.value.elements = elementstemp.value;
        console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment messageWithAttachment: " + JSON.stringify(messageWithAttachment.value));
        ZaloRepository.sendMessageWithAttachmentList(messageWithAttachment.value)
            .then((response) => {
              loadingBar.value = false;
              const temp = ref({} as MessageWithAttachment);
              messageWithAttachment.value = temp.value;
              toast.add({
                severity: 'success',
                summary: 'Gởi tin',
                detail: 'Gởi tin nhắn thành công',
                life: 2000
              });
              console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment messageWithAttachmentaaaaaa: " + JSON.stringify(messageWithAttachment.value));
            })
            .catch(err => {
              loadingBar.value = false;
              toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail:err.response.data,
                life: 2000
              });
              console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment messageWithAttachmentbbbbbb: " + JSON.stringify(messageWithAttachment.value));
            });
      }

    };
    const products = ref([] as ListImage[]);
    const layout = ref('grid');
    const show = ref(false);
    const getListImage = () => {
      ZaloRepository.getListImage()
          .then((response) => {
            products.value = response.data;
          })
          .catch(err => {
            // toast.add({
            //   severity: 'error',
            //   summary: 'Lỗi',
            //   detail:'Lỗi không tìm thấy hình ảnh',
            //   life: 2000
            // });
          });
    }

    getListImage();
    const index = ref(0);

    const imageClick = (link: string) => {
      console.log("############$$$$$$$$$$$$$$$$$$$$$ imageClick: " + link);
      show.value = false;
      link = link.replace("\\" , "/");
      console.log("############$$$$$$$$$$$$$$$$$$$$$ imageClick22222: " + link);
      link = "https://zalooa.kclvn.com/" + link;
      if(index.value == 2)
      {
        element2.value.image_url = link
      }
      else if(index.value == 3)
      {
        element3.value.image_url = link;
      }
      else if(index.value == 4)
      {
        element4.value.image_url = link;
      }
      else if(index.value == 5)
      {
        element5.value.image_url = link;
      }
      else if(index.value == 1)
      {
        element1.value.image_url = link;
      }
    }
    const showListImage = (i) => {
      show.value = true;
      index.value = i;
    }

    return {
      doSendMessage,
      valid,
      message,
      messageWithAttachment,
      doSendMessageWithAttachment,
      element1,
      element2,
      element3,
      element4,
      element5,
      list,
      payload1,
      payload2,
      payload3,
      payload4,
      listdefault,
      loadingBar,
      listCustomer,
      listId,
      listIdMessage,
      lsAction,
      action,
      gender,
      age,
      listProvince,
      province,
      province2,
      action2,
      gender2,
      age2,
      valid2,
      products,
      layout,
      showListImage,
      imageClick,
      show,
    }
  }
}

</script>
