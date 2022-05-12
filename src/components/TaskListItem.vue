<template>
    <th>{{ id }}</th>
    <td>
        <input type="checkbox" :checked="completed" @change="toggleCompletion()" />
    </td>
    <td><strong> {{ title }} </strong></td>
    <td>{{ createdBy }}</td>
    <td>
        <span class="icon" @click="viewTask()">
            <button class="fas fa-eye">Details</button>
        </span>
        <span class="icon" @click="editTask()">
            <button class="fa fa-edit">Edit</button>
        </span>
        <span class="icon" @click="removeTask()">
            <button class="fa fa-trash">Delete</button>
        </span>
    </td>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
export default defineComponent({
    props: {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        createdBy: { type: String, required: true},
        completed: { type: Boolean, required: true}
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
            store.commit(MutationType.SetTaskModal, {showModal:true, taskId:props.id})
        }
        const editTask = () => {
            store.commit(MutationType.SetEditModal, {showModal:true, taskId:props.id})
        }
        return { toggleCompletion, removeTask, editTask, viewTask }
    }
})
</script>