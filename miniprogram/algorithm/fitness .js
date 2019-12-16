function fitness(point, groupIndexs, lineGroup) {

  // 确定搜索区域所在下标
  let groupIndex = -1;
  groupIndexs.forEach((i, n) => {
    if (n != groupIndexs.length -1){
      if (point.latitude > i.e && point.latitude < i.s) {
        groupIndex = n
      }
    }else{
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
    let minDis = 100000;
    searchRanges.forEach((i, n) => {
      let w = Math.abs((point.latitude - i.latitude) * 111);
      let h = Math.abs((point.longitude - i.longitude) * 111)
      if (w < 1 && h < 1) {
        let dis = w*w+h*h
        minDis = dis < minDis ? dis : minDis
        
        // console.log(i, n)
      }
    })
    // console.log("最小距离", minDis*1000,'米', point)
    // 距离越小，适应度越好
    return minDis === 100000 ? -1 : minDis

  }
}
export {
  fitness
}