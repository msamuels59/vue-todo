const state = {
    tasks: [],
}

export enum MutationType {
    CreateTask = 'CREATE_TASK',
    CompleteTask = 'COMPLETE_TASK',
    RemoveTask = 'REMOVE_TASK',
    EditTask = 'EDIT_TASK',
    UpdateTask = 'UPDATE_TASK',
}

const mutations = {
    [MutationType.CreateTask](state, task) {
        state.tasks.unshift(task)
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

