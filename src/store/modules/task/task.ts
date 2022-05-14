const state = {
    tasks: [],
}

export enum TaskMutationType {
    CreateTask = 'CREATE_TASK',
    CompleteTask = 'COMPLETE_TASK',
    RemoveTask = 'REMOVE_TASK',
    EditTask = 'EDIT_TASK',
    UpdateTask = 'UPDATE_TASK',
}

const mutations = {
    [TaskMutationType.CreateTask](state, task) {
        state.tasks.unshift(task)
    },
    [TaskMutationType.CompleteTask](state, newTask) {
        const task = state.tasks.findIndex(element => element.id === newTask.id)
        if (task === -1) return 
        state.tasks[task] = { ...state.tasks[task], ...newTask }
    },
    [TaskMutationType.RemoveTask](state, Task) {
        const task = state.tasks.findIndex(element => element.id === Task.id)
        if (task === -1) return 
        //If Task exists in the state, remove it 
        state.tasks.splice(task, 1)
    },
    [TaskMutationType.EditTask](state, Task) {
        const task = state.tasks.findIndex(element => element.id === Task.id)
        //if Task exists in the state, toggle edit functionality 
        state.tasks[task] = { ...state.tasks[task], editing: !state.tasks[task].editing }
        console.log('Edit successful', state.tasks[task])
    },
    UpdateTask(state, Task) {
        state.tasks = state.tasks.map(task => {
            if (task.id === Task.id) {
                return {...task, ...Task}
            }
            return task;
        })
    },
}

const getters = {
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

export const taskModule = {
    namespaced: true,
    state,
    mutations,
    getters
}