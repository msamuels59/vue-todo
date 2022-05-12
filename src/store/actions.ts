import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from './mutations';
import { State } from "./state";

export enum ActionTypes {
    GetTaskItems = 'GET_TASK_ITEMS',
    ShowCreateButton = 'SHOW_CREATE_BUTTON',
    SetCreateModal = 'SET_CREATE_MODAL',
    SetEditModal = 'SET_EDIT_MODAL',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.GetTaskItems](context: ActionAugments): void
    [ActionTypes.SetCreateModal](context: ActionAugments): void
    [ActionTypes.SetEditModal](context: ActionAugments): void
    [ActionTypes.ShowCreateButton](context: ActionAugments): void
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.GetTaskItems]({ commit }) {
        commit(MutationType.SetLoading, true)
        await sleep(1000)
        commit(MutationType.SetLoading, false)
        commit(MutationType.SetTasks, [
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
    async [ActionTypes.ShowCreateButton]({ commit }) {
        commit(MutationType.ShowCreateButton, false)
    },
    async [ActionTypes.SetCreateModal]({ commit }) {
        commit(MutationType.SetCreateModal, true)
    },
    async [ActionTypes.SetEditModal]({ commit }) {
        commit(MutationType.SetEditModal, {showModal: true, taskId: 1})
    },
}