<template>
    <table class="table">
        <thead>
            <tr>
                <th>Task Id</th>
                <th>Completed</th>
                <th>Task</th>
                <th>Created By</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody v-if="tasks">
            <tr v-for="task in tasks" :key="task.id">
                <TaskListItemVue v-bind="task" />
            </tr>
        </tbody>

    </table>
    <CreateModalVue v-show="showCreateModal"></CreateModalVue>
        <button class="button is-link" @click="setModal()">Create Task</button>
    <EditModalVue v-if="showEditModal" :id="editTaskId"></EditModalVue>
    <TaskItemVue v-if="showTaskModal" :id="showTaskId"></TaskItemVue>
</template>

<script lang="ts">
import CreateModalVue from './CreateModal.vue';
import EditModalVue from './EditModal.vue';
import TaskItemVue from './TaskItem.vue';
import TaskListItemVue from './TaskListItem.vue';
import { defineComponent, computed } from 'vue';
import store from '@/store'
export default defineComponent({
    name: 'TaskList',
    components: {
        CreateModalVue,
        EditModalVue,
        TaskItemVue,
        TaskListItemVue
    },
    setup() {
        const setModal = () => {
            store.commit('taskModal/TOGGLE_CREATE', true)
        }
        const showCreateModal = computed(() => store.taskModule.state.showCreateModal)
        const showEditModal = computed(() => store.taskModule.state.showEditModal)
        const editTaskId = computed(() => store.taskModule.state.editModalTaskId)
        const showTaskModal = computed(() => store.taskModule.state.showTaskModal)
        const showTaskId = computed (() => store.taskModule.state.showTaskId)
        const tasks = computed (() => store.taskModule.state.tasks)
        const showCreateButton = computed(() => store.taskModule.state.showCreateButton)

        return { showCreateModal, setModal, tasks, showEditModal, showTaskModal, editTaskId, showTaskId, showCreateButton}
    }
})
</script>

<style scoped>  
    table {
      width: 100%;
    }
    .fa {
      font-size: 1.2rem;
      margin-left: 15px;
    }
    .fa:hover {
      font-size: 1.4rem;
    }
</style>
