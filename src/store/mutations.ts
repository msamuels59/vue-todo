import { shallowReactive } from "vue";
import { MutationTree } from "vuex";
import { state, State, TaskItem } from "./modules/task/state";

export enum MutationType {
    CreateTask = 'CREATE_TASK',
    SetTasks = 'SET_TASKS',
    CompleteTask = 'COMPLETE_TASK',
    RemoveTask = 'REMOVE_TASK',
    EditTask = 'EDIT_TASK',
    // UpdateTask = 'UPDATE_TASK',
    SetLoading = 'SET_LOADING',
    ShowCreateButton = 'SHOW_CREATE_BUTTON',
    SetCreateModal = 'SET_CREATE_MODAL',
    SetEditModal = 'SET_EDIT_MODAL',
    SetTaskModal = 'SET_TASK_MODAL',
}

export type Mutations = {
    [MutationType.CreateTask](state: State, task: TaskItem): void
    [MutationType.SetTasks](state: State, tasks: TaskItem[]): void
    [MutationType.CompleteTask](
        state: State,
        task: Partial<TaskItem> & {id: number}
    ): void
    [MutationType.RemoveTask](
        state: State,
        task: Partial<TaskItem> & {id: number}
    ): void
    [MutationType.EditTask](
        state: State,
        task: Partial<TaskItem> & {id: number}
    ): void
    // [MutationType.UpdateTask](
    //     state: State,
    //     task: Partial<TaskItem> & {id: number}
    // ): void
    [MutationType.SetLoading](state: State, value: boolean): void
    [MutationType.SetCreateModal](state: State, value: boolean): void
    [MutationType.SetEditModal](state: State, value: {showModal: boolean, taskId: number|undefined}): void
    [MutationType.SetTaskModal](state: State, value: {showModal: boolean, taskId: number|undefined}): void
    [MutationType.ShowCreateButton](state: State, value: boolean): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.CreateTask](state, task) {
        state.tasks.unshift(task)
    },
    [MutationType.SetTasks](state, tasks) {
        state.tasks = tasks
    },
    [MutationType.CompleteTask](state, newTask) {
        const task = state.tasks.findIndex(element => element.id === newTask.id)
        if (task === -1) return 
        state.tasks[task] = { ...state.tasks[task], ...newTask }
    },
    [MutationType.RemoveTask](state, Task) {
        const task = state.tasks.findIndex(element => element.id === Task.id)
        if (task === -1) return 
        //If Task exists in the state, remove it 
        state.tasks.splice(task, 1)
    },
    [MutationType.EditTask](state, Task) {
        const task = state.tasks.findIndex(element => element.id === Task.id)
        //if Task exists in the state, toggle edit functionality 
        state.tasks[task] = { ...state.tasks[task], editing: !state.tasks[task].editing }
        console.log('Edit successful', state.tasks[task])
    },
    // [MutationType.UpdateTask](state, Task) {
    //     state.tasks = state.tasks.map(task => {
    //         if (task.id === Task.id) {
    //             return {...task, ...Task}
    //         }
    //         return task;
    //     })
    // },
    [MutationType.SetLoading](state, value) {
        state.loading = value
        console.log('Loading...')
    },
    [MutationType.ShowCreateButton](state, value) {
        state.showCreateButton = value
    },
    [MutationType.SetCreateModal](state, value) {
        state.showCreateModal = value
    },
    [MutationType.SetEditModal](state, value) {
        state.showEditModal = value.showModal
        state.editModalTaskId = value.taskId
    },
    [MutationType.SetTaskModal](state, value) {
        state.showTaskModal = value.showModal
        state.showTaskId = value.taskId
    },
}