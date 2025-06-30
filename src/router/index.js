import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import HotelIndex from '@/views/hotels/HotelIndex.vue';
import HotelDetail from '@/views/hotels/HotelDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/hotels',
      name: 'hotels',
      component: HotelIndex
    },
    {
      path: '/hotels/:id',
      name: 'hotel-details',
      component: HotelDetail,
      props: true
    },  
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('@/views/rooms/RoomIndex.vue')
    }
  ]
});

export default router;