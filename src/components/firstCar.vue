<template>
  <div>
    <Toast/>
    <div class="">

      <Card>
        <template v-slot:title>
          <div class="grid formgrid justify-content-center mb-8">

            First Car
          </div>
        </template>
        <template v-slot:subtitle>
          <div class="grid formgrid justify-content-center">
             Is this your first car ?
          </div>
        </template>
        <template v-slot:content>

          <div class="col-12 md:col-12 p-fluid ">
            <div class="card ">

              <div class="grid formgrid justify-content-center">

                <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                  <label for="car" class="fw-700 mb-3"> First Car</label>

                  <Dropdown id="car" v-model="v$.car.$model" :options="cars" optionLabel="name"
                            placeholder="Select ..." :filter="true" />
                </div>

              </div>
            </div>
          </div>

        </template>
        <template v-slot:footer>
          <div class="grid grid-nogutter justify-content-between">
            <i></i>
            <Button label="Next" @click="handleSubmit(!v$.$invalid)" icon="pi pi-angle-right" iconPos="right"/>
          </div>
        </template>
      </Card>

    </div>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent} from 'vue';
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {useUser} from '@/stores/user';
import {useUsers} from '@/stores/users';

export default defineComponent({

  setup(_, {emit}) {

    const state = reactive({
      car: {"name": "Yes", "code": true},

    });

    const cars = ref([
      {"name": "No", "code": false},
      {"name": "Yes", "code": true},
    ]);

    const submitted = ref(false);

    const rules = {
      car: {required},
    };

    const userStore = useUser();
    const toUsersStore = useUsers();


    const toast = useToast();

    const router = useRouter();

    const v$ = useVuelidate(rules, state);

    const handleSubmit = (isFormValid) => {
      submitted.value = true;

      const {car} = state;


      emit('next-page', {formData: state, pageIndex: 3});


      userStore.updateCar(
          car.code);

 if (car.code === true) {
        toast.add({
          severity: 'success',
          summary: 'Survey submitted',
          detail: 'We are targeting more experienced clients, thank you for your interest.',
          life: 5000
        });

        let deepCloneInfoUser = JSON.parse(JSON.stringify(userStore.getInfoUser));


        toUsersStore.addUser(deepCloneInfoUser);


        setTimeout(() => {
          router.push({name: "home"});

        }, 1000);

      } else if (car.code === false) {

      router.push({name: "driving"});

      }

      if (!isFormValid) {
        return;
      }

    }

    return {state, v$, handleSubmit, cars, submitted}
  }
})
</script>

<style scoped>
.fw-700 {
  font-weight: 700;
}
</style>