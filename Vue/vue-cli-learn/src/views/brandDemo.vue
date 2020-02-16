<template>
  <div id="app">
      <h3>品牌列表案例</h3>
      <div class="options">
          <p>添加品牌</p>
          <div>
              <label>
                Id:
                <input type="text" name="id" v-model="id">
              </label>
              <label>
                Name:
                <input type="text" name="name" v-model="name">
              </label>
              <input class="btn" type="button" value="添加" @click="add">
              <label>
                搜索名称关键字:
                <input type="text" name="id" v-model="keywords">
              </label>
          </div>          
      </div>
      <table class="table table-bordered table-hover table-striped" border="1">
          <thead>
              <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Ctime</th>
                  <th>Operation</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="item in search(keywords)" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.ctime | dataFormat}}</td>
                  <td>
                      <a href="" @click.prevent="del(item.id)">删除</a>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            id: '',
            keywords: '',
            list: [
                {id: 1, name: '奔驰', ctime: new Date().toLocaleString()},
                {id: 2, name: '宝马', ctime: new Date().toLocaleString()},
            ]
        }
    },
    methods: {
        add() {
            var car = {
                id: this.id,
                name: this.name,
                ctime: new Date().toLocaleString()
            }
            this.list.push(car);
        },
        del(id) {   
            // solution 1    
            // this.list.some((item, index) => {
            //     if (item.id === id) {
            //         this.list.splice(index, 1);
            //         return true;
            //     }
            // })

            // solution 2            
            let index = this.list.findIndex(item => {
                if (item.id === id) {
                    return true;
                }
            })
            this.list.splice(index, 1);
        },
        search(keywords) {
            // var newList = [];
            // this.list.forEach(item => {
            //     if (item.name.indexOf(keywords) != -1) {
            //         newList.push(item);
            //     }
            // })
            // return newList;

            var newList = this.list.filter(item => {
                if (item.name.includes(keywords)) {
                    return item
                }
            })
            return newList;
        }
    },
    filters: {
        // 时间的格式化
        dataFormat(value, pattern = '') {
            // 根据给定的时间字符串，得到特定的字符串
            let dt = new Date();
            // 年月日
            let y = dt.getFullYear();
            let m = dt.getMonth() + 1;
            let d = dt.getDate();     

            // return y + '-' + m + '-' + d;
            
            if (pattern.toLowerCase() === 'yyyy-mm-dd') {
                return `${y}-${m}-${d}`; 
            } else {
                let hh = dt.getHours();
                let mm = dt.getMinutes();
                let ss = dt.getSeconds();

                return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
            }
        }
    }
}
</script>

<style lang="less">
#app {
    padding:0 50px 0 50px;
}
.table {
    width: 100%;
    border-collapse:collapse;
    thead {
        tr {
            height: 40px;
        }
    }
    tbody {
        tr:nth-child(1) {
            background-color: #eee;
        }
        tr {
            height: 40px;
            &:hover {
                background-color: #eee;
            }
            td {
                text-align-last: left;
                padding-left: 10px;
            }
            a {
                text-decoration: none;
                color: #3C9BD4;
            }
        }
    }
    
}

.options {
    text-align: left;
    margin-bottom: 50px;
    width: 100%;
    p, .btn {
        background-color: #3C8DBC;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
    }
    div { 
        label {
            font-weight: bold;
            input {
                font-weight: normal;
                padding: 5px;
            }
        }
        .btn {
            padding: 5px 10px 5px 10px;
            border: none;
        }
    }
}
</style>