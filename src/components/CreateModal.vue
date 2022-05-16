<template>
  <v-form @submit.prevent="createTask">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="title" :counter="25" label="Title" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="description" label="Description" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="createdBy" label="Creator" required></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-row align="center" justify="space-around">
      <v-btn depressed color="primary" type="submit" @click="closeModal">Submit</v-btn>
      <v-btn depressed color="error" @click="closeModal">Cancel</v-btn>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from "@/store";
import { TaskItem } from "@/store/state";
import { MutationType } from "@/store/mutations";
export default defineComponent({
  name: 'CreateModal',
  setup() {
    const state = reactive({
      title: '',
      description: '',
      createdBy: ''
    })
    const store = useStore()
    const createTask = () => {
      if (
        state.title === '' ||
        state.description === '' ||
        state.createdBy === ''
      )
        return
      const task: TaskItem = {
        id: Date.now(),
        title: state.title,
        description: state.description,
        createdBy: state.createdBy,
        completed: false,
        editing: false
      }
      store.commit(MutationType.CreateTask, task);
      state.title = '';
      state.createdBy = '';
      state.description = '';
    }
    const closeModal = () => {
      store.commit(MutationType.SetCreateModal, false)
    }
    return { closeModal, ...toRefs(state), createTask }
  }
})
</script>