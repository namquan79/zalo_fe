<template>
  <Accordion :activeIndex="0">
    <AccordionTab header="Gởi tin nhắn thông thường">
<!--      <Panel header="Gởi tin nhắn thông thường cho người sử dụng">-->
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
              <label>Id người muốn gởi</label>
              <Textarea id="id" type="text" v-model="message.userid" style="height: 100px"/>
              <small id="id-note" class="p-error">* Có thể gởi nhiều id cùng 1 lúc(mỗi id cách nhau bằng dấu ","), vd: 000000001,000000002.</small>
            </div>
            <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
              <label>Nội dung tin nhắn</label>
              <Textarea id="message" type="text" v-model="message.mess" style="height: 100px"/>
            </div>
          </div>
          <Button label="Gởi tin nhắn" icon="pi pi-plus-circle" iconPos="left" @click="doSendMessage()" />
<!--      </Panel>-->
    </AccordionTab>
    <AccordionTab header="Gởi tin nhắn theo mẫu đính kèm">
<!--        <Panel header="Gởi tin nhắn theo mẫu đính kèm cho người sử dụng">-->
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
              <label>Id người muốn gởi</label>
              <Textarea id="iduser" type="text" v-model="messageWithAttachment.userid" style="height: 100px"/>
              <small id="id-note2" class="p-error">* Có thể gởi nhiều id cùng 1 lúc(mỗi id cách nhau bằng dấu ","), vd: 000000001,000000002.</small>
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
                <Textarea id="imageUrlMain" type="text" v-model="element1.image_url" />
              </div>
              <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                <label>Link khung chính</label>
                <Textarea id="defaultUrl" type="text" v-model="element1.url" />
              </div>
            </div>
          </Panel>
          <Panel header="Thiết kế thành phần">
            <div class="p-fluid p-formgrid p-grid">
              <panel header="Tham số 1">
                <div class="p-fluid p-formgrid p-grid">
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Tiêu đề của tham số 1</label>
                    <InputText id="title1" type="text" v-model="element2.title" />
                  </div>
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Đường dẫn hình ảnh của tham số 1</label>
                    <InputText id="imageUrl1" type="text" v-model="element2.image_url" />
                  </div>
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Loại hành động tham số 1</label>
                    <Dropdown v-model="element2.type" :options="list" optionLabel="label" optionValue="param"></Dropdown>
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
              </panel>
              <panel header="Tham số 2">
                <div class="p-fluid p-formgrid p-grid">
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Tiêu đề của tham số 2</label>
                    <InputText id="title2" type="text" v-model="element3.title" />
                  </div>
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Đường dẫn hình ảnh của tham số 2</label>
                    <InputText id="imageUrl2" type="text" v-model="element3.image_url" />
                  </div>
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Loại hành động tham số 2</label>
                    <Dropdown v-model="element3.type" :options="list" optionLabel="label" optionValue="param"></Dropdown>
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
              </panel>
              <panel header="Tham số 3">
                <div class="p-fluid p-formgrid p-grid">
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Tiêu đề của tham số 3</label>
                    <InputText id="title3" type="text" v-model="element4.title" />
                  </div>
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Đường dẫn hình ảnh của tham số 3</label>
                    <InputText id="imageUrl3" type="text" v-model="element4.image_url" />
                  </div>
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Loại hành động tham số 3</label>
                    <Dropdown v-model="element4.type" :options="list" optionLabel="label" optionValue="param"></Dropdown>
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
              </panel>
              <panel header="Tham số 4">
                <div class="p-fluid p-formgrid p-grid">
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Tiêu đề của tham số 4</label>
                    <InputText id="title4" type="text" v-model="element5.title" />
                  </div>
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Đường dẫn hình ảnh của tham số 4</label>
                    <InputText id="imageUrl4" type="text" v-model="element5.image_url" />
                  </div>
                  <div class="p-field p-col p-col-12 p-md-6 p-lg-6">
                    <label>Loại hành động tham số 4</label>
                    <Dropdown v-model="element5.type" :options="list" optionLabel="label" optionValue="param"></Dropdown>
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
              </panel>
            </div>
          </Panel>
          <Button label="Gởi tin nhắn" icon="pi pi-plus-circle" iconPos="left" @click="doSendMessageWithAttachment()" />
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
    const loadingBar = ref(false);
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

    const valid = computed(()=> register.value.password && register.value.username && register.value.team && register.value.fullname && register.value.address);
    element1.value.type = '1';

    const returnValue = (st: any) => {
      const value = ref();
      value.value = list.value.filter(x => x.param == st);
      return value.value.value;
    }
    const doSendMessage = () => {
      loadingBar.value = true;
      ZaloRepository.sendMessage(message.value)
                .then((response) => {
                  const temp = ref({} as Message);
                  message.value = temp.value;
                  toast.add({
                    severity: 'success',
                    summary: 'Đăng ký',
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
      };

    const doSendMessageWithAttachment = () => {
      loadingBar.value = true;
      const elements = ref([] as ElementParamater[]);
      if((element2.value.type == "4")||(element2.value.type == "5")) element2.value.payload = payload1.value;
      if((element3.value.type == "4")||(element3.value.type == "5")) element3.value.payload = payload2.value;
      if((element4.value.type == "4")||(element4.value.type == "5")) element4.value.payload = payload3.value;
      if((element5.value.type == "4")||(element5.value.type == "5")) element5.value.payload = payload4.value;
      console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment element1: " + JSON.stringify(element1.value));
      console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment element2: " + JSON.stringify(element2.value));
      console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment element3: " + JSON.stringify(element3.value));
      console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment element4: " + JSON.stringify(element4.value));
      console.log("@@@@@@@@@@@@@@@@#################### doSendMessageWithAttachment element5: " + JSON.stringify(element5.value));
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
              summary: 'Đăng ký',
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
    };

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
    }
  }
}

</script>
