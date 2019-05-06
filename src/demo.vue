<template>
  <div>
    <ButtonExample />
    <LayoutExample />
  </div>
</template>

<script>
  import ButtonExample from './Button/Button.example';
  import LayoutExample from './layout/Layout.example'
  export default {
    name: 'demo',
    components: {
      ButtonExample,
      LayoutExample
    }
  };
</script>

<style scoped>

</style>