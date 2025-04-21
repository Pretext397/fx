/**
 * 微信分享配置
 * 需要在 jQuery 和 weixinJssdk 之后引入此文件
 * wxShare对象自定义分享信息
 */

(function ($, wx) {
  $(document).ready(function () {
    // 转发信息
		let url=window.location.href.split("#")[0];
    var wxShare = {
			link:url, //微信分享链接
			imgUrl: url+"/logo.jpg", //微信分享logo
      title: "2025年度奉贤区储备人才招录", //微信分享标题
      desc: "2025年度奉贤区储备人才招录", //微信分享描述
    };
    if (isTest("demo")) {
      wxShare.title = "【测试】 " + wxShare.title;
    }
    var BASEURL = "https://xyhdj.51job.com/cmsapi";
    request(
      "/sysApi/weChat/getWeChatParamByUrl",
      { url: window.location.href },
      function (res) {
        // 获取微信的配置项
        const config = res.data;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: config.appId, // 必填，公众号的唯一标识
          timestamp: config.timestamp, // 必填，生成签名的时间戳
          nonceStr: config.nonceStr, // 必填，生成签名的随机串
          signature: config.signature, // 必填，签名
          jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"], // 必填，需要使用的JS接口列表
        });

        // 设置微信分享
        wx.ready(() => {
          //分享到朋友
          wx.onMenuShareAppMessage({
            title: wxShare.title, // 分享标题
            desc: wxShare.desc, // 分享描述
            link: wxShare.link, // 分享链接
            imgUrl: wxShare.imgUrl, // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            success: function () {
              // 分享成功
            },
            cancel: function () {
              // 分享取消
            },
            fail: function () {
              // 分享失败
            },
          });

          wx.onMenuShareTimeline({
            title: wxShare.title, // 分享标题
            desc: wxShare.desc, // 分享描述
            link: wxShare.link, // 分享链接
            imgUrl: wxShare.imgUrl, // 分享图标
            success: function () {
              // 分享成功
            },
            cancel: function () {
              // 分享取消
            },
            fail: function () {
              // 分享失败
            },
          });
        });
      }
    );
    function request(path, data, callback) {
      $.ajax({
        url: BASEURL + path,
        type: "post",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        processData: false,
        success: callback,
      });
    }
    function isTest(reg) {
      var path = window.location.pathname;
      return path.indexOf(reg) !== -1;
    }
  });
})($, wx);
