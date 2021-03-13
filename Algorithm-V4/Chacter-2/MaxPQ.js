function exch(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}; 

// 堆的上浮
function swim(pq, k) {
  while(k > 1 && (pq[k] > pq[k>>1])) {
    exch(pq, k, k>>1);
    k >>= 1;
  };
};

// 堆的下沉 
// 如果k大于子节点最大的，那么循环结束如果小于最大的，交换，相当于严密的组织，有能力的人往上走
function sink(pq, k) {
  const len = pq.length;
  while(2*k < len) {
    let j = 2*k;
    if(j < len && pq[j] < pq[j+1]) j++;
    if(pq[j] < pq[k]) break;
    exch(pq, j, k);
    k = j;
  }
};

class MaxPQ {
  constructor() {
    this.pq = [null];
    this.N = 0;
  }

  isEmpty() { return this.N === 0 }

  size() { return this.N }

  insert(val) {
    this.pq.push(val);
    this.N += 1;
    this.swim(this.N);
  }

  delete() {
    if(this.N > 1) {
      const max = this.pq[1];
      this.exch(1, this.N);
      this.pq.pop();
      this.N -= 1;
      this.sink(1);
      return max;
    }else {
      throw Error("堆中无数据！")
    }
  }

  swim(k) {
    while(k > 1 && this.less(k>>1, k)) {
      this.exch(k>>1, k);
      k >>= 1;
    }
  }

  sink(k) {
    while(2*k <= this.N) {
      let j = 2*k;
      if(j < this.N && this.less(j, j+1)) j++;
      if(this.less(j, k)) break;
      this.exch(j, k);
      k = j;
    }
  }

  exch(i, j) {
    const temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }

  less(i, j) {
    return this.pq[i] < this.pq[j];
  }
};

const pq = new MaxPQ();
pq.insert(1)
pq.insert(0)
pq.insert(3)
pq.insert(2)
pq.insert(10)
pq.delete()
pq.delete()
console.log(pq.pq);
