import React from 'react'
import {
  Input,
  Select,
  DatePicker
} from 'antd'
import { Moment } from 'moment'
import { userList } from './utils/data'
const { Option } = Select

enum UserId {
  Horace = '123456',
  Grace = '111111',
  Hen = '222222'
}

export interface TodoValue {
  content?: string,
  user?: UserId,
  date?: string
}

interface TodoInputProps {
  value?: TodoValue;
  onChange?: (value: TodoValue) => void;
}

interface TodoInputState {
  content: string,
  user: UserId,
  date: string
}

// const TodoInput = ({ value = {}, onChange }: TodoInputProps) => {
//   const [content, setContent] = useState('')
//   const [user, setUser] = useState(UserId.Horace)
//   const [date, setDate] = useState('')

//   const onChangeContent = (e: any) => {
//     if (!("content" in value)) {
//       setContent(e.target.value)
//     }
//   }

//   const triggerChange = (changedValue: TodoValue) => {
//     if (onChange) {
//       onChange({ content, user, date, ...value, ...changedValue });
//     }
//   }

//   const onUserChange = (selectValue: UserId) => {
//     if (!("user" in value)) {
//       setUser(selectValue);
//     }

//     triggerChange({ user: selectValue });
//   }

//   const onDateOk = (date: Moment) => {
//     if (!("date" in value)) {
//       setDate(date.format("YYYY-MM-DD HH:mm"));
//     }

//     triggerChange({ date: date.format("YYYY-MM-DD HH:mm") });
//   }

//   return (
//     <div className="todoInput">
//       <Input 
//         type="text" 
//         placeholder="请输入待办事项"
//         value={value.content || content}
//         onChange={onChangeContent}></Input>
//       <Select 
//         style={{ width: 80 }} 
//         size="small" 
//         defaultValue={UserId.Horace}
//         value={user}
//         onChange={onUserChange}>
//         {
//           userList.map(user => (
//             <Option value={user.id}>{user.name}</Option>
//           ))
//         }
//       </Select>
//       <DatePicker
//         showTime
//         size="small"
//         style={{ marginLeft: "16px", marginRight: "16px" }}
//         onOk={onDateOk}
//       >
//       </DatePicker>
//     </div>
//   )
// }

class TodoInput extends React.Component<TodoInputProps, TodoInputState> {
  state = {
    content: "",
    user: UserId.Horace,
    date: ""
  }

  private triggerChange = (changedValue: TodoValue) => {
    const { content, user, date } = this.state
    const { value, onChange } = this.props

    if (onChange) {
      onChange({ content, user, date, ...value, ...changedValue });
    }
  }
  private onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value = {} } = this.props
  
    if (!("content" in value!)) {
      console.log("hello")
      this.setState({
        content: e.target.value
      })
    }

    // triggerChange({ content: e.target.value })
    this.triggerChange({ content: e.target.value })
  }

  private onUserChange = (selectValue: UserId) => {
    const { value = {} } = this.props
  
    if (!("user" in value!)) {
      this.setState({
        user: selectValue
      })
    }

    // triggerChange({ user: selectValue });
    this.triggerChange({ user: selectValue })
  }

  private onDateOk = (date: Moment) => {
    const { value = {} } = this.props
    if (!("date" in value!)) {
      this.setState({
        date: date.format("YYYY-MM-DD HH:mm")
      })
    }

    // triggerChange({ date: date.format("YYYY-MM-DD HH:mm") });
    this.triggerChange({ date: date.format("YYYY-MM-DD HH:mm") });
  }

  public render() {
    const { value } = this.props;
    const { content, user } = this.state;
    return (
      <div className="todoInput">
        <Input
          type="text"
          placeholder="请输入待办事项"
          value={value?.content || content}
          onChange={this.onContentChange}
        />
        <Select
          style={{ width: 80 }}
          size="small"
          defaultValue={UserId.Horace}
          value={value?.user || user}
          onChange={this.onUserChange}
        >
          {userList.map(user => (
            <Option value={user.id}>{user.name}</Option>
          ))}
        </Select>
        <DatePicker
          showTime
          size="small"
          onOk={this.onDateOk}
          style={{ marginLeft: "16px", marginRight: "16px" }}
        />
      </div>
    )
  }
}

export default TodoInput;
