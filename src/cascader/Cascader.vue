<template>
  <div class="cascader" ref="cascader" v-click-outside="close">
    <div class="trigger" @click="toggle">
      {{result || ' '}}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <ui-cascader-item
        class="popover"
        :height="popoverHeight"
        :items="source"
        :selected="selected"
        :loading-item="loadingItem"
        @update:selected="onUpdateSelected"></ui-cascader-item>
    </div>
  </div>
</template>

<script>
  import CascaderItem from './Cascader-item';
  import ClickOutside from '../clickOutSide';

  export default {
    name: 'Cascader',
    components: {
      'ui-cascader-item': CascaderItem
    },
    directives: {
      ClickOutside
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
        default: () => {return [];}
      },
      loadData: {
        type: Function
      }
    },
    data() {
      return {
        popoverVisible: false,
        loadingItem: {}
      };
    },
    methods: {
      onUpdateSelected(newSelected) {
        this.$emit('update:selected', newSelected);
        let lastItem = newSelected[newSelected.length - 1];
        let simplest = (children, id) => {
          return children.filter(item => item.id === id)[0];
        };
        let complex = (children, id) => {
          let noChildren = [];
          let hasChildren = [];
          children.forEach(item => {
            if (item.children) {
              hasChildren.push(item);
            } else {
              noChildren.push(item);
            }
          });
          let found = simplest(noChildren, id);
          if (found) {
            return found;
          } else {
            found = simplest(hasChildren, id);
            if (found) { return found; } else {
              for (let i = 0; i < hasChildren.length; i++) {
                found = complex(hasChildren[i].children, id);
                if (found) {
                  return found;
                }
              }
              return undefined;
            }
          }
        };
        let updateSource = (result) => {
          this.loadingItem = {};
          let copy = JSON.parse(JSON.stringify(this.source));
          let toUpdate = complex(copy, lastItem.id);
          toUpdate.children = result;
          this.$emit('update:source', copy);
        };
        if (!lastItem.isLeaf && this.loadData) {
          this.loadData(lastItem, updateSource); // 回调:把别人传给我的函数调用一下
          // 调回调的时候传一个函数,这个函数理论应该被调用
          this.loadingItem = lastItem;
        }
      },
      close() {
        this.popoverVisible = false;
      },
      open() {
        this.popoverVisible = true;
      },
      toggle() {
        if (this.popoverVisible === true) {
          this.close();
        } else {
          this.open();
        }
      }
    },
    computed: {
      result() {
        return this.selected.map(entry => entry.name).join('/');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .cascader {
    position: relative;
    display: inline-block;

    .trigger {
      height: $input-height;
      display: inline-flex;
      align-items: center;
      padding: 0 1em;
      min-width: 10em;
      border: 1px solid $border-color;
      border-radius: $border-radius;
    }

    .popover-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      background: #fff;
      display: flex;
      margin-top: 8px;
      z-index: 1;
      @extend .box-shadow
    }
  }
</style>