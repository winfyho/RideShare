function searchOthers(point,passengers,dis=1200){
  console.log("search-others", point,passengers,dis)

  var includes = []
  passengers.forEach(i => {
    if (Math.abs((i.latitude - point.latitude) * 100000)  < dis
      && Math.abs((i.longitude - point.longitude) * 100000) < dis)
    {
      console.log(i.title,Math.abs((i.latitude - point.latitude) * 100000), Math.abs((i.longitude - point.longitude) * 100000))
      includes.push(i)
    }
  })
  console.log(includes)
  return includes

}
export default{
  searchOthers
}