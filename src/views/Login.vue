<template>
  <div class="login">
    <img class="image_1" src="../assets/tu1_01.jpg" alt="">
    <div class="login-contain">
      <el-form :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input type="password" clearable v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="submit-login" type="primary" @click="login">登录</el-button>
      <img class="image_2" src="../assets/tu_03.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login () {
      this.$router.push('/home')
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
    }

    .image_1, .image_2 {
      width: 100%;
    }

    .image_2 {
      margin-top: 2rem;
    }
  }
</style>
