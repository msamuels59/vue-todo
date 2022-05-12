import { MutationTree } from "vuex";
import { state, State, TaskItem } from "./state";

export enum MutationType {
    CreateTask = 'CREATE_TASK',
    SetTasks = 'SET_TASKS',
    CompleteTask = 'COMPLETE_TASK',
    RemoveTask = 'REMOVE_TASK',
    EditTask = 'EDIT_TASK',
    UpdateTask = 'UPDATE_TASK',
    SetLoading = 'SET_LOADING',
    SetCreateModal = 'SET_CREATE_MODAL',
    SetEditModal = 'SET_EDIT_MODAL',
    SetTaskModal = 'SET_TASK_MODAL'
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
    [MutationType.SetLoading](state: State, value: boolean): void
    [MutationType.SetCreateModal](state: State, value: boolean): void
    [MutationType.SetEditModal](state: State, value: {showModal: boolean, taskId: number|undefined}): void
    [MutationType.SetTaskModal](state: State, value: {showModal: boolean, taskId: number|undefined}): void
}