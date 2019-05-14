<template>
  <div>
    <ui-cascader
      popover-height="200px"
      :source.sync="source"
      :selected.sync="selected"
      @update:source="onUpdateSource"
      @update:selected="onUpdateSelected"
      :load-data="loadData"></ui-cascader>
  </div>
</template>

<script>
  import Cascader from './Cascader';
  import db from '../db';

  function request(parentId = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = db.filter(entry => entry.parent_id == parentId);
        result.forEach(node => {
          if (db.filter(item => item.parent_id === node.id).length > 0) {
            node.isLeaf = false;
          } else {
            node.isLeaf = true;
          }
        });
        resolve(result);
      }, 300);
    });
  }

  export default {
    name: 'CascaderExample',
    components: {
      'ui-cascader': Cascader
    },
    data() {
      return {
        selected: [],
        source: []
      };
    },
    created() {
      request(0).then(result => {
        this.source = result;
      });
    },
    methods: {
      onUpdateSource() {

      },
      onUpdateSelected() {

      },
      loadData({id}, updateSource) {
        request(id).then(result => {
          updateSource(result);
        });
      }
    }
  };
</script>

<style scoped>

</style>