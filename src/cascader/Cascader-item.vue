<template>
  <div class="cascaderItem" :style="{height: height}">
    <div class="left">
      <div
          class="label"
          v-for="item in items"
          @click="onClickLabel(item)">
        <span>{{item.name}}</span>
        <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <ui-icon class="loading" name="loading"></ui-icon>
          </template>
          <template v-else>
            <ui-icon class="next" v-if="rightArrowVisible(item)" name="right"></ui-icon>
          </template>
        </span>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <cascader-items
          ref="right"
          :height="height"
          :items="rightItems"
          :selected="selected"
          :level="level+1"
          :loadData="loadData"
          :loading-item="loadingItem"
          :load-data="loadData"
          @update:selected="onUpdateSelected"></cascader-items>
    </div>
  </div>
</template>

<script>
  import Icon from '../Icon';

  export default {
    name: 'cascader-items',
    components: {
      'ui-icon': Icon
    },
    props: {
      items: {
        type: Array
      },
      height: {
        type: String
      },
      selected: {
        type: Array,
        default: () => []
      },
      level: {
        type: Number,
        default: 0
      },
      loadData: {
        type: Function
      },
      loadingItem: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      rightItems () {
        if (this.selected[this.level]) {
          let selected = this.items.filter((item) => item.name === this.selected[this.level].name)
          if (selected && selected[0].children && selected[0].children.length > 0) {
            return selected[0].children
          }
        }
      },
    },
    methods: {
      onClickLabel(item) {
        let copy = JSON.parse(JSON.stringify(this.selected));
        copy[this.level] = item;
        copy.splice(this.level + 1);
        this.$emit('update:selected', copy);
      },
      onUpdateSelected(newSelected) {
        this.$emit('update:selected', newSelected);
      },
      rightArrowVisible(item) {
        return this.loadData ? !item.isLeaf : item.children
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../styles/var';

  .cascaderItem {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    /*height: 100px;*/
    .left {
      height: 100%;
      padding: .3em 0;
      overflow: auto;
    }

    .right {
      height: 100%;
      border: 1px solid $border-color-light;
    }

    .label {
      padding: .5em 1em;
      display: flex;
      align-items: center;
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        background: $grey;
      }
      > .name {
        margin-right: 1em;
        user-select: none;
      }
      .icon {
        margin-left: auto;
        .next {
          transform: scale(0.5);
        }
        .loading {
          animation: spin 2s infinite linear;
        }
      }
    }
  }
</style>