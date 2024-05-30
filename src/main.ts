import '@/assets/css/tailwind.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/route'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

createApp(App)
    .use(Antd)
    .use(router)
    .mount('#app')
