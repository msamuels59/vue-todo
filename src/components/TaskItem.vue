<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content"></div>
        <h1>VIEW TASK</h1>
        <div class="card">
            <div class="card-content">
                <div class="media-content">
                    <p class="title is-4">Title: {{ task.title }}</p>
                    <p class="subtitle is-6"> Created By: {{ task.createdBy }}</p>
                </div>
                <div class="content">
                    <p class="subtitle is-6">Description: {{ task.description }}</p>
                </div>
            </div>
        </div>
        <button
        class="modal-close is-large"
        @click="closeModal"
        areia-label="close">X</button>
    </div>
</template>


<script lang="ts">
import { computed} from "vue";
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

<style scoped>
h1 {
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
}
</style>