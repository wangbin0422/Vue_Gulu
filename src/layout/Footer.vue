<template>
  <div class="footer">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  };
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .footer {
    font-size: 12px;
    text-align: center;
    color: $color;
  }
</style>