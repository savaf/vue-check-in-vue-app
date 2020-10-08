<template>
  <form @submit.prevent="onSubmit" class="check-in-form box p-4 rounded">
    <ValidationObserver v-slot="{ invalid }">
      <ValidationProvider
        name="Name"
        rules="required"
        v-slot="{ errors, valid }"
      >
        <div class="form-group">
          <label for="name">Name</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="name"
            aria-describedby="name"
            @keyup.enter="() => valid && onSubmit()"
          />
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <div class="form-group">
        <label for="time">Time</label>
        <input
          v-model="date"
          type="text"
          class="form-control"
          id="time"
          disabled
        />
      </div>

      <button type="submit" :disabled="invalid" class="btn btn-primary">
        Submit
      </button>
    </ValidationObserver>
  </form>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import format from "date-fns/lightFormat";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    name: ""
  }),
  computed: {
    date() {
      return format(Date.now(), "hh:mm:ss a");
    }
  },
  methods: {
    onSubmit() {
      const atendanceObject = {
        id: uuidv4(),
        name: this.name,
        breaks: [],
        lunch: { in: null, out: null },
        presence: { in: Date.now(), out: null },
        active: true
      };

      this.$emit("submit", atendanceObject);
    }
  }
};
</script>
