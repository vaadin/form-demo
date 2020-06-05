import { Router } from '@vaadin/router';

import './global-styles';
import './views/shop/shop-view';
import './views/orderform/order-form';
import './views/customerform/customer-form';
import './views/productform/product-form';
import './views/vaadin-elements/vaadin-elements-view';
import './views/vaadin-demo/vaadin-demo-view';
import './views/vaadin-demo/vaadin-person-view';

const routes = [
  {
    path: '', component: 'shop-view', children: [
      { path: '/', component: 'div' },
      { path: 'order/:id', component: 'order-form' },
      { path: 'order', component: 'order-form' },
      { path: 'customer/:id', component: 'customer-form' },
      { path: 'customer', component: 'customer-form' },
      { path: 'product/:id', component: 'product-form' },
      { path: 'product', component: 'product-form' },
      { path: 'vaadin', component: 'vaadin-elements-view' },
      { path: 'demo', component: 'vaadin-demo-view' },
      { path: 'person', component: 'vaadin-person-view' },
    ]
  },
];


export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);
