<template>
    <table class="table">
        <thead>
            <tr>
                <th><abbr title="Position">Task Id</abbr></th>
                <th>Completed</th>
                <th>Task</th>
                <th><abbr title="Win">Created By</abbr></th>
                <th><abbr title="Draw">Actions</abbr></th>
            </tr>
        </thead>
        <tbody v-if="tasks">
            <tr v-for="task in tasks" :key="task.id">
                <TaskListItemVue v-bind="task" />
            </tr>
        </tbody>
        <tfoot>
            <CreateModalVue v-show="showCreateModal"></CreateModalVue>
            <button class="button is-link" @click="setModal">Create Task</button>
        </tfoot>
    </table>
    <EditModalVue v-if="showEditModal" :id="editTaskId"></EditModalVue>
    <TaskItemVue v-if="showTaskModal" :id="showTaskId"></TaskItemVue>
</template>

<script lang="ts">
import CreateModalVue from './CreateModal.vue';
import EditModalVue from './EditModal.vue';
import TaskItemVue from './TaskItem.vue';
import TaskListItemVue from './TaskListItem.vue';
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store'
import { MutationType } from '@/store/mutations';
export default defineComponent({
    name: 'TaskList',
    components: {
        CreateModalVue,
        EditModalVue,
        TaskItemVue,
        TaskListItemVue
    },
    setup() {
        const store = useStore()
        const setModal = () => {
            store.commit(MutationType.SetCreateModal, true)
        }
        const showCreateModal = computed(() => store.state.showCreateModal)
        const showEditModal = computed(() => store.state.showEditModal)
        const editTaskId = computed(() => store.state.editModalTaskId)
        const showTaskModal = computed(() => store.state.showTaskModal)
        const showTaskId = computed (() => store.state.showTaskId)
        const tasks = computed (() => store.state.tasks)

        return { showCreateModal, setModal, tasks, showEditModal, showTaskModal, editTaskId, showTaskId }
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
