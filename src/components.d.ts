import { FormGroup } from './modules/app/ui/components/form';

import { AppBaseDropdown, AppBaseBreadcrumb, AppBaseImage, AppBaseLabel } from './modules/app/ui/components/base';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // Router
    RouterLink: typeof import('vue-router')['RouterLink'];
    RouterView: typeof import('vue-router')['RouterView'];

    // Form
    FormGroup: typeof FormGroup;

    // Base Components
    AppBaseImage: typeof AppBaseImage;
    AppBaseLabel: typeof AppBaseLabel;
    AppBaseBreadcrumb: typeof AppBaseBreadcrumb;
    AppBaseDropdown: typeof AppBaseDropdown;

    // PrimeVue
    Autocomplete: typeof import('primevue/autocomplete')['default'];
    Accordion: typeof import('primevue/accordion')['default'];
    AccordionTab: typeof import('primevue/accordion')['default'];
    Avatar: typeof import('primevue/avatar')['default'];
    AvatarGroup: typeof import('primevue/avatargroup')['default'];
    Badge: typeof import('primevue/badge')['default'];
    BlockUI: typeof import('primevue/blockui')['default'];
    Button: typeof import('primevue/button')['default'];
    Breadcrumb: typeof import('primevue/breadcrumb')['default'];
    Calendar: typeof import('primevue/calendar')['default'];
    Card: typeof import('primevue/card')['default'];
    CascadeSelect: typeof import('primevue/cascadeselect')['default'];
    Carousel: typeof import('primevue/carousel')['default'];
    Checkbox: typeof import('primevue/checkbox')['default'];
    Chips: typeof import('primevue/chips')['default'];
    Chip: typeof import('primevue/chip')['default'];
    ColorPicker: typeof import('primevue/colorpicker')['default'];
    Column: typeof import('primevue/column')['default'];
    ColumnGroup: typeof import('primevue/columngroup')['default'];
    ConfirmDialog: typeof import('primevue/confirmdialog')['default'];
    ConfirmPopup: typeof import('primevue/confirmpopup')['default'];
    ConfirmationService: typeof import('primevue/confirmationservice')['default'];
    ContextMenu: typeof import('primevue/contextmenu')['default'];
    DataTable: typeof import('primevue/datatable')['default'];
    DataView: typeof import('primevue/dataview')['default'];
    DataViewLayoutOptions: typeof import('primevue/dataviewlayoutoptions')['default'];
    DeferredContent: typeof import('primevue/deferredcontent')['default'];
    Dialog: typeof import('primevue/dialog')['default'];
    Divider: typeof import('primevue/divider')['default'];
    Dock: typeof import('primevue/dock')['default'];
    Dropdown: typeof import('primevue/dropdown')['default'];
    DynamicDialog: typeof import('primevue/dynamicdialog')['default'];
    Fieldset: typeof import('primevue/fieldset')['default'];
    FileUpload: typeof import('primevue/fileupload')['default'];
    Galleria: typeof import('primevue/galleria')['default'];
    Image: typeof import('primevue/image')['default'];
    InlineMessage: typeof import('primevue/inlinemessage')['default'];
    InputMask: typeof import('primevue/inputmask')['default'];
    InputNumber: typeof import('primevue/inputnumber')['default'];
    InputSwitch: typeof import('primevue/inputswitch')['default'];
    InputText: typeof import('primevue/inputtext')['default'];
    Knob: typeof import('primevue/knob')['default'];
    ListBox: typeof import('primevue/listbox')['default'];
    MegaMenu: typeof import('primevue/megamenu')['default'];
    Menu: typeof import('primevue/menu')['default'];
    Menubar: typeof import('primevue/menubar')['default'];
    Message: typeof import('primevue/message')['default'];
    MultiSelect: typeof import('primevue/multiselect')['default'];
    OrderList: typeof import('primevue/orderlist')['default'];
    OrganizationChart: typeof import('primevue/organizationchart')['default'];
    OverlayPanel: typeof import('primevue/overlaypanel')['default'];
    Paginator: typeof import('primevue/paginator')['default'];
    Panel: typeof import('primevue/panel')['default'];
    PanelMenu: typeof import('primevue/panelmenu')['default'];
    Password: typeof import('primevue/password')['default'];
    PickList: typeof import('primevue/picklist')['default'];
    ProgressBar: typeof import('primevue/progressbar')['default'];
    ProgressSpinner: typeof import('primevue/progressspinner')['default'];
    RadioButton: typeof import('primevue/radiobutton')['default'];
    Rating: typeof import('primevue/rating')['default'];
    Row: typeof import('primevue/row')['default'];
    SelectButton: typeof import('primevue/selectbutton')['default'];
    ScrollPanel: typeof import('primevue/scrollpanel')['default'];
    ScrollTop: typeof import('primevue/scrolltop')['default'];
    Slider: typeof import('primevue/slider')['default'];
    Sidebar: typeof import('primevue/sidebar')['default'];
    Skeleton: typeof import('primevue/skeleton')['default'];
    SpeedDial: typeof import('primevue/speeddial')['default'];
    SplitButton: typeof import('primevue/splitbutton')['default'];
    Splitter: typeof import('primevue/splitter')['default'];
    SplitterPanel: typeof import('primevue/splitterpanel')['default'];
    Steps: typeof import('primevue/steps')['default'];
    TabMenu: typeof import('primevue/tabmenu')['default'];
    TabPanel: typeof import('primevue/tabpanel')['default'];
    Tag: typeof import('primevue/tag')['default'];
    Textarea: typeof import('primevue/textarea')['default'];
    Terminal: typeof import('primevue/terminal')['default'];
    TieredMenu: typeof import('primevue/tieredmenu')['default'];
    Timeline: typeof import('primevue/timeline')['default'];
    Toast: typeof import('primevue/toast')['default'];
    Toolbar: typeof import('primevue/toolbar')['default'];
    ToggleButton: typeof import('primevue/togglebutton')['default'];
    Tree: typeof import('primevue/tree')['default'];
    TreeSelect: typeof import('primevue/treeselect')['default'];
    TreeTable: typeof import('primevue/treetable')['default'];
    TriStateCheckbox: typeof import('primevue/tristatecheckbox')['default'];
    VirtualScroller: typeof import('primevue/virtualscroller')['default'];
  }
}

export {};
