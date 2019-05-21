<template>
  <div
      class="ui-slides"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
  >
    <div class="ui-slides-window" ref="window">
      <div class="ui-sliders-wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="ui-slides-dots">
      <span
          v-for="n in childrenLength"
          :class="{active: selectedIndex === n-1}"
          @click="select(n-1)">
        {{n}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Carousel',
    props: {
      autoPlay: {
        type: Boolean,
        default: true
      },
      selected: {
        type: String
      }
    },
    data() {
      return {
        childrenLength: 0,
        lastSelectedIndex: undefined,
        timer: undefined
      };
    },
    mounted() {
      this.updateChildren();
      this.playAutomatically();
      this.childrenLength = this.$children.length;
    },
    updated() {
      this.updateChildren();
    },
    computed: {
      selectedIndex() {
        return this.names.indexOf(this.selected) || 0;
      },
      names() {
        return this.$children.map(entry => entry.name);
      }
    },
    methods: {
      onMouseEnter() {
        this.pause();
      },
      onMouseLeave() {
        this.playAutomatically();
      },
      pause() {
        window.clearTimeout(this.timer);
      },
      playAutomatically() {
        if (this.timer) {return;}
        let index = this.names.indexOf(this.getSelected());
        let run = () => {
          let newIndex = index - 1;
          if (newIndex === -1) {
            newIndex = this.names.length - 1;
          }
          if (newIndex === this.names.length) {
            newIndex = 0;
          }
          this.select(newIndex);
          this.timer = setTimeout(run, 3000);
        };
      },
      select(idx) {
        this.lastSelectedIndex = this.selectedIndex;
        this.$emit('update:selected', this.names[idx]);
      },
      getSelected() {
        let first = this.$children[0];
        return this.selected || first.name;
      },
      updateChildren() {
        let selected = this.getSelected();
        this.$children.forEach(entry => {
          let reverse = this.selectedIndex <= this.lastSelectedIndex;
          if (this.lastSelectedIndex === this.$children.length - 1 &&
            this.selectedIndex === 0) {
            reverse = false;
          }
          if (this.lastSelectedIndex === 0 &&
            this.selectedIndex === this.$children.length - 1) {
            reverse = true;
          }
          entry.reverse = reverse;
          this.$nextTick(() => {
            entry.selected = selected;
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .ui-sidebar {
    border: 1px solid black;

    &-window {
      overflow: hidden;
    }

    &-wrapper {
      position: relative;
    }

    &-dots {
      > span {
        &.active {
          background: red;
        }
      }
    }
  }
</style>