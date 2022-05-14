import { 
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger,
 } from 'vuex';
 import { State, state } from './modules/task/state';
 import { Mutations, mutations } from './mutations';
 import { Actions, actions } from './actions';
 import { Getters, getters } from './modules/task/getters';
 import { taskModule } from './modules/task/task';

 export const store = createStore<State>({
   plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
   state,
   mutations,
   actions,
   getters,
   modules: {
     taskModule
    }
   
 })

 export function useStore() {
   return store 
 }

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