function fitness(point, groupIndexs, lineGroup) {

  // 确定搜索区域所在下标
  let groupIndex = -1;
  groupIndexs.forEach((i, n) => {
    if (n != groupIndexs.length - 1) {
      if (point.latitude > i.e && point.latitude < i.s) {
        groupIndex = n
      }
    } else {
      if (point.latitude > i.e - 0.002 && point.latitude < i.s) {
        groupIndex = n
      }
    }

  })

  //判定适应度
  if (groupIndex === -1) {
    // console.log("该点适应度为-1", point)
    return -1
  } else {
    // 确定搜索范围
    let searchRanges = lineGroup[groupIndex];
    // console.log("fitness-groupindex", searchRanges, point)
    let minDis = 3;
    let minPoint = {}
    let length = searchRanges.length;
    let indexs = []
    for (let i = 0; i < length / 3; i++) {

      // 得到新解
      let index = Math.ceil(Math.random() * (length-1));

      indexs.push(index)
      let item = searchRanges[index];
      // console.log(item)
      let w = Math.abs((point.latitude - item.latitude) * 111);
      let h = Math.abs((point.longitude - item.longitude) * 111)
      if (w < 1 && h < 1) {
        let dis = Math.sqrt(w * w + h * h) 
        minDis = dis < minDis ? dis : minDis
        minPoint = point

      }
    }
    // console.log(indexs, searchRanges, length)
    // console.log("最小距离", parseInt(minDis * 1000), point)
    return minDis === 3 ? 3 : minDis;

  }

}


// searchRanges.forEach((i, n) => {
//   let w = Math.abs((point.latitude - i.latitude) * 111);
//   let h = Math.abs((point.longitude - i.longitude) * 111)
//   if (w < 1 && h < 1) {
//     let dis = w*w+h*h
//     minDis = dis < minDis ? dis : minDis

//     // console.log(i, n)
//   }
// })
// console.log("最小距离", minDis*1000,'米', point)
// 距离越小，适应度越好



export {
  fitness
}