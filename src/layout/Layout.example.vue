<template>
  <div>
    <h2>布局-1</h2>
    <ui-layout>
      <ui-header style="height: 50px;background: lightskyblue;">
        Header
      </ui-header>
      <ui-content style="height: 100px;background: deepskyblue;">
        Content
      </ui-content>
      <ui-footer style="height: 50px;background: lightskyblue;">
        Footer
      </ui-footer>
    </ui-layout>
    <br />
    <h2>布局-2</h2>
    <ui-layout>
      <ui-header style="height: 50px;background: lightskyblue;">
        Header
      </ui-header>
      <ui-layout>
        <ui-sider style="height: 100px; background:#ddd; width:200px;">
          sider
        </ui-sider>
        <ui-content style="height: 100px; background:deepskyblue;">
          Content
        </ui-content>
      </ui-layout>
      <ui-footer style="height: 50px;background: lightskyblue;">
        Footer
      </ui-footer>
    </ui-layout>
  </div>
</template>

<script>
  import Layout from './Layout';
  import Header from './Header';
  import Footer from './Footer';
  import Content from './Content';
  import Sider from './Sider';

  export default {
    name: 'LayoutExample',
    components: {
      'ui-layout':Layout,
      'ui-header':Header,
      'ui-footer':Footer,
      'ui-content':Content,
      'ui-sider':Sider
    }
  };
</script>

<style scoped>

</style>