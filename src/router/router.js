import Vue from 'vue'
import Router from 'vue-router'
import Info from '../components/Info.vue'
import Contacts from '../components/Contacts.vue'
Vue.use(Router);
let router = new Router({
    mode: 'history',
    routes: [{
            path: '',
            name: 'contacts',
            component: Contacts,
            props: true
        },
        {
            path: '/info/:id',
            name: 'info',
            component: Info,
            props: true,
        }
    ],
})
export default router;