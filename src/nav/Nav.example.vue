<template>
  <ui-nav :selected.sync="selected">
    <ui-nav-item name="home">Home</ui-nav-item>
    <ui-sub-nav name="about">
      <template slot="title">About</template>
      <ui-nav-item name="culture">Culture</ui-nav-item>
      <ui-nav-item name="team">Team</ui-nav-item>
      <ui-sub-nav name="state">
        <template slot="title">Location</template>
        <ui-nav-item name="city">Beijing</ui-nav-item>
        <ui-nav-item name="area">HaiDian</ui-nav-item>
      </ui-sub-nav>
    </ui-sub-nav>
    <ui-nav-item name="chat">Chat</ui-nav-item>
  </ui-nav>
</template>

<script>
  import Nav from './Nav';
  import NavItem from './Nav-item';
  import SubNav from './Sub-nav'

  export default {
    name: 'NavExample',
    components: {
      'ui-nav': Nav,
      'ui-nav-item': NavItem,
      'ui-sub-nav': SubNav
    },
    data() {
      return {
        selected: 'home'
      }
    }
  };
</script>

<style scoped>

</style>