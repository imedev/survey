<template>
  <div>
    <Toast/>
    <div class="">

      <Card>
        <template v-slot:title>
          <div class="grid formgrid justify-content-center mb-8">

            Driving License
          </div>
        </template>
        <template v-slot:subtitle>
          <div class="grid formgrid justify-content-center">
            Do you own a car driving license?
          </div>
        </template>
        <template v-slot:content>

          <div class="col-12 md:col-12 p-fluid ">
            <div class="card ">

              <div class="grid formgrid justify-content-center">

                <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                  <label for="license" class="fw-700 mb-3">License</label>

                  <Dropdown id="license" v-model="v$.license.$model" :options="licenses" optionLabel="name"
                            placeholder="Select a license" :filter="true" filterPlaceholder="Find license"/>
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
      license: {"name": "Yes", "code": true},

    });

    const licenses = ref([
      {"name": "No, I prefer using other transport", "code": false},
      {"name": "Yes", "code": true},
    ]);

    const submitted = ref(false);

    const rules = {
      license: {required},
    };

    const userStore = useUser();
    const toUsersStore = useUsers();


    const toast = useToast();

    const router = useRouter();

    const v$ = useVuelidate(rules, state);

    const handleSubmit = (isFormValid) => {
      submitted.value = true;

      const {license} = state;


      emit('next-page', {formData: state, pageIndex: 1});


      userStore.updateLicense(
          license.code);


      if (license.code === false) {
        toast.add({
          severity: 'success',
          summary: 'Survey submitted',
          detail: 'Dear, Thank you . Survey completed.'
        });

        let deepCloneInfoUser = JSON.parse(JSON.stringify(userStore.getInfoUser));


        toUsersStore.addUser(deepCloneInfoUser);


        setTimeout(() => {
          router.push({name: "home"});

        }, 1000);

      } else if (license.code === true) {
        router.push({name: "car"});

      }

      if (!isFormValid) {
        return;
      }

    }

    return {state, v$, handleSubmit, licenses, submitted}
  }
})
</script>

<style scoped>
.fw-700 {
  font-weight: 700;
}
</style>