const postSize = str => {
    let end = ['.org','.com','.ru','.net']
    let start = ['http','https','www']

    let arr = str.split(' ');
    for(let i = 0;i<arr.length;i++){
        if(start.some(s=>arr[i].includes(s))||end.some(d=>arr[i].includes(d))){
            arr.splice(i,i)
        }
    }
    console.log(arr.join(' ').length)
};

const message1 = 'Всем привет! burtovoy.org github.com';
postSize(message1); // вернет 12
const message2 = 'Привет! https://github.com scss' ;
postSize(message2); // вернет 12
