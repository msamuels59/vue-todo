<template>
  <v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Description
          </th>
          <th class="text-left">
            Created By
          </th>
        </tr>
      </thead>
      <tbody>
        <td class="text-left">{{ task.title }}</td>
        <td class="text-left">{{ task.description }}</td>
        <td class="text-left"> {{ task.createdBy }}</td>
      </tbody>
    </template>
  </v-table>
  <div class="d-flex align-center justify-center">
    <v-btn justify="space-around" depressed color="error" @click="closeModal">Close</v-btn>
  </div>
</template>


<script lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";

import { MutationType } from "@/store/mutations";
export default {
  name: "TaskModal",
  props: {
    id: { type: Number, required: true },
  },
  setup(props: any) {
    const store = useStore();
    const task = computed(() => store.getters.getTaskById(Number(props.id)));
    const closeModal = () => {
      store.commit(MutationType.SetTaskModal, {
        showModal: false,
        taskId: undefined,
      });
    };
    return { closeModal, task };
  },
};
</script>

