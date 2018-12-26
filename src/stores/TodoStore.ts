import * as Vuex from 'vuex'
import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper'
import { Todo } from '@/models/Todo';

export interface ITodoState {
  todo: Todo
}

export interface ITodoGetters {
  hasDone: boolean
}

export interface ITodoMutations {
  done: {
  },
  undone: {
  }
}

export interface ITodoActions {
  done: {
  },
  undone: {
  }
}

class TodoState implements ITodoState {
  todo: Todo;
  constructor(todo: Todo) {
    this.todo = todo
  }
}

const getters: DefineGetters<ITodoGetters, ITodoState> = {
  hasDone (state) {
    return state.todo.hasDone
  }
}

const mutations: DefineMutations<ITodoMutations, ITodoState> = {
  done (state, _) {
    state.todo.hasDone = true;
  },
  undone (state, _) {
    state.todo.hasDone = false;
  }
}

const actions: DefineActions<ITodoActions, ITodoState, ITodoMutations, ITodoGetters> = {
  done (context, payload) {
    console.log("done")
    context.commit('done', payload);
  },
  undone (context, payload) {
    console.log("undone")
    context.commit('undone', payload)
  }
}

export class TodoModule implements Vuex.Module<ITodoState, any> {
  state: ITodoState
  namespaced = true
  getters = getters
  mutations = mutations
  actions = actions
  constructor(todo: Todo) {
    this.state = new TodoState(todo)
  }
}

export const createTodoModule = (todo: Todo) => {
  return new TodoModule(todo)
}