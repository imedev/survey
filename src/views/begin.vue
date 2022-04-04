<template>

  <div class="box-card">
    <Toast/>

    <div class="card">
      <Steps :model="items" :readonly="true"/>
    </div>

    <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)"
                 @complete="complete">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </div>

</template>

<script lang="ts">
import {useRouter} from 'vue-router';
import {useI18n} from "vue-i18n";
import {useToast} from "primevue/usetoast";
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "begin",
  setup() {
    const {t} = useI18n();


    const router = useRouter();
    const toast = useToast();
    const items = ref([
      {
        label: 'Personal',
        to: "/first"
      },
      {
        label: 'Driving',
        to: "/driving",
      },
      {
        label: 'Car',
        to: "/car",
      },
         {
        label: 'Car',
        to: "/first-car",
      },


    ]);
    const formObject = ref({});

    const nextPage = (event) => {
      for (let field in event.formData) {
        formObject.value[field] = event.formData[field];
      }

      router.push(items.value[event.pageIndex + 1].to);
    };
    const prevPage = (event) => {
      router.push(items.value[event.pageIndex - 1].to);
    };
    const complete = () => {
      toast.add({
        severity: 'success',
        summary: 'Survey submitted',
        detail: 'Dear, Thank you .  Survey completed.'
      });
    };

    return {items, formObject, nextPage, prevPage, complete}

    function handleForm(term: string) {
      console.log(term);
    }

  },

})
</script>

<style scoped>
.form {
  width: 450px;
  margin: 0 auto;
}

.box-card {
  width: 480px;
  margin: 20px auto;
}

::v-deep(b) {
  display: block;
}

::v-deep(.p-card-body) {
  padding: 2rem;
}
</style>