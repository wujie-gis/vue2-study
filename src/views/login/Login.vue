<template>
  <div class="warp">
    <header>基础框架</header>
    <a-form id="components-form-demo-normal-login" class="form login-form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="['userName', { rules: [{ required: true, message: 'Please input your username!' }] }]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="['password', { rules: [{ required: true, message: 'Please input your Password!' }] }]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          Remember me
        </a-checkbox>
        <a class="login-form-forgot" href=""> Forgot password </a>
        <a-button type="primary" html-type="submit" class="login-form-button"> Log in </a-button>
        Or
        <a href=""> register now! </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      this.$router.push('/dashboard');
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.warp {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/login/bg.png');
  background-size: 100% 100%;
  color: #fff;
}
header {
  text-align: center;
  padding-top: 200px;
  font-size: 2em;
}
.form {
  width: 450px;
  margin: 100px auto;
}
</style>
