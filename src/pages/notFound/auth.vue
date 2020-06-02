<template>
  <div id="notFound"></div>
</template>

<script>
import { getToken } from "@/api/authorize.js";
import cookie from "js-cookie";
export default {
  data() {
    return {};
  },
  beforeCreate() {
    var getQueryString = function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    let code = getQueryString("code");
    if (code && code != "" && code != null) {
      let param = {
        code: code
      };
      getToken(param)
        .then(res => {
          if (res.data.success) {
            let type = res.data.data.type;
            let token = res.data.data.token;
            if (type == 1) {
              cookie.set("token", token);
              this.$router.push({
                name: "personal"
              });
            } else if (type == 2) {
              cookie.set("token", token);
              this.$router.push({
                name: "bindInfo",
                query: {
                  type: type
                }
              });
            } else if (type == 3) {
              this.$router.push({
                name: "bindInfo",
                query: {
                  type: type
                }
              });
            }
          }
        })
        .catch(err => {
          this.$router.push({
            name: "error"
          });
        });
    } else {
      window.location.href =
        window.apiConfig.wx_url +
        "?appid=" +
        window.apiConfig.appID +
        "&redirect_uri=" +
        encodeURIComponent(window.apiConfig.redirect_url) +
        "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    }
  },
  methods: {}
};
</script>

