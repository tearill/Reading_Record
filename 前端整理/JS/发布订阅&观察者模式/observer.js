class Subject { // 被观察者
  constructor(name) {
    this.name = name;
    this.observers = [];
    this.state = '开心';
  }
  attach(o) { // 添加观察者依赖
    this.observers.push(o);
  }
  setState(newState) { // 通知更新
    this.state = newState;
    this.observers.forEach(o => o.update(this));
  }
}

class Observer { // 观察者
  constructor(name) {
    this.name = name;
  }
  update(baby) { // 更新
    console.log(this.name + ' 知道了当前 ' + baby.name + ' 状态是 ' + baby.state);
  }
}

// 被观察者需要收集所有的观察者
let baby = new Subject('小宝宝');
let o1 = new Observer('爸爸');
let o2 = new Observer('妈妈');
baby.attach(o1);
baby.attach(o2);
baby.setState('不开心');
baby.setState('开心');
