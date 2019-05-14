<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
      <slot></slot>
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <ui-cascader-item
        class="popover"
        :height="popoverHeight"
        :items="source"
        :selected="selected"
        @update:selected="onUpdateSelected"></ui-cascader-item>
    </div>
  </div>
</template>

<script>
  import CascaderItem from './Cascader-item';

  export default {
    name: 'Cascader',
    components: {
      'ui-cascader-item': CascaderItem
    },
    props: {
      source: {
        type: Array
      },
      popoverHeight: {
        type: String
      },
      selected: {
        type: Array,
        default: () => {return []}
      }
    },
    data() {
      return {
        popoverVisible: false
      }
    },
    methods: {
      onUpdateSelected(newSelected) {
        this.$emit('update:selected', newSelected)
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "../styles/var";
.cascader {
  position: relative;
  .trigger {
    border: 1px solid;
    height: 32px;
    width: 100px;
  }
  .popover-wrapper {
    position: absolute;
    top: 10%;
    left: 0;
    background: #fff;
    display: flex;
    @extend .box-shadow
  }
}
</style>