<template>
    <div class="root">
        <div>
            <label>Id:
                <input type="text" v-model="id">
            </label>
            <label>Name:
                <input type="text" v-model="name">
            </label>
            <input type="button" value="添加" @click="add">
        </div>
        不使用 key 时选中复选框 在头部添加数据 数据会往下挤 但复选框不会跟着数据走<br>
        key 只能用 number/string
        <div class="list">
            <p v-for="item in list" :key="item.id">
                <input type="checkbox">
                {{item.id}} --- {{item.name}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            name: '',
            list: [
                {id: 1, name: '张三'},
                {id: 2, name: '里斯'},
                {id: 3, name: '嬴政'},
                {id: 4, name: '赵高'},
                {id: 5, name: '韩信'}
            ]
        }
    },
    methods: {
        add() {
            this.list.unshift({
                id: this.id,
                name: this.name
            })
        }
    }
}
</script>

<style lang="less">
</style>