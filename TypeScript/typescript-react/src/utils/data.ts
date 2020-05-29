export interface Todo {
  id: string
  content: string
  user: string
  // time: string
  date: string
  isCompleted: boolean
}

export interface User {
  id: string
  name: string
  avatar: string
}

export function getUserById(userId: string) {
  return userList.filter(user => user.id === userId)[0];
}

export const todoListData = [
  {
    id: '1',
    content: 'Learn Vue',
    user: '123456',
    date: '2020年5月28日 11:12',
    isCompleted: false
  },
  {
    id: '2',
    content: 'Learn React',
    user: '123456',
    date: '2020年5月28日 11:12',
    isCompleted: false
  },
  {
    id: '3',
    content: 'Learn TypeScript',
    user: '111111',
    date: '2020年5月28日 11:12',
    isCompleted: false
  },
  {
    id: '4',
    content: 'Learn Browser',
    user: '222222',
    date: '2020年5月28日 11:12',
    isCompleted: false
  },
  {
    id: '5',
    content: 'Learn Chrome',
    user: '123456',
    date: '2020年5月28日 11:12',
    isCompleted: false
  },
]

export const userList = [
  {
    id: '123456',
    name: 'Horace',
    avatar: 'https://user-gold-cdn.xitu.io/2020/3/1/17095c8f546903ec?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1'
  },
  {
    id: '111111',
    name: 'Grace',
    avatar: 'https://user-gold-cdn.xitu.io/2020/4/9/1715e358ab6e7e69?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1'
  },
  {
    id: '222222',
    name: 'Hen',
    avatar: 'https://user-gold-cdn.xitu.io/2019/12/6/16edaea21d757fe1?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1'
  }
]