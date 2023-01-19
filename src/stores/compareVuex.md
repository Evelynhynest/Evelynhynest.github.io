## Converting a Single Module

```typescript
// Vuex module in the 'auth/user' namespace
import { Module } from 'vuex'
import { api } from '@/api'
import { RootState } from '@/types' // if using a Vuex type definition

interface State {
  firstName: string
  lastName: string
  userId: number | null
}
*
const storeModule: Module<State, RootState> = {
  namespaced: true,
  state: {
    firstName: '',
    lastName: '',
    userId: null
  },
  getters: {
    firstName: (state) => state.firstName,
    fullName: (state) => `${state.firstName} ${state.lastName}`,
    loggedIn: (state) => state.userId !== null,
    // combine with some state from other modules
    fullUserDetails: (state, getters, rootState, rootGetters) => {
      return {
        ...state,
        fullName: getters.fullName,
        // read the state from another module named `auth`
        ...rootState.auth.preferences,
        // read a getter from a namespaced module called `email` nested under `auth`
        ...rootGetters['auth/email'].details
      }
    }
  },
  actions: {
    async loadUser({ state, commit }, id: number) {
      if (state.userId !== null) throw new Error('Already logged in')
      const res = await api.user.load(id)
      commit('updateUser', res)
    }
  },
  mutations: {
    updateUser(state, payload) {
      state.firstName = payload.firstName
      state.lastName = payload.lastName
      state.userId = payload.userId
    },
    clearUser(state) {
      state.firstName = ''
      state.lastName = ''
      state.userId = null
    }
  }
}

export default storeModule
```


## Usage Inside Components

```typescript
// Vuex
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()

    const firstName = computed(() => store.state.auth.user.firstName)
    const fullName = computed(() => store.getters['auth/user/firstName'])

    return {
      firstName,
      fullName
    }
  }
})
```


## Usage Outside Components

```typescript
// Vuex
import vuexStore from '@/store'

router.beforeEach((to, from, next) => {
  if (vuexStore.getters['auth/user/loggedIn']) next()
  else next('/login')
})
```
