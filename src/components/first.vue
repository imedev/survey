<template>
  <div>
    <Toast/>

    <div class="">
      <Card>
        <template v-slot:title>
          <div class="grid formgrid justify-content-center mb-8">

            Personal Information
          </div>
        </template>
        <template v-slot:subtitle>
          <div class="grid formgrid justify-content-center">

            Enter your personal information
          </div>
        </template>
        <template v-slot:content>
          <div class="grid">
            <div class="col-12 md:col-12 p-fluid">
              <div class="card">

                <div class="grid formgrid">
                  <div class="col-12 mb-2 lg:col-6 lg:mb-0 flex justify-content-center">

                    <label for="age" class="fw-700 mb-3">Age</label>
                    <Knob v-model="state.age" :min="0" :max="100" id="age"/>

                  </div>
                  <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                    <label for="gender" class="fw-700 mb-3">Gender</label>

                    <Dropdown id="gender" v-model="v$.gender.$model" :options="genders"
                              placeholder="Select a gender" :filter="true" filterPlaceholder="Find gender"/>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </template>
        <template v-slot:footer>
          <div class="grid grid-nogutter justify-content-between">
            <i></i>
            <Button label="Next" @click.prevent="handleSubmit(!v$.$invalid)" icon="pi pi-angle-right" iconPos="right"/>
          </div>
        </template>

      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed} from 'vue';
import {between, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useToast} from "primevue/usetoast";
import {useRouter} from 'vue-router';
import {useUser} from '@/stores/user';
import {useUsers} from '@/stores/users';

export default defineComponent({

  setup(_, {emit}) {

    const state = reactive({
      gender: "M",
      age: 0,
    });
    const genders = ref(["M", "F", "Other"]);

    const userStore = useUser();
    const toUsersStore = useUsers();

    let submitted = ref(false);

    const rules = {
      gender: {required},
      age: {betweenValue: between(0, 100),}

    };
    const toast = useToast();

    const v$ = useVuelidate(rules, state);
    const router = useRouter();

    const handleSubmit = (isFormValid) => {

      const {gender, age} = state;

      submitted.value = true;

      emit('next-page', {formData: state, pageIndex: 0});


      if (!isFormValid) {
        console.log(isFormValid);
        return;
      } else {


        userStore.updatePersonal(
            Math.random().toString(36).slice(-8),
            gender,
            age
        )

        let deepCloneInfoUser = JSON.parse(JSON.stringify(userStore.getInfoUser));


        if (state.age < 18) {
          toast.add({
            severity: 'success',
            summary: 'Survey submitted',
            detail: 'Dear, hank you . Survey completed.'
          });


          toUsersStore.addUser(deepCloneInfoUser);


          setTimeout(() => {
            router.push({name: "home"});

          }, 1000);
        } else if(state.age > 18 && state.age < 25){
          router.push({name: "first-car"});

        } 
        else {
          router.push({name: "driving"});
        }
      }
    }
    return {state, v$, handleSubmit, genders, submitted}
  }
})
</script>
<style>
.fw-700 {
  font-weight: 700;
}
</style>