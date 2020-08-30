<template>
  <div class="login">
    <img class="image_1" src="../assets/tu1_01.jpg" alt="">
    <div class="login-contain">
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button :loading="loadingLogin" class="submit-login" type="primary" @click="login">登录</el-button>
      <img class="image_2" src="../assets/tu_03.jpg" alt="">
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        username: '43906018',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      loadingLogin: false
    }
  },
  methods: {
    ...mapActions('User', [
      'loginIn'
    ]),
    async login () {
      try {
        await this.$refs.loginForm.validate()
        this.loadingLogin = true
        this.loginIn({
          LoginName: this.form.username,
          Password: this.form.password
        }).then(res => {
          this.loadingLogin = false
          this.$router.push('/home')
        }).catch(e => {
          this.loadingLogin = false
        })
      } catch (e) {
        this.loadingLogin = false
      }
    }
  }
}
</script>

<style lang="scss">
  .login {
    width: 100%;
    height: 100%;
    .login-contain {
      width: 97%;
      position: absolute;
      left: 0;
      right: 0;
      top: 30%;
      margin: auto;
      background-color: #fff;
      padding: 1rem 0.4rem 0;
      box-sizing: border-box;
      border-radius: 2px;
    }
    .submit-login {
      width: 100%;
      background: #004F9A;
      padding: .3rem 1rem;
      font-size: .4rem;
    }

    .image_1, .image_2 {
      width: 100%;
    }

    .image_2 {
      margin-top: 2rem;
    }
  }
</style>
