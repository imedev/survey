<template>
  <div>
    <div class="mb-8 flex justify-content-center">

      <Button label="Let's Start " class="p-button-outlined text-center" @click="beginSurvey"/>


    </div>

    <div class="grid">


      <div class="col-12 lg:col-3 md:col-3 xs:col-12">
        <div class="card p-8">
          <strong> Adolescents Users : {{ adolescentsUsers }} </strong>

        </div>
      </div>

      <div class="col-12 lg:col-3 md:col-3 xs:col-12">
        <div class="card p-8">
          <strong>Targetables Users : {{ targetablesUsers }} </strong>

        </div>
      </div>

      <div class="col-12 lg:col-3 md:col-3 xs:col-12">
        <div class="card p-8">
          <strong>First timers Users : {{ firstimersUsers }} </strong>

        </div>
      </div>

      <div class="col-12 lg:col-3 md:col-3 xs:col-12">
        <div class="card p-8">
          <strong> Unlicensed Users : {{ unlicensedUsers }} </strong>

        </div>
      </div>


    </div>
    <div class="grid">


      <div class="col-12 lg:col-6 md:col-6 xs:col-12">
        <div class="card p-8">
          <BarChart :percentAdolescentsUsers=percentAdolescentsUsers
                    :fuelEmissionUsers=percentFuelEmissionUsers
                    :filterByDrivetrainUsers=percentfilterByDrivetrainUsers />

        </div>
      </div>


      <div class="col-12 lg:col-6 md:col-6 xs:col-12">
        <div class="card p-8">
          <DoughnutChart :percentAdolescentsUsers=percentAdolescentsUsers
                         :unlicensed-users=percentUnlicensedUsers
                         :firstimers-users=percentFirstimersUsers />

        </div>
      </div>
    </div>

    <div class="grid">


      <div class="col-12 lg:col-6 md:col-6 xs:col-12">
        <div class="card p-8">
          <polar-area-chart :percentAdolescentsUsers=percentAdolescentsUsers
                            :unlicensed-users=percentUnlicensedUsers
                            :firstimers-users=percentFirstimersUsers />
        </div>
      </div>


      <div class="col-12 lg:col-6 md:col-6 xs:col-12">
        <div class="card p-8">
          <radar-chart :percentAdolescentsUsers=percentAdolescentsUsers
                       :fuelEmissionUsers=percentFuelEmissionUsers
                       :filterByDrivetrainUsers=percentfilterByDrivetrainUsers />
        </div>
      </div>
    </div>
  </div>

</template>


<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import BarChart from '@/components/Charts/barChat'
import DoughnutChart from '@/components/Charts/doghnut'
import PolarAreaChart from '@/components/Charts/polar'
import RadarChart from '@/components/Charts/radar'
import {useUsers} from '@/stores/users';

export default defineComponent({
  name: "home",
  components: {
    BarChart,
    DoughnutChart,
    PolarAreaChart,
    RadarChart,
  },

  setup() {
    const router = useRouter();

// list users from pinia state management
    const listUserStore = useUsers();

    // check if we have users in localstorage
    const usersFromLocalStorageExist = localStorage.getItem('users');
    let targetablesUsers = listUserStore.getargetablesUsers;
    let listUsers = listUserStore.getUsers;


    if (usersFromLocalStorageExist && targetablesUsers === 0) {
      const usersFromLocalStorage = JSON.parse(localStorage.getItem('users'));

      targetablesUsers = usersFromLocalStorage.length;
      listUsers = usersFromLocalStorage
        listUserStore.$state.users = listUsers;

    }

     let adolescentsUsers = listUserStore.getadolescentsUsers;
     let firstimersUsers = listUserStore.getfirstimersUsers;
     let unlicensedUsers = listUserStore.getunlicensedUsers;
     let fuelEmissionUsers = listUserStore.getFuelEmissionUsers;
     let filterByDrivetrainUsers = listUserStore.getFilterByDrivetrainUsers;



    const percentage = (num: number, per: number) => {
      return (num / 100) * per;
    }

// percentages
    const percentAdolescentsUsers = percentage(targetablesUsers, adolescentsUsers);
    const percentFirstimersUsers = percentage(targetablesUsers, firstimersUsers)
    const percentUnlicensedUsers = percentage(targetablesUsers, unlicensedUsers);
    const percentFuelEmissionUsers = percentage(targetablesUsers, fuelEmissionUsers);
    const percentfilterByDrivetrainUsers = percentage(targetablesUsers, filterByDrivetrainUsers);


// persist the whole state to the local storage whenever it changes
    listUserStore.$subscribe((mutation, state) => {


      localStorage.setItem('users', JSON.stringify(state.users));


    }, {detached: true})

// begin survey 
    const beginSurvey = () => {
      router.push({name: "begin"});
    }

    return {
      beginSurvey,
      percentage,
      percentAdolescentsUsers,
      percentFirstimersUsers,
      percentUnlicensedUsers,
      percentFuelEmissionUsers,
      percentfilterByDrivetrainUsers,
      adolescentsUsers,
      targetablesUsers,
      firstimersUsers,
      unlicensedUsers

    };
  }
});


</script>

<style scoped>

</style>