<template>
  <div>
    <Toast/>
    <div class="">

      <Card>
        <template v-slot:title >
          <div class="grid formgrid justify-content-center mb-8">

          Car Informations
          </div>
        </template>

        <template v-slot:content>

          <div class="col-12 md:col-12 p-fluid">
            <div class="card">

              <div class="grid formgrid">

                <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                  <label for="drivetrain" class="fw-700 mb-3">Which drivetrain <br> do you prefer ?</label>

                  <Dropdown id="drivetrain" v-model="v$.drivetrain.$model" :options="drivetrains" optionLabel="name"
                            placeholder="Select a drivetrain" :filter="true" filterPlaceholder="Find drivetrain"/>
                </div>
                <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                  <label for="fuel" class="fw-700 mb-3">Are you worried about <br> fuel emissions?</label>

                  <Dropdown id="fuel" v-model="v$.fuel.$model" :options="fuels" optionLabel="name" placeholder="Select "
                            :filter="true" filterPlaceholder="Find ..."/>
                </div>

                <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                  <label for="countCars" class="fw-700"> How many cars <br>do you
                    have in
                    your family?
                  </label>
                  <InputNumber id="countCars" v-model="v$.countCars.$model" max="5"
                               :class="{'p-invalid':v$.countCars.$invalid && submitted}"/>
                  <small v-if="v$.countCars.$invalid && submitted"
                         class="p-error">{{ v$.countCars.required.$message.replace('Value', 'count Cars') }}</small>

                </div>

                <div class="col-12 mb-2 lg:col-6 lg:mb-0">

                </div>

                <div class="col-12 mb-2 mt-4 lg:col-12 lg:mb-0" >
                  <div
                      v-for="(carInfo, counter) in state.carInfos"
                      v-bind:key="counter">


                    <div class="col-6 mb-2 mt-4 lg:col-6 lg:mb-0">
                      <div class="field">
                        <div class="p-float-label">
                          <label for="carBrand" class="fw-700">
                            Choose Car Brand
                          </label>
                          <Dropdown id="carBrand" v-model.lazy="carInfo.carBrand" :options="brands" optionLabel="name"
                                    placeholder="Select "
                                    :filter="true" filterPlaceholder="Find ..."/>

                        </div>

                        <small v-if="(v$.carBrand.$invalid && submitted) || v$.carBrand.$pending.$response"
                               class="p-error">{{ v$.carBrand.required.$message.replace('Value', 'car Brand') }}</small>

                      </div>
                    </div>

                    <div class="col-6 mb-2 mt-4 lg:col-6 lg:mb-0">

                      <label for="carModel" class="fw-700">Insert Car Model</label>
                      <InputText id="carModel" v-model.lazy="carInfo.carModel"/>


                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </template>
        <template v-slot:footer>
          <div class="grid grid-nogutter justify-content-between">
            <i></i>
            <Button label="Complete" @click="handleSubmit(!v$.$invalid)" icon="pi pi-angle-right" iconPos="right"/>
          </div>
        </template>
      </Card>

    </div>
  </div>

</template>

<script lang="ts">
import {reactive, ref, defineComponent, watch} from 'vue';
import {between, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useToast} from "primevue/usetoast";
import {useRouter} from 'vue-router';
import {useUser} from '@/stores/user';
import {useUsers} from '@/stores/users';

export default defineComponent({

  setup(_, {emit}) {

    const state = reactive({
      fuel: {},
      drivetrain: {},
      countCars: 0,
      carInfos: [],

      existsCars: false

    });
    const drivetrains = ref([
      {"name": "FWD", "code": "FWD"},
      {"name": "RWD", "code": "RWD"},
      {"name": "I don’t know", "code": "No"}
    ]);

    const fuels = ref([
      {"name": "No", "code": false},
      {"name": "Yes", "code": true},
    ]);

    const brands = [
      {"name": "BMW", "code": "bmw"},
      {"name": "Fiat ", "code": "Punto"},
      {"name": "Peugeot ", "code": "Peugeot"},
      {"name": "Renault ", "code": "Renault"},

    ];

    const userStore = useUser();
    const toUsersStore = useUsers();

    let submitted = ref<boolean>(false);

    const rules = {
      drivetrain: {required},
      fuel: {required},
      countCars: {required, minValue: minLength(0),},
      carModel: {},
      carBrand: {}
    };


    const addCarInfo = watch(
        () => ({...state}),
        (value, oldValue, onInvalidate) => {
          console.log(value, oldValue)
          if (value.countCars > 0 && oldValue.countCars !== value.countCars  ) {

            value.existsCars = true;
            state.carInfos = []
            for(let i = 0; i < value.countCars; i++) {
              state.carInfos.push({

                carModel: "",
                carBrand: ""

              })
            }
          }

          onInvalidate(() => console.log("value, oldValue"));
        }
    );
    const toast = useToast();
    const router = useRouter();


    const v$ = useVuelidate(rules, state);

    const handleSubmit = (isFormValid) => {

      const {
        fuel,
        drivetrain,
        countCars,
        carInfos
      } = state;

      submitted.value = true;

      emit('complete', {formData: state});


      if (!isFormValid) {
        return;
      } else {

        userStore.updateCarInfos(
            fuel,
            drivetrain,
            countCars,
            carInfos);


        let deepCloneInfoUser = JSON.parse(JSON.stringify(userStore.getInfoUser));


        setTimeout(() => {
          toUsersStore.addUser(deepCloneInfoUser);

        }, 3000);

        setTimeout(() => {
          router.push({name: "home"});

        }, 3000);

      }

    }


    return {state, v$, handleSubmit, fuels, drivetrains, submitted, brands, addCarInfo}
  }
})
</script>

<style scoped>
.fw-700 {
  font-weight: 700;
}
</style>