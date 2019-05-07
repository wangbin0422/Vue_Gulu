<template>
  <div ref="wrapper" class="ui-table-wrapper">
    <div ref="tableWrapper"></div>
    <table ref="table" class="ui-table">
      <thead>
      <tr>
        <th v-if="expendField" :style="{width: '50px'}" class="ui-table-center"></th>
        <th v-if="checkable" :style="{width: '50px'}" class="ui-table-center">
          <input
              type="checkbox"
              ref="allChecked"
              :checked="areAllItemsSelected"
              @change="onChangeAllItems">
        </th>
        <th :style="{width: '50px'}" v-if="numberVisible">#</th>
        <th
            v-for="column in columns"
            :key="column.field"
            :style="{width: column.width + 'px'}">
          <div class="ui-table-header">
            {{column.text}}
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(item, idx) in dataSource">
        <tr :key="item.id">
          <td v-if="expendField" :style="{width: '50px'}" class="ui-table-center">
            <ui-icon class="ui-table-expendIcon" name="right" @click="expendItem(item.id)"></ui-icon>
          </td>
          <td v-if="checkable" :style="{width: '50px'}" class="ui-table-center">
            <input type="checkbox"
                   :checked="inSelectedItems(item)"
                   @click="onChangeItem(item, idx, $event)">
          </td>
          <td :style="{width: '50px'}" v-if="numberVisible">{{idx + 1}}</td>
          <template v-for="column in columns">
            <td :style="{width: column.width + 'px'}" :key="column.field">
              {{item[column.field]}}
            </td>
          </template>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Icon from '../Icon';

  export default {
    name: 'Table',
    components: {
      'ui-icon': Icon
    },
    data() {
      return {
        expendedIds: []
      };
    },
    props: {
      expendField: {
        type: String
      },
      checkable: {
        type: Boolean,
        default: false
      },
      numberVisible: {
        type: Boolean,
        default: false
      },
      dataSource: {
        type: Array,
        required: true,
        validator(array) {
          return !(array.filter(entry => entry.id === undefined).length > 0);
        }
      },
      columns: {
        type: Array,
        required: true
      },
      selectedItems: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      areAllItemsSelected() {
        const a = this.dataSource.map(item => item.id).sort();
        const b = this.selectedItems.map(item => item.id).sort();
        if (a.length !== b.length) return false;
        let equal = true;
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            equal = false;
            break;
          }
        }
        return equal;
      }
    },
    watch: {
      selectedItems() {
        if (this.selectedItems.length === this.dataSource.length) {
          this.$refs.allChecked.indeterminate = false;
        } else if (this.selectedItems.length === 0) {
          this.$refs.allChecked.indeterminate = false;
        } else {
          this.$refs.allChecked.indeterminate = true;
        }
      }
    },
    methods: {
      inExpendedIds(id) {
        return this.expendedIds.indexOf(id) >= 0;
      },
      expendItem(id) {
        if (this.inExpendedIds(id)) {
          this.expendedIds.splice(this.expendedIds.indexOf(id), 1);
        } else {
          this.expendedIds.push(id);
        }
      },
      inSelectedItems(item) {
        return this.selectedItems.filter(entry => entry.id === item.id).length > 0;
      },
      onChangeItem(item, idx, e) {
        let checked = e.target.checked;
        let copy = JSON.parse(JSON.stringify(this.selectedItems));
        if (checked) {
          copy.push(item);
        } else {
          copy = copy.filter(entry => entry.id !== item.id);
        }
        this.$emit('update:selectedItems', copy);
      },
      onChangeAllItems(e) {
        let checked = e.target.checked;
        this.$emit('update:selectedItems', checked ? this.dataSource : []);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  $grey: darken($grey, 10%);
  .ui-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $grey;

    &.bordered {
      border: 1px solid $grey;

      td, th {
        border: 1px solid $grey;
      }
    }

    &.compact {
      td, th {
        padding: 4px;
      }
    }

    td, th {
      border-bottom: 1px solid $grey;
      text-align: left;
      padding: 8px;
    }

    &.striped {
      tbody {
        > tr {
          &:nth-child(odd) {
            background: white;
          }

          &:nth-child(even) {
            background: lighten($grey, 10%);
          }
        }
      }
    }

    &-sorter {
      display: inline-flex;
      flex-direction: column;
      margin: 0 4px;
      cursor: pointer;

      svg {
        width: 10px;
        height: 10px;
        fill: $grey;

        &.active {
          fill: red;
        }

        &:first-child {
          position: relative;
          bottom: -1px;
        }

        &:nth-child(2) {
          position: relative;
          top: -1px;
        }
      }
    }

    &-header {
      display: flex;
      align-items: center;
    }

    &-wrapper {
      position: relative;
      overflow: auto;
    }

    & &-center {
      text-align: center;
    }
  }
</style>