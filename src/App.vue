<template>
  <v-app id="inspire">
    <v-navigation-drawer 
    v-model="drawer"
    app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Tasks
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          v-model="drawer"
          @click="setModal(); drawer = false;"
        >
         

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Your To Dos</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="grey--text mb-2 font-weight-medium text-center">
        {{ completedCount }} of {{ totalCount }} completed
      </div>
      <TaskList />
    </v-main>
  </v-app>
</template>

<!-- <script>
  export default {
    data: () => ({ drawer: null }),
  }
</script> -->

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import TaskList from './components/TaskList.vue';
import { useStore } from './store';
import { ActionTypes } from './store/actions';
import { MutationType } from './store/mutations';
export default defineComponent({
  name: 'ToDo',
  components: { TaskList },
  data: () => ({ 
    drawer: false,
    items: [
          { title: 'Create To Do'},
        ],
    }),
  setup() {
    const store = useStore()
    const setModal = () => {
            store.commit(MutationType.SetCreateModal, true)
        }
    const loading = computed(() => store.state.loading)
    onMounted(() => store.dispatch(ActionTypes.GetTaskItems))
    const completedCount = computed(() => store.getters.completedTaskCount)
    const totalCount = computed(() => store.getters.totalTaskCount)
    return { loading, completedCount, totalCount, setModal }
  }
});
</script>

