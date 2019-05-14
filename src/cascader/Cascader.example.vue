<template>
  <div>
    <p>{{selected &&selected[0] &&selected[0].name || '空'}}</p>
    <p>{{selected &&selected[1] &&selected[1].name || '空'}}</p>
    <p>{{selected &&selected[2] &&selected[2].name || '空'}}</p>
    <ui-cascader
      popover-height="100px"
      :source="source"
      :selected="selected"
      @update:selected="selected = $event"></ui-cascader>

  </div>
</template>

<script>
  import Cascader from './Cascader';

  export default {
    name: 'CascaderExample',
    components: {
      'ui-cascader': Cascader
    },
    data() {
      return {
        selected: [],
        source: [
          {
          name: '浙江',
          children: [
            {
              name: '杭州',
              children: [
                {name: '上城'},
                {name: '下城'},
                {name: '江干'},
              ]
            },
            {
              name: '嘉兴',
              children: [
                {name: '南湖'},
                {name: '秀洲'},
                {name: '嘉善'},
              ]
            },
          ]
        },
        {
          name: '福建',
          children: [
            {
              name: '福州',
              children: [
                {name: '鼓楼'},
                {name: '台江'},
                {name: '仓山'},
              ]
            },
          ]
        }]
      };
    },
  };
</script>

<style scoped>

</style>