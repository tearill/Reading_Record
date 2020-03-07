new Promise((resolve,reject)=>{
  console.log("promise1")
  resolve()
})
.then(()=>{
  console.log("then11")
  new Promise((resolve,reject)=>{
      console.log("promise2")
      resolve()
  })
  .then(()=>{
    console.log("then21")
  })
  .then(()=>{
    console.log("then23")
  })
})
.then(()=>{
  console.log("then12")
})

// promise1
// then11
// promise2
// then21
// then12
// then23