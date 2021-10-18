import 'primeflex/primeflex.css';
import 'typeface-roboto/index.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Password from 'primevue/password';
import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';
import Chart from 'primevue/chart';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import ConfirmPopup from 'primevue/confirmpopup';
import Textarea from 'primevue/textarea';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from "primevue/confirmdialog";
import { quillEditor, Quill } from 'vue3-quill';
import ProcessSpinner from 'primevue/progressspinner';
import QrcodeVue from "qrcode.vue";
import QrReader from 'vue3-qr-reader';
import cors from 'cors';

const app = createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService)
  .use(QrReader);

console.log("ENV = " + process.env.NODE_ENV);

app.component('Dialog', Dialog);
app.component('Textarea', Textarea);
app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('RadioButton', RadioButton);
app.component('Checkbox', Checkbox);
app.component('Calendar', Calendar);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Toast', Toast);
app.component('Panel', Panel);
app.component('Chart', Chart);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Dropdown', Dropdown);
app.component('Menubar', Menubar);
app.component('Message', Message);
app.component('InputNumber', InputNumber);
app.component('Password', Password);
app.component('ConfirmPopup', ConfirmPopup);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ProcessSpinner', ProcessSpinner);
app.use(quillEditor)
app.mount('#app');

