<template>
  <div id="app">
  		<router-view></router-view>
  </div>
</template>

<script>
	import Vue from 'vue'
	export default {
	 	name: 'app',
	    mounted:function(){
	  	}
	}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: auto;
  font-size: 20px;
}
</style>
