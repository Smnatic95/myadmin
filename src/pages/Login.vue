<template>
  <div class="Login" :style="{ backgroundImage: 'url(' + logoPng + ')' }">
    <div class="loginForm">
      <div class="title">管理员登录</div>

      <div class="iptItem userName">
        <el-input
          type="text"
          v-model="userName"
          placeholder="用户名"
          aria-required=""
          maxlength="8"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </div>

      <div class="iptItem password">
        <el-input
          type="password"
          v-model="password"
          placeholder="密码"
          show-password
          maxlength="8"
        ></el-input>
      </div>

      <div class="iptItem yzm">
        <el-input
          type="text"
          v-model="yzm"
          placeholder="验证码"
          maxlength="8"
        ></el-input>
        <div class="pul_right">
          <canvas id="yzmCanvas" height="40px" @click="drawYzm"></canvas>
          <div class="toa" @click="drawYzm">看不清?换一张</div>
        </div>
      </div>

      <el-button class="btn_login" type="primary" @click="login"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script>
import logoPng from "@/assets/loginBg.png";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      logoPng,
      userName: "",
      password: "",
      yzm: "",
      width_canvas: null,
      height_canvas: null,
      yzmCtx: null,
      randStr: null,
      yzmStatus: 1,
    };
  },
  mounted() {
    this.drawYzm();
  },
  methods: {
    login() {
      let userName = this.userName,
        password = this.password,
        yzm = this.yzm;
      if (!userName) {
        this.$alert("请填写用户名", "提示", {
          type: "warning",
        });
        return;
      }
      if (!password) {
        this.$alert("请填写密码", "提示", {
          type: "warning",
        });
        return;
      }

      if (!this.yzmStatus) {
        this.$alert("验证码过期,请点击刷新", "提示", {
          type: "warning",
        });
        return;
      }

      if (!yzm) {
        this.$alert("请填写验证码", "提示", {
          type: "warning",
        });
        return;
      }

      if (yzm != this.randStr) {
        this.$alert("验证码错误", "提示", {
          type: "warning",
        });
        this.yzmStatus = 0;
        return;
      }

      let params = {
        name: userName,
        password: password,
      };
      this.$axios
        .post("/admin/user/login", params)
        .then((result) => {
          if (result.code == 1) {
            window.localStorage.setItem("token", result.data);
            this.$message({
              message: "登录成功·",
              type: "success",
              offset: 100,
              duration: 500,
            });
            setTimeout(() => {
              this.$router.push({
                path: "/"
              });
            }, 500);
          } else {
            this.yzmStatus = 0;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //画验证码
    drawYzm() {
      if (!this.yzmCtx) {
        this.initCanData();
      } else {
        this.yzmCtx.clearRect(0, 0, this.width_canvas, this.height_canvas);
      }
      this.drawCanvasBg();
      this.cRandomStr();
      this.cRGRLine();
      this.cRGRDot();
    },
    //生成随机数
    cRandomNum(min, max) {
      return parseInt(Math.random() * (max - min) + min);
    },
    //生成随机颜色
    cRandomColor(min, max) {
      var r = this.cRandomNum(min, max);
      var g = this.cRandomNum(min, max);
      var b = this.cRandomNum(min, max);
      return `rgb(${r},${g},${b})`;
    },
    //绘制随机字符串
    cRandomStr() {
      var pool = "qwertyuiopasdfghjklzxcvbnm123456789";
      var randStr = "";
      for (var i = 0; i < 4; i++) {
        //取出随机字符
        var c = pool[this.cRandomNum(0, pool.length)];
        randStr += c;
        //随机出字体大小
        var fs = this.cRandomNum(30, 40);
        //随机字符的旋转角度
        var deg = this.cRandomNum(-30, 30);
        //随机字体的填充颜色
        var fc = this.cRandomColor(80, 150);

        var ctx = this.yzmCtx;
        ctx.font = "normal bold " + fs + "px sans-serif";
        ctx.textBaseline = "top";
        ctx.fillStyle = fc;
        ctx.save();
        ctx.translate(50 * i + 30, 5);
        ctx.rotate((deg * Math.PI) / 180);
        ctx.fillText(c, 0, 0);
        ctx.restore();
      }
      this.randStr = randStr;
      this.yzmStatus = 1;
    },
    //绘制干扰线
    cRGRLine() {
      var ctx = this.yzmCtx;
      for (var i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(
          this.cRandomNum(0, this.width_canvas),
          this.cRandomNum(0, this.height_canvas)
        );
        ctx.lineTo(
          this.cRandomNum(0, this.width_canvas),
          this.cRandomNum(0, this.height_canvas)
        );
        ctx.strokeStyle = this.cRandomColor(180, 230);
        ctx.closePath();
        ctx.stroke();
      }
    },
    //绘制干扰圆点
    cRGRDot() {
      var ctx = this.yzmCtx;
      for (var i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(
          this.cRandomNum(0, this.width_canvas),
          this.cRandomNum(0, this.height_canvas),
          2,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = this.cRandomColor(150, 200);
        ctx.fill();
      }
    },
    //绘制背景颜色
    drawCanvasBg() {
      var ctx = this.yzmCtx;
      ctx.fillStyle = this.cRandomColor(180, 230);
      ctx.fillRect(0, 0, this.width_canvas, this.height_canvas);
    },
    initCanData() {
      var canvas = document.querySelector("#yzmCanvas");
      var ctx = canvas.getContext("2d");
      this.width_canvas = canvas.width;
      this.height_canvas = canvas.height;
      this.yzmCtx = ctx;
    },
  },
};
</script>

<style scoped>
.Login {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.loginForm {
  position: fixed;
  top: 50%;
  right: 200px;
  transform: translate(0, -50%);
  width: 300px;
  min-height: 200px;
  padding: 30px 50px;
  background-color: #fff;
  color: #007ee1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
}
.loginForm .title {
  font-size: 18px;
  font-weight: 600;
}
.iptItem {
  width: 80%;
  margin-top: 20px;
}
.iptItem.yzm {
  display: flex;
  justify-content: space-between;
}
.iptItem.yzm .el-input {
  width: calc(100% - 140px);
}
.iptItem.yzm canvas#yzmCanvas {
  width: 120px;
  height: 40px;
}
.iptItem.yzm .pul_right .toa {
  font-size: 10px;
  color: #dd5044;
  cursor: pointer;
}
.btn_login {
  width: 70%;
  margin-top: 30px;
}
</style>
