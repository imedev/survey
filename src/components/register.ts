import { App } from 'vue';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import "primeflex/primeflex.css";

import PrimeVue from "primevue/config";
import Badge from 'primevue/badge';
import BadgeDirective from "primevue/badgedirective";
import BlockUI from 'primevue/blockui';
import Button from 'primevue/button';
import Card from 'primevue/card';
import CascadeSelect from 'primevue/cascadeselect';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Chips from 'primevue/chips';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import InlineMessage from 'primevue/inlinemessage';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Knob from 'primevue/knob';
import Listbox from 'primevue/listbox';
import Menu from 'primevue/menu';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import RadioButton from 'primevue/radiobutton';
import Row from 'primevue/row';
import Steps from 'primevue/steps';
import StyleClass from 'primevue/styleclass';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tooltip from 'primevue/tooltip';

export function registerComponents(app: App): void {

	app.component('Button', Button);
	app.component('Steps', Steps);
	app.component('InputText', InputText);
	app.component('InputMask', InputMask);
	app.component('InputNumber', InputNumber);
	app.component('Card', Card);
	app.component('Dropdown', Card);



	app.use(PrimeVue, { ripple: true });
	app.use(ConfirmationService);
	app.use(ToastService);

	app.directive('tooltip', Tooltip);
	app.directive('badge', BadgeDirective);
	app.directive('styleclass', StyleClass);

	app.component('Badge', Badge);
	app.component('BlockUI', BlockUI);
	app.component('Button', Button);
	app.component('Card', Card);
	app.component('CascadeSelect', CascadeSelect);
	app.component('Checkbox', Checkbox);
	app.component('Chip', Chip);
	app.component('Chips', Chips);
	app.component('Column', Column);
	app.component('ColumnGroup', ColumnGroup);
	app.component('ConfirmDialog', ConfirmDialog);
	app.component('ConfirmPopup', ConfirmPopup);
	app.component('DataView', DataView);
	app.component('Dialog', Dialog);
	app.component('Divider', Divider);
	app.component('Dropdown', Dropdown);
	app.component('Image', Image);
	app.component('InlineMessage', InlineMessage);
	app.component('InputMask', InputMask);
	app.component('InputNumber', InputNumber);
	app.component('InputSwitch', InputSwitch);
	app.component('InputText', InputText);
	app.component('Knob', Knob);
	app.component('Listbox', Listbox);
	app.component('Menu', Menu);
	app.component('Message', Message);
	app.component('MultiSelect', MultiSelect);
	app.component('RadioButton', RadioButton);
	app.component('Row', Row);
	app.component('Steps', Steps);
	app.component('TabView', TabView);
	app.component('TabPanel', TabPanel);
	app.component('Textarea', Textarea);
	app.component('Toast', Toast);
	app.component('Toolbar', Toolbar);

}





