<template>
    <th>{{ id }}</th>
    <td>
        <v-checkbox class="align-center justify-center" :checked="completed" @change="toggleCompletion()" />
    </td>
    <td><strong> {{ title }} </strong></td>
    <td>{{ createdBy }}</td>
    <td>
        <v-btn depressed elevation="2" @click="viewTask()" >Details</v-btn>
        <v-btn depressed elevation="2" x-small @click="editTask">Edit</v-btn>
        <v-btn depressed elevation="2" x-small @click="removeTask">Delete</v-btn>
    </td>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
export default defineComponent({
    props: {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        createdBy: { type: String, required: true },
        completed: { type: Boolean, required: true }
    },
    components: {

    },
    setup(props) {
        const store = useStore()

        const toggleCompletion = () => {
            store.commit(MutationType.CompleteTask, {
                id: props.id,
                completed: !props.completed
            })
        }
        const removeTask = () => {
            store.commit(MutationType.RemoveTask, {
                id: props.id
            })
        }
        const viewTask = () => {
            store.commit(MutationType.SetTaskModal, { showModal: true, taskId: props.id })
        }
        const editTask = () => {
            store.commit(MutationType.SetEditModal, { showModal: true, taskId: props.id })
        }

        return { toggleCompletion, removeTask, editTask, viewTask }
    }
})
</script>