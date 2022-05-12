import { GetterTree } from "vuex";
import { State, TaskItem } from "@/store/state";

// export type Getters = {
//     completedTaskCount(state: State): number
//     totalTaskCount(state: State): number
//     getTaskById(state: State): (id: number) => TaskItem | undefined
// }

// const task = {
//     getters: {
//             completedTaskCount(state: { tasks: { filter: (arg0: (element: any) => any) => { (): any; new(): any; length: any; }; }; }) {
//                 return state.tasks.filter((element: { completed: any; }) => element.completed).length
//             },
//             totalTaskCount(state: { tasks: string | any[]; }) {
//                 return state.tasks.length
//             },
//             getTaskById: (state: { tasks: any[]; }) => (id: number) => {
//                 return state.tasks.find((task: { id: number; }) => task.id === id)
//             }}
// }