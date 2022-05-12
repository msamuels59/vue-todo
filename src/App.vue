<template>
  <div class="container mx-auto mt-4">
    <h1 class="is-size-3 has-text-centered p-2 has-text-weight-bold">
      Today's To Dos
    </h1>
    <div v-if="loading">
      <h3 class="has-text-centered mt-4">Loading...</h3>
    </div>
    <div v-else>
      <p class="has-text-centered mt-2">
        {{ completedCount }} of {{ totalCount }} completed
      </p>
      <TaskList />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import TaskList from './components/TaskList.vue';
import { userStore } from './store';
import { ActionTypes } from './store/actions';

export default defineComponent({
  name: 'ToDo',
  components: { TaskList },
  setup() {
    const store = userStore()
    const loading = computed(() => store.state.loading)
    onMounted(() => store.dispatch(ActionTypes.GetTaskItems))
    const completedCount = computed(() => store.getters.completedTaskCount)
    const totalCount = computed(() => store.getters.totalTaskCount)
    return { loading, completedCount, totalCount}
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
