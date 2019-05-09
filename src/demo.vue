<template>
  <ui-layout>
    <ui-header class="ui-header">Vue UI</ui-header>
    <ui-layout>
      <ui-sider class="ui-sidebar">
        <ul>
          <li>
            <router-link to="/button" exact>Button</router-link>
          </li>
          <li>
            <router-link to="/layout">Layout</router-link>
          </li>
          <li>
            <router-link to="/table">Table</router-link>
          </li>
        </ul>
      </ui-sider>
      <ui-content class="ui-content">
        <router-view></router-view>
      </ui-content>
    </ui-layout>
    <ui-footer>&copy; vue ui</ui-footer>
  </ui-layout>
</template>

<script>
  import Layout from './layout/Layout';
  import Header from './layout/Header';
  import Footer from './layout/Footer';
  import Content from './layout/Content';
  import Sider from './layout/Sider';
  import ButtonExample from './Button/Button.example';
  import LayoutExample from './layout/Layout.example';
  import TableExample from './table/Table.example';

  export default {
    name: 'demo',
    components: {
      'ui-layout': Layout,
      'ui-header': Header,
      'ui-footer': Footer,
      'ui-content': Content,
      'ui-sider': Sider,
      ButtonExample,
      LayoutExample,
      TableExample
    },
  };
</script>

<style lang="scss" scoped>
  @import './styles/var';
.ui-header {
  height: 40px;
  line-height: 24px;
  background: #fff;
  width: 100%;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  padding: 10px 60px;
  color: #42b983;
  font-size: 1.2em;
}
.ui-sidebar {
  min-width: 180px;
  padding: 10px;
  height: calc(100vh - 60px);
  color: #7f8c8d;
  a {
    display: inline-block;
    padding: 8px 0;
  }
  .active {
    color: #42b983;
  }
}
.ui-content {
  padding: 16px;
  height: calc(100vh - 60px);
}
.ui-footer {
  position: fixed;
  bottom: 8px;
  left: 0;
  right: 0;
}
</style>