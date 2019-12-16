function getDirection(start,end,pageObj) {
  var QQMapWX = require('../libs/qqmap-wx-jssdk.js');
  var qqmapsdk;
  qqmapsdk = new QQMapWX({
    key: '4X5BZ-ER3K5-4FKIN-QRG6Q-6Z3SO-4QBVY'
  });
  var _this = pageObj;
  //调用距离计算接口
  qqmapsdk.direction({
    mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
    //from参数不填默认当前地址
    from: start,
    to: end,
    success: function (res) {
      var ret = res;
      console.log(ret)

      var coors = ret.result.routes[0].polyline, pl = [];
      //坐标解压（返回的点串坐标，通过前向差分进行压缩）
      var kr = 1000000;
      for (var i = 2; i < coors.length; i++) {
        coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
      }
      //将解压后的坐标放入点串数组pl中
      for (var i = 0; i < coors.length; i += 2) {
        pl.push({ latitude: coors[i], longitude: coors[i + 1] })
      }
      // console.log(pl)
      //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
      _this.setData({
        latitude: pl[0].latitude,
        longitude: pl[0].longitude,
        polyline: [{
          points: pl,
          color: '#0059ff88',
          width: 5
        }],
        include_Points: pl
      })
      console.log("polyline-",_this.data.polyline[0].points);

    },
    
  });
}
export default{
  getDirection
}