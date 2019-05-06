<template>
  <div>
    <ui-button icon="settings">Setting</ui-button>
    <ui-button
      :loading="loading"
      @click="loading = !loading">
      Click Loading
    </ui-button>
  </div>
</template>

<script>
  import {Button} from '../index';

  export default {
    name: 'ButtonExample',
    components: {
      'ui-button': Button
    },
    data() {
      return {
        loading: false

      };
    }
  };
</script>

<style scoped>

</style>