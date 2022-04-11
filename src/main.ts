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
import ProgressBar from 'primevue/progressbar';
import InputMask from "primevue/inputmask";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import MultiSelect from 'primevue/multiselect';
import Slider from 'primevue/slider';
import cors from 'cors';

const app = createApp(App)
  .use(store)
  .use(router)
    .use(PrimeVue, {locale: {
            startsWith: 'Starts with',
            contains: 'Contains',
            notContains: 'Not contains',
            endsWith: 'Ends with',
            equals: 'Equals',
            notEquals: 'Not equals',
            noFilter: 'No Filter',
            lt: 'Less than',
            lte: 'Less than or equal to',
            gt: 'Greater than',
            gte: 'Greater than or equal to',
            dateIs: 'Date is',
            dateIsNot: 'Date is not',
            dateBefore: 'Date is before',
            dateAfter: 'Date is after',
            clear: 'Xoá',
            apply: 'Apply',
            matchAll: 'Match All',
            matchAny: 'Match Any',
            addRule: 'Add Rule',
            removeRule: 'Remove Rule',
            accept: 'Yes',
            reject: 'No',
            choose: 'Choose',
            upload: 'Upload',
            cancel: 'Cancel',
            dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
            dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            monthNames: ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],
            monthNamesShort: ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],
            today: 'Hôm nay',
            weekHeader: 'Wk',
            firstDayOfWeek: 0,
            dateFormat: 'mm/dd/yy',
            weak: 'Weak',
            medium: 'Medium',
            strong: 'Strong',
            passwordPrompt: 'Enter a password',
            emptyFilterMessage: 'No results found',
            emptyMessage: 'No available options'
        }})
  .use(ConfirmationService)
  .use(ToastService);

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
app.component('ProgressBar', ProgressBar);
app.component('InputMask', InputMask);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('MultiSelect', MultiSelect);
app.component('Slider', Slider);
app.use(quillEditor)
app.mount('#app');

