<template>
  <v-form @submit.prevent="updateTask">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="title" :counter="25" label="Title" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-textarea v-model="description" label="Description" required></v-textarea>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="createdBy" label="Creator" required></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-row align="center" justify="space-around">
      <v-btn depressed color="primary" type="submit" @click="updateTask(); closeModal()">Submit</v-btn>
      <v-btn depressed color="error" @click="closeModal">Cancel</v-btn>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { reactive, toRefs, computed, onMounted } from "vue";
import { useStore } from "@/store";
import { TaskItem } from "@/store/state";
import { MutationType } from "@/store/mutations";
export default {
    name: 'EditModal',
    props: {
        id: { type: Number, required: true }
    },
    setup(props: any) {
        const state = reactive({
            title: '',
            description: '',
            createdBy: ''
        })
        const store = useStore();
        const getTaskById = computed(() => store.getters.getTaskById(Number(props.id)))
        console.log("task by id", getTaskById)

        const setFields = () => {
            const task = store.getters.getTaskById(Number(props.id))
            if (task) {
                state.title = task.title
                state.createdBy = task.createdBy
                state.description = task.description
            }
        }
        onMounted(() => { setFields() });
        const updateTask = () => {
            if (
                state.title === '' ||
                state.description === '' ||
                state.createdBy === '' 
            )
            return
            const task: TaskItem = {
                id: props.id,
                title: state.title,
                description: state.description,
                createdBy: state.createdBy,
                completed: false,
                editing: false
            };
            store.commit(MutationType.UpdateTask, task);
            state.title = '';
            state.createdBy = '';
            state.description = '';
        }
        const closeModal = () => {
            store.commit(MutationType.SetEditModal, {showModal: false, taskId: undefined})
        }
        return { closeModal, ...toRefs(state), updateTask}
    }
}
</script>
