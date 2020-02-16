<template>
  <div>
      <h1>filter 过滤器</h1>
      <div>{{content | uppercase}}</div>
      <div>{{content | transform('capitalize')}}</div>
      <!-- 单次使用多个过滤器 -->
      <div>{{content | uppercase | join('~')}}</div>
      <div>{{content | uppercase | join('+')}}</div>
      <div>{{msg | msgFormat('疯狂')}}</div>
      <div>{{msg | msgFormat('疯狂', '123')}}</div>
  </div>
</template>

<script>
import Vue from 'vue'

// 全局过滤器 -> 直接放到 main.js 中所有页面都可以使用
// Vue.filter('uppecase', value => {
//         return value.toUpperCase()
//     })

export default {
    data() {
        return {
            content: "aishfjdhskdjhdsjgfdjsh",
            msg: "曾是我也是一个单纯的少年，单纯的我，傻傻的问，谁是世界上最单纯的人"
        }
    },
    filters: {
        uppercase (value) {
            return value.toUpperCase()
        },
        transform(value, type) {
            switch (type) {
                case 'uppercase':
                    return value.toUpperCase();
                    break;
                case 'lowercase':
                    return value.toLowerCase();
                    break;
                case 'capitalize':
                    return value.charAt(0).toUpperCase() + value.substr(1);
                    break;
                default:
                    break;
            }
        },
        join(value, str) {
            return value.split("").join(str);
        },
        msgFormat(value, str1, str2) {
            return value.replace(/单纯/g, str1 + str2);
        }
    }
}
</script>

<style>

</style>