<template>
	<div id="index" @click="show">
		{{msg}}
	</div>
</template>

<script>
export default {
	  data () {
	    return {
	      msg: 'index_muse',
	    }
	  },
	  mounted:function(){
      this.$toast.info('hello world');
	  },
	  methods:{
			show(){
				this.$alert('Hello world', 'Alert');
			}
	  }
}
</script>

<style>

</style>
