import { ActionContext, ActionTree } from "vuex";
import { GetterTree } from "vuex";



export type TaskItem = {
    id: number;
    title: string;
    description: string;
    createdBy: string;
    completed: boolean;
    editing: boolean;
};
export type State = {
    loading: boolean;
    tasks: TaskItem[];
    showCreateModal: boolean;
    showEditModal: boolean;
    showTaskModal: boolean;
    editModalTaskId: number | undefined;
    showTaskId: number | undefined;
    showCreateButton: boolean;
};
const state: State = {
    loading: false,
    tasks: [],
    showCreateModal: false,
    showEditModal: false,
    showTaskModal: false,
    editModalTaskId: undefined,
    showTaskId: undefined,
    showCreateButton: true,
}





const mutations = {
    CREATE_TASK(state, task) {
        state.tasks.unshift(task)
    },
    COMPLETE_TASK(state, newTask) {
        const task = state.tasks.findIndex(element => element.id === newTask.id)
        if (task === -1) return
        state.tasks[task] = { ...state.tasks[task], ...newTask }
    },
    REMOVE_TASK(state, Task) {
        const task = state.tasks.findIndex(element => element.id === Task.id)
        if (task === -1) return
        //If Task exists in the state, remove it 
        state.tasks.splice(task, 1)
    },
    EDIT_TASK(state, Task) {
        const task = state.tasks.findIndex(element => element.id === Task.id)
        //if Task exists in the state, toggle edit functionality 
        state.tasks[task] = { ...state.tasks[task], editing: !state.tasks[task].editing }
        console.log('Edit successful', state.tasks[task])
    },
    UPDATE_TASK(state, Task) {
        state.tasks = state.tasks.map(task => {
            if (task.id === Task.id) {
                return { ...task, ...Task }
            }
            return task;
        })
    },
    TOGGLE_CREATE(state, modalState) {
        state.showCreateModal = modalState
    },
    SET_EDIT_MODAL(state, value) {
        state.showEditModal = value.showModal
        state.editModalTaskId = value.taskId
    },
    SET_TASK_MODAL(state, value) {
        state.showTaskModal = value.showModal
        state.showTaskId = value.taskId
    },
    SET_LOADING(state, value) {
        state.loading = value
        console.log('Loading...')
    },
    SET_TASKS(state, tasks) {
        state.tasks = tasks
    }
}

export type Getters = {
    completedTaskCount(state: State): number
    totalTaskCount(state: State): number
    getTaskById(state: State): (id: number) => TaskItem | undefined
}

const getters: GetterTree<State, State> & Getters = {
    completedTaskCount(state) {
        return state.tasks.filter(element => element.completed).length
    },
    totalTaskCount(state) {
        return state.tasks.length
    },
    getTaskById: (state) => (id: number) => {
        return state.tasks.find(task => task.id === id)
    }
}







const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const actions= {
    async GetTaskItems({ commit }) {
        commit('SET_LOADING', true)
        await sleep(1000)
        commit('SET_LOADING', false)
        commit('SET_TASKS', [
            {
                id: 1,
                title: 'Create first task',
                description: 'This should be a task to fill out all fields',
                createdBy: 'Mike',
                completed: false,
                editing: false
            }
        ])
    },
}

export const taskModule = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}