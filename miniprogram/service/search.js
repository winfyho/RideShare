function getsuggest(keyword,pageObj) {
  var QQMapWX = require('../libs/qqmap-wx-jssdk.js');
  var qqmapsdk;
  qqmapsdk = new QQMapWX({
    key: '4X5BZ-ER3K5-4FKIN-QRG6Q-6Z3SO-4QBVY'
  });
  var _this = pageObj;
  //调用关键词提示接口
  qqmapsdk.getSuggestion({
    //获取输入框值并设置keyword参数
    keyword: keyword, //用户输入的关键词，可设置固定值,如keyword:'KFC'
    region:'厦门市', //设置城市名，限制关键词所示的地域范围，非必填参数

    success: function (res) {//搜索成功后的回调

      console.log(res.data);
      var sug = [];
      for (var i = 0; i < res.data.length; i++) {
        sug.push({ // 获取返回结果，放到sug数组中
          title: res.data[i].title,
          id: res.data[i].id,
          addr: res.data[i].address,
          city: res.data[i].city,
          district: res.data[i].district,
          latitude: res.data[i].location.lat,
          longitude: res.data[i].location.lng
        });
      }

      _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
        suggestion: sug
      });
    },
    fail: err => {
      console.log(err)
    }


    
  });
}

export default{
  getsuggest
}