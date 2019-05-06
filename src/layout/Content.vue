<template>
  <div class="ui-content">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Content'
  };
</script>

<style lang="scss" scoped>
  .ui-content {
    flex-grow: 1;
  }
</style>