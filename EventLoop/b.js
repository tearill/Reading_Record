new Promise((resolve,reject)=>{
  console.log("promise1",1) 
  resolve()
})
.then(()=>{
  console.log("then11",2)
  new Promise((resolve,reject)=>{
      console.log("promise2",3)
      resolve();
  })
  .then(()=>{
      console.log("then21",4)
      new Promise((resolve,reject)=>{
          console.log("promise3",5)
          resolve();
      })
      .then(()=>{
          console.log("then31",7)
      })
      .then(()=>{
          console.log("then32",9)
      })
  })
  .then(()=>{
      console.log("then22",8)
  })
})
.then(()=>{
  console.log("then12",6)
})  

// promise1 1
// then11 2
// promise2 3
// then21 4
// promise3 5
// then12 6
// then31 7
// then22 8
// then32 9