import Vue from 'vue';
import Vuex from 'vuex';
import { taskModule } from './modules/task/task';


export const store = Vuex.createStore({
  modules: {
    taskModule
  }
})


// export default new Vuex.Store({
//   modules: {
//     taskModule
//   }
// })

//  export type Store = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch' | 'modules'> & {
//    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
//      key: K,
//      payload: P,
//      options?: CommitOptions
//    ): ReturnType<Mutations[K]>
//  } & {
//    dispatch<K extends keyof Actions>(
//      key: K,
//      payload?: Parameters<Actions[K]>[1],
//      options?: DispatchOptions
//    ): ReturnType<Actions[K]>
//  } & {
//    getters: {
//      [K in keyof Getters]: ReturnType<Getters[K]>
//    }
//  }