import router from './router';
import cookie from 'js-cookie';
// import store from './store';
import {
  getToken
} from '@/utils/auth';

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
router.beforeEach((to, from, next) => {
  let token = cookie.get("token");
  // let code = cookie.get("code");
  let code = getQueryString("code");
  if (token) {
    next('/');
  } else {
    if (code) {
      let param = {
        code: code
      };
      getToken(param).then(res => {
        if (res.data.success) {
          //   console.log(res);
          let type = res.data.data.type;
          let token = res.data.data.token;
          if (type == 1) {
            cookie.set("token", token);
            next('/');
          } else if (type == 2) {
            next('/404');
          } else if (type == 3) {
            window.location.href =
              window.apiConfig.wx_url +
              "?appid=" +
              window.apiConfig.appID +
              "&redirect_uri=" +
              encodeURI(window.apiConfig.redirect_url) +
              "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
          }
        }
      });
    } else {
      window.location.href =
        window.apiConfig.wx_url +
        "?appid=" +
        window.apiConfig.appID +
        "&redirect_uri=" +
        encodeURI(window.apiConfig.redirect_url) +
        "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    }
  }
});
