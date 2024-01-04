export default function postSize(str) {
  let end = ['.com', '.org', '.net', '.ru', '.io', '.gov', '.edu', '.uk', '.de', '.jp']
  let start = ['http://', 'https://', 'www.']
  str= str.split(' ')
  let arr=[]
  str.forEach(w=>{
    if(end.some(e=>w.includes(e))||start.some(s=>w.includes(s))){
      arr.push(w)
    }
  })
  str = str.filter(w=>!arr.includes(w))
  return str.join(' ').length
}
