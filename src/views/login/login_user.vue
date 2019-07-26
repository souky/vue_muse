<template lang="html">
  <div class="mainBody">
    <mu-container>
      <mu-text-field label="姓名" @blur="vName()" :error-text="errorMsg.userName" v-model="userscore.userName" label-float full-width ></mu-text-field>
      <mu-text-field label="年龄" @blur="vAge()" :error-text="errorMsg.userAge" v-model="userscore.userAge" label-float full-width></mu-text-field>
      <mu-text-field label="手机号" @blur="vPhone()" :error-text="errorMsg.userPhone" v-model="userscore.userPhone" label-float full-width ></mu-text-field>
      <mu-text-field label="所在城市" @blur="vAddress()" :error-text="errorMsg.userAddress" v-model="userscore.userAddress" label-float full-width></mu-text-field>
    </mu-container>
    <mu-flex style="width:200px;margin:20px auto">
      <mu-button round color="primary" full-width @click="userLogin">开始测试</mu-button>
    </mu-flex>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userscore: {
        userName:"",
				userPhone:"",
				userAge:'',
				userAddress:''
      },
      errorMsg:{
        userName:"",
				userPhone:"",
				userAge:'',
				userAddress:''
      }
    }
  },
  methods:{
    userLogin(){
      if(this.vName() && this.vAge() && this.vPhone() && this.vAddress()){
        this.$confirm('为了便于您接收面试通知,请确保以上信息真实准确', '', {
          type: 'info',icon:''
        }).then(({ result }) => {
          if (result) {
            this.$postHttpForMb("userscore/getUserScoreByUserPhone",this.userscore,res=>{
              var flag = res.result.userFlag;
              if(flag == '0'){
                //this.$router.push("/answer");
                this.$toast.success('hello world');
                this.$setData("userId",res.result.id);
              }else{
                //this.$router.push("/finish");
                this.$toast.success('您已作答完毕');
              }
            })
          } else {
            this.$toast.message('点击了取消');
          }
        });
      }
    },
    vName(){
      var userName =/^[\u4e00-\u9fa5]{1,}$/;
      this.errorMsg.userName = "";
      if(!userName.test(this.userscore.userName)){
        this.errorMsg.userName = '姓名必须为中文'
        return false;
      }
      return true;
    },
    vPhone(){
      var userPhone =/^1[345789]\d{9}$/;
      this.errorMsg.userPhone = "";
      if(!userPhone.test(this.userscore.userPhone)){
        this.errorMsg.userPhone = '请填写正确手机号'
        return false;
      }
      return true;
    },
    vAge(){
      var userAge = /^\+?[1-9][0-9]*$/;
      this.errorMsg.userAge = "";
      if(!userAge.test(this.userscore.userAge)){
        this.errorMsg.userAge = '请填写真实年龄'
        return false;
      }
      return true;
    },
    vAddress(){
      var userAddress =/^[\u4e00-\u9fa5]{1,}$/;
      this.errorMsg.userAddress = "";
      if(!userAddress.test(this.userscore.userAddress)){
        this.errorMsg.userAddress = '请填写正确城市'
        return false;
      }
      return true;
    }
  }
}
</script>
