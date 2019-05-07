<template>
  <ui-table
      selected-items.sync=""
      :checkable="true"
      :data-source="dataSource"
      :columns="columns"></ui-table>
</template>

<script>
  import Table from './Table';

  export default {
    name: 'TableExample',
    components: {
      'ui-table': Table
    },
    data() {
      return {
        selected: [],
        dataSource: [
          {
            id: 1,
            date: '2019-04-10',
            city: '北京',
            area: '海淀'
          },
          {
            id: 2,
            date: '2019-04-10',
            city: '上海',
            area: '静安'
          }
        ],
        columns: [
          {
            text: '日期',
            field: 'date',
            width: '150'
          },
          {
            text: '市',
            field: 'city'
          },
          {
            text: '区',
            field: 'area'
          },
        ]
      };
    }
  };
</script>

<style scoped>

</style>