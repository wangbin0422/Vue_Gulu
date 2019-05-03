<template>
  <button
      class="ui-btn"
      :class="{[`icon-${iconPosition}`]: true}"
      @click="$emit('click')">
    <ui-icon
        class="icon"
        :name="icon"
        v-if="icon && !loading">
    </ui-icon>
    <ui-icon
        class="loading icon"
        v-if="loading"
        name="loading"></ui-icon>
    <div class="ui-btn-content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
  import Icon from '../Icon';

  export default {
    name: 'UiButton',
    props: {
      icon: {},
      loading: {
        type: Boolean,
        default: false
      },
      iconPosition: {
        type: String,
        default: 'left',
        validate(value) {
          return value === 'left' || value === 'right';
        }
      }
    },
    components: {
      'ui-icon': Icon
    }
  };
</script>

<style lang="scss">
  @import "../styles/var";

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .ui-btn {
    font-size: $font-size;
    height: $button-height;
    line-height: $button-height;
    padding: 0 1em;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background: $button-bg;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;

    &:hover {
      border-color: $border-color-hover;
    }

    &:active {
      background-color: $button-active-bg;
    }

    &:focus {
      outline: none;
    }

    > .ui-btn-content {
      order: 2;
    }

    > .icon {
      order: 1;
      margin-right: 0.1em;
    }
    .loading {
      @include spin;
    }
    & + & {
      margin-left: 4px;
    }

  }


</style>
