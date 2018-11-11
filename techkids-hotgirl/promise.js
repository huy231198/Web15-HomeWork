// const promiseExp = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(function () {
//             resolve("Tra tien");
//         }, 5000);
//         setTimeout(function () {
//             reject("Di buoi tra tien");
//         }, 3000);
//     });
// }
// promiseExp()
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log("Error: ", err);
//     })




// const muaRau = (money) => new Promise((resolve, reject) => {
//     if (money > 10000) {
//         resolve("Rau cua chau day");
//     } else reject("Di buoi ban");
// });

// const anRau = () => new Promise((resolve, reject) => {
//     setTimeout(function () {
//         resolve("An xong r");
//     }, 5000);
// });

// muaRau(10001)
//     .then((data) => {
//         console.log(data);
//         return anRau;
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log("Error: ", err);
//     });
// console.log("xong");




// const asyncFunction = async () => {
//     console.log("bd mua rau");
//     muaRau(10001);
//     console.log("da co rau");
//     anRau(10001);
//     console.log("xong");    
// }
// asyncFunction();