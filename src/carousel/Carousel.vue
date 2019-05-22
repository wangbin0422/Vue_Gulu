<template>
  <div
      class="ui-slides"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @touchmove="onTouchMove"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
  >
    <div class="ui-slides-window" ref="window">
      <div class="ui-slides-wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="ui-slides-dots">
      <span @click="onClickPrev">
        <ui-icon name="left"></ui-icon>
      </span>
      <span
          v-for="n in childrenLength"
          :key="n"
          :class="{active: selectedIndex === n-1}"
          @click="select(n-1)">
        {{n}}
      </span>
      <span @click="onClickNext">
        <ui-icon name="right"></ui-icon>
      </span>
    </div>
  </div>
</template>

<script>
  import Icon from '../Icon';

  export default {
    name: 'Carousel',
    components: {
      'ui-icon': Icon
    },
    props: {
      selected: {
        type: String
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      autoPlayDelay: {
        type: Number,
        default: 3000
      }
    },
    data() {
      return {
        childrenLength: 0,
        lastSelectedIndex: undefined,
        timer: undefined,
        startTouch: undefined
      };
    },
    mounted() {
      this.updateChildren();
      this.autoPlay && this.playAutomatically();
      this.childrenLength = this.items.length;
    },
    updated() {
      this.updateChildren();
    },
    computed: {
      selectedIndex() {
        const idx = this.names.indexOf(this.selected);
        return idx === -1 ? 0 : idx;
      },
      names() {
        return this.items.map(entry => entry.name);
      },
      items() {
        return this.$children.filter(entry => entry.$options.name === 'CarouselItem');
      }
    },
    methods: {
      onTouchMove() {

      },
      onTouchStart(e) {
        this.pause();
        if (e.touches.length > 1) {
          return;
        }
        this.startTouch = e.touches[0];
      },
      onTouchEnd(e) {
        let endTouch = e.changedTouches[0];
        let {clientX: x1, clientY: y1} = this.startTouch;
        let {clientX: x2, clientY: y2} = endTouch;
        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        let deltaY = Math.abs(y2 - y1);
        let rate = distance / deltaY;
        if (rate > 2) {
          if (x2 > x1) {
            this.select(this.selectedIndex - 1);
          } else {
            this.select(this.selectedIndex + 1);
          }
        }
        this.$nextTick(() => {
          this.playAutomatically();
        });
      },
      onMouseEnter() {
        this.pause();
      },
      onMouseLeave() {
        this.playAutomatically();
      },
      onClickPrev() {
        this.select(this.selectedIndex - 1);
      },
      onClickNext() {
        this.select(this.selectedIndex + 1);
      },
      pause() {
        window.clearTimeout(this.timer);
      },
      playAutomatically() {
        if (this.timer) {return;}
        let run = () => {
          let index = this.names.indexOf(this.getSelected());
          let newIndex = index + 1;
          this.select(newIndex);
          this.timer = setTimeout(run, this.autoPlayDelay);
        };
        this.timer = setTimeout(run, this.autoPlayDelay);
      },
      select(newIndex) {
        this.lastSelectedIndex = this.selectedIndex;
        if (newIndex === -1) {
          newIndex = this.names.length - 1;
        }
        if (newIndex === this.names.length) {
          newIndex = 0;
        }
        this.$emit('update:selected', this.names[newIndex]);
      },
      getSelected() {
        let first = this.items[0];
        return this.selected || first.name;
      },
      updateChildren() {
        let selected = this.getSelected();
        this.items.forEach(entry => {
          let reverse = this.selectedIndex <= this.lastSelectedIndex;
          if (this.timer) {
            if (this.lastSelectedIndex === this.items.length - 1 &&
              this.selectedIndex === 0) {
              reverse = false;
            }
            if (this.lastSelectedIndex === 0 &&
              this.selectedIndex === this.items.length - 1) {
              reverse = true;
            }
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
  .ui-slides {
    &-window {
      overflow: hidden;
    }

    &-wrapper {
      position: relative;
    }

    &-dots {
      padding: 8px 0;
      display: flex;
      justify-content: center;
      align-items: center;

      > span {
        width: 20px;
        height: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: #ddd;
        border-radius: 50%;
        margin: 0 8px;
        font-size: 12px;

        &.active {
          background: black;
          color: white;
        }

        &:hover {
          cursor: default;
        }
      }
    }
  }
</style>