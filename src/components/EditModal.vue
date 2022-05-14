<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="updateTask">
          <h1>Edit Modal</h1>
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
              placeholder="Textarea"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Assigned By</label>
          <div class="control">
            <input
              v-model="createdBy"
              class="input"
              type="text"
              placeholder="Enter Assigner's name"
            />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light" @click="closeModal">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from "vue";
import store from '@/store'
export default {
    name: 'EditModal',
    props: {
        id: { type: Number, required: true }
    },
    setup(props) {
        const state = reactive({
            title: '',
            description: '',
            createdBy: ''
        })
        const getTaskById = computed(() => store.taskModule.getters.getTaskById(Number(props.id)))
        const setFields = () => {
            const task = store.taskModule.getters.getTaskById(Number(props.id))
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
            const task= {
                id: props.id,
                title: state.title,
                description: state.description,
                createdBy: state.createdBy,
                completed: false,
                editing: false
            };
            store.commit('taskModule/UPDATE_TASK', task);
            state.title = '';
            state.createdBy = '';
            state.description = '';
        }
        const closeModal = () => {
            store.commit('taskModule/SET_EDIT_MODAL', {showModal: false, taskId: undefined})
        }
        return { closeModal, ...toRefs(state), updateTask}
    }
}
</script>
<style scoped>
label {
    color: #ffffff;
}
h1 {
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
}
</style>