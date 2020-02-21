<template>
  <div class="cnt">
    <div class="todo">
      <div class="title">To Do List</div>
      <div class="header">
        <input class="new_todo_text" v-model="text" placeholder="接下来想要做点什么呢？" @keyup.enter="addTodo">
        <button class="add_todo" @click="addTodo">确定</button>
      </div>
      <div class="todo_list">
        <div v-for="item in todos" :key="item.id">
          <div :class="[item.done ? 'list done' : 'list']" v-if="type === 'all' || (type === 'undone' && !item.done) || (type === 'done' && item.done)">
            <!-- 前面的勾 -->
            <div class="toggle" @click="toggle" :data-id='item.id'></div>
            <div class="todo_text">{{item.text}}</div>
            <!-- 后面的删除 -->
            <div class="delete" @click="deleteTodo" :data-id='item.id'></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="category">
          <div class="all" data-filter='all' @click="filter">
            <div :class="type === 'all' ? 'active' : ''">所有</div>
          </div>
          <div class="undone" data-filter='undone' @click="filter">
            <div :class="type === 'undone' ? 'active' : ''">未完成</div>
          </div>
          <div class="done" data-filter='done' @click="filter">
            <div :class="type === 'done' ? 'active' : ''">已完成</div>
          </div>
        </div>
        
        <div class="btn">
          <button class="clear" v-if="done>0" @click="clear">清空已完成</button>
        </div>
      </div>
      <div class="blank" v-if="todos.length === 0">
        <p>太棒了，所有的任务都完成了</p>
        <p>去定个新目标吧~</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import 'reduce-loader!./web'

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      text: '', // 文本框文字
      todos: [
        { id: 1, text: "学习 Kbone 框架", done: false }
      ],
      todo: { // 为添加 todo 做准备
        id: 0,
        text: '',
        done: false
      },
      done: 0, // 已完成 todo 的数量
      type: 'all' // 显示的类型
    }
  },
  methods: {
    // onClickJump() {
    //   window.location.href = '/test/list/123'
    // },

    // onClickOpen() {
    //   window.open('/test/detail/123')
    // },
    addTodo() { // 添加 todo
      console.log('addTodo');
      // console.log(this.text);
      if (this.text.trim() === '') {
        this.text = '';
        return;
      }
      let myTodo = JSON.stringify(this.todo);
      this.todo.id = this.todos.length + 1;
      this.todo.text = this.text.trim();
      this.todos.push(this.todo);
      this.text = ''; // 清空输入
      this.todo = JSON.parse(myTodo); // 重置 todo
    },
    findTodo(id) {
      return this.todos.find((item) => {
        return item.id === Number(id)
      });
    },
    countDone() { // 计算已完成 todo 数量 --- 控制清空已完成的显示
      this.done = 0
      this.todos.forEach((item) => {
        if (item.done === true) this.done += 1;
      })
    },
    toggle(e) {
      console.log('toggle');
      // console.log(typeof e.currentTarget.dataset.id);
      let id = e.currentTarget.dataset.id;
      let todo = this.findTodo(id);
      // console.log(todo);
      todo.done = !todo.done;
      this.countDone();
    },
    deleteTodo(e) {
      console.log('deleteTodo');
      // console.log(e.currentTarget.dataset.id);
      let id = e.currentTarget.dataset.id;
      this.todos.map((item, index, arr) => {
        if (item.id === Number(id)) {
          arr.splice(index, 1);
        }
      });
      this.countDone();
    },
    filter(e) {
      this.type = e.currentTarget.dataset.filter
    },
    clear() { // 删除已完成 todo
      this.todos = this.todos.filter(item => {
        return item.done === false;
      })
      // for (let i = 0, len = this.todos.length; i < len; i++) {
      //   const item = this.todos[i];
      //   if (item.done) {
      //     this.todos.splice(i, 1);
      //     len--;
      //     i--;
      //   }
      // }
      this.done = 0;
    }
  },
})
</script>

<style lang="less">
@import './style.less';
</style>
