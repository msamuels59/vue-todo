<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="createTask">
        <div class="field">
          <label class="label">Task Title</label>
          <div class="control">
            <input
              v-model="title"
              class="input"
              type="text"
              placeholder="Enter task"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
              v-model="description"
              class="textarea"
              placeholder="What needs to get done"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Created By</label>
          <div class="control">
            <input
              v-model="createdBy"
              class="input"
              type="text"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">Submit</button>
          </div>
          <div class="control" @click="closeModal">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
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