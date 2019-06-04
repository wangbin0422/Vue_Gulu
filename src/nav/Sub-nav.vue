<template>
  <div class="ui-sub-nav" :class="{active}" v-click-outside="close">
    <span class="ui-sub-nav-label" @click="onClick">
      <slot name="title"></slot>
      <span class="ui-sub-nav-icon" :class="{open}">
        <ui-icon name="right"></ui-icon>
      </span>
    </span>
    <div class="ui-sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ClickOutside from '../clickOutSide';
  import Icon from '../Icon'
  export default {
    name: 'SubNav',
    inject: ['root'],
    directives: {ClickOutside},
    components: {
      'ui-icon': Icon
    },
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        open: false
      };
    },
    computed: {
      active() {
        return this.root.namePath.indexOf(this.name) >= 0 ? true : false;
      }
    },
    methods: {
      onClick() {
        this.open = !this.open;
      },
      close() {
        this.open = false;
      },
      updateNamePath() {
        this.root.namePath.unshift(this.name);
        if (this.$parent.updateNamePath) {
          this.$parent.updateNamePath();
        } else {

        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .ui-sub-nav {
    position: relative;
    &.active {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
    &-label {padding: 10px 20px; display: block;}
    &-icon {display: none;}
    &-popover {
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid blue;
      white-space: nowrap;
      margin-top: 4px;
      box-shadow: 0 0 3px fade_out(black, 0.8);
      border-radius: $border-radius;
      font-size: $font-size;
      color: $light-color;
      min-width: 8em;
    }
  }
  .ui-sub-nav .ui-sub-nav {
    &.active {
      &::after {
        display: none;
      }
    }
   .ui-sub-nav-popover {
      top: 0;
      left: 100%;
      margin-left: 8px;
    }
    .ui-sub-nav-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ui-sub-nav-icon {
      transition: transform 250ms;
      display: inline-flex; margin-left: 1em;
      svg {fill: $light-color;}
      &.open {
        transform: rotate(180deg);
      }
    }
  }
</style>