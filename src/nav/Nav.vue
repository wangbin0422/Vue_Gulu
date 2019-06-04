<template>
  <div class="ui-nav">
    <slot></slot>
  </div>
</template>

<script>
  import NavItem from './Nav-item';
  import SubNav from './Sub-nav';

  export default {
    name: 'Nav',
    components: {
      'ui-nav-item': NavItem,
      'ui-sub-nav': SubNav
    },
    provide() {
      return {
        root: this
      };
    },
    props: {
      selected: {
        type: String,
      },
    },
    data() {
      return {
        items: [],
        namePath: []
      };
    },
    mounted() {
      console.log(this.selected);
      this.updateChildren();
      this.listenToChildren();
    },
    updated() {
      this.updateChildren();
    },
    methods: {
      addItem(vm) {
        this.items.push(vm);
      },
      updateChildren() {
        this.items.forEach(vm => {
          console.log(vm.name);
          if (this.selected === vm.name) {

            vm.selected = true;
          } else {
            vm.selected = false;
          }
        });
      },
      listenToChildren() {
        this.items.forEach(vm => {
          vm.$on('update:selected', (name) => {
            this.$emit('update:selected', name);
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  .ui-nav {
    display: flex;
    border-bottom: 1px solid $grey;
    color: $color;
    cursor: default;
    user-select: none;

  }
</style>