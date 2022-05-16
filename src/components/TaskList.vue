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
    <v-card 
    elevation="2" 
    shaped 
    tile
    class="mx-auto"
    max-width="344"> 
        <CreateModalVue v-show="showCreateModal"></CreateModalVue>
    </v-card>
    <v-card 
    elevation="2" 
    shaped 
    tile
    class="mx-auto"
    max-width="344"> 
    <EditModalVue v-if="showEditModal" :id="editTaskId"></EditModalVue>
    </v-card>
    <v-card 
    elevation="2" 
    shaped 
    tile
    class="mx-auto"
    max-width="344"> 
    <TaskItemVue v-if="showTaskModal" :id="showTaskId"></TaskItemVue>
    </v-card>
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
        const setButton = () => {
            store.commit(MutationType.ShowCreateButton, false)
        }
        const showCreateModal = computed(() => store.state.showCreateModal)
        const showEditModal = computed(() => store.state.showEditModal)
        const editTaskId = computed(() => store.state.editModalTaskId)
        const showTaskModal = computed(() => store.state.showTaskModal)
        const showTaskId = computed(() => store.state.showTaskId)
        const tasks = computed(() => store.state.tasks)
        const showCreateButton = computed(() => store.state.showCreateButton)

        return { showCreateModal, setModal, tasks, showEditModal, showTaskModal, editTaskId, showTaskId, showCreateButton, setButton }
    }
})
</script>


