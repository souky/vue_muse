<template>
	<div id="index">
		<div class="header">
			<img src="static/img/moblie/top.png">
		</div>
		<div class="main">
			<router-view></router-view>
		</div>
		<div class="footer">
			<img src="static/img/moblie/footer.png">
		</div>
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
      this.$router.push("/login")
	  },
	  methods:{
	  }
}
</script>

<style>
#index{
	background:#fff;
}
#index .header{
	height:8vh;
	overflow: hidden;
}
#index .main{
	height: calc(78vh - 60px);
	overflow-x: hidden;
	overflow-y: auto;
	width:90%;
	margin: 30px auto;
	box-sizing: border-box;
}
#index .footer{
	height: 14vh;
	overflow: hidden;
  display: flex;
  justify-content: flex-end;
}
</style>
