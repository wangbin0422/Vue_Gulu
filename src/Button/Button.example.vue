<template>
  <div>
    <ui-button>Default</ui-button>
    <ui-button icon="settings">Setting</ui-button>
  </div>
</template>

<script>
  import {Button} from '../index';

  export default {
    name: 'ButtonExample',
    components: {
      'ui-button': Button
    }
  };
</script>

<style scoped>

</style>