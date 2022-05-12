import { GetterTree, MutationTree } from "vuex";
import { State } from "../state";
//state
export type TaskItem = {
    id: number;
    title: string;
    description: string;
    createdBy: string;
    completed: boolean;
    editing: boolean;
};
//Getters
export type Getters = {
    completedTaskCount(state: State): number
    totalTaskCount(state: State): number
    getTaskById(state: State): (id: number) => TaskItem | undefined
}

export const getters: GetterTree<State, State> & Getters = {
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
//mutations
export enum MutationType {
    CreateTask = 'CREATE_TASK',
    SetTasks = 'SET_TASKS',
    CompleteTask = 'COMPLETE_TASK',
    RemoveTask = 'REMOVE_TASK',
    EditTask = 'EDIT_TASK',
    UpdateTask = 'UPDATE_TASK',
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
    [MutationType.UpdateTask](
        state: State,
        task: Partial<TaskItem> & {id: number}
    ): void
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
    [MutationType.UpdateTask](state, Task) {
        state.tasks = state.tasks.map(task => {
            if (task.id === Task.id) {
                return {...task, ...Task}
            }
            return task;
        })
    },
}
