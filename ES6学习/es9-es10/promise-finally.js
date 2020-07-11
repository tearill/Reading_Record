let state = {
  isLoading: true
}

Promise.resolve()
  .then(() => {
    // state.isLoading = false;
  })
  .catch(() => {
    // state.isLoading = false;
  })
  .finally(() => {
    // 不管是 resolve 还是 reject 都会走到这里
    state.isLoading = false;
  })