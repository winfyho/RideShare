function evaluation (oldResult, newResult){
  let delt_E = getTotalDis(newResult) - getTotalDis(oldResult)
  if (delt_E < 0){
    return newResult
  }else{
    // 以概率替换
    let p = 1 / (1 + Math.exp(-delt_E / 3));
    // console.log(p, delt_E)
    if (Math.random() < p) {
      return newResult;
    }else{
      return oldResult
    }
    
  }

  // 计算解的总距离，判断解的优秀程度
  function getTotalDis(res) {
    let sum = 0;
    res.forEach(i => {
      sum += i.a_dis;
    })
    // console.log(sum)
    return sum;
  }
  
}
export {
  evaluation
}

