async function fn1(next) {
  console.log('fn1');
  await next();
  console.log('end fn1');
}

async function fn2(next) {
  console.log('fn2');
  await delay();
  await next();
  console.log('end fn2');
}

async function fn3(next) {
  console.log('fn3');
}

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  })
}

const compose = middlewares => {
  return () => {
    const dispatch = i => {
      let fn = middlewares[i];
      if(!fn) {
        return Promise.resolve();
      }else {
        const next = () => dispatch(i+1);
        return Promise.resolve(
          // Promise 完成，再执行下一个
          fn(next)
        )
      }
    }
    return dispatch(0);
  }
}

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();