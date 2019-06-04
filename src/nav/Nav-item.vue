<template>
  <div
    class="ui-nav-item"
    @click="onClick"
    :class="{selected}"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'NavItem',
    inject: ['root'],
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        selected: false
      };
    },
    created() {
      this.root.addItem(this);
    },
    methods: {
      onClick() {
        this.root.namePath = [];
        this.$parent.updateNamePath && this.$parent.updateNamePath();
        this.$emit('update:selected', this.name);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .ui-nav-item {
    padding: 10px 20px;
    position: relative;

    &.selected {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
  }

  .ui-sub-nav .ui-nav-item {
    &.selected {
      color: $color;
      background: $grey;

      &::after {
        display: none;
      }
    }
  }
</style>