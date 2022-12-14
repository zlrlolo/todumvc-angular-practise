import {Component, OnInit} from '@angular/core';

// 接口约束这一类型为Todo
interface Todo {
  id: number,
  title: string,
  done: boolean
}

// 生成一个空数组，内部元素类型为Todo。
const todos: Todo[] = [
  {
    id: 1,
    title: '吃饭',
    done: true
  }, {
    id: 2,
    title: '唱歌',
    done: false
  }, {
    id: 3,
    title: '睡觉',
    done: true
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // 将组员todos等于todos这个空数组，该组员类型为Todo数组
  public todos: Todo[] = JSON.parse(window.localStorage.getItem('todos') || '[]')

  public currentEditing?: Todo = undefined
  // 用于存放写作状态，默认没有值
  public visibility: string = 'all'

// vi..用于存放选中标签的名字，默认为all
  get toggleAll() {
    return this.todos.every(t => t.done)
    // 当调用toggleAll时，回以每一个dodos.done是否为真（还未完全理解）
  }

  set toggleAll(val) {
    this.todos.forEach(t => t.done = val)
  }

  get remaningCount() {
    return this.todos.filter(t => !t.done).length
  }

// 过滤todos
  get filterTodos() {
    if (this.visibility === 'all') {
      return this.todos
    } else if (this.visibility === 'active') {
      return this.todos.filter(t => !t.done)
    } else if (this.visibility === 'completed') {
      return this.todos.filter(t => t.done)
    } else {
      return this.todos
    }
  }

// 用一个叫当前编辑的变量记录写作状态，有值就是在写，没有值就是不在
  addTodo(e: any) {
    const titleText = (<HTMLInputElement>e.target).value
    if (!titleText.length) {
      return
    }
    const last = this.todos[this.todos.length - 1]
    this.todos.push({
      id: last ? last.id + 1 : 1,
      title: titleText,
      done: false
    })
    e.target.value = ''
  }

  removerTodo(i: number) {
    console.log(2)
    this.todos.splice(i, 1)
  }

  saveEdit(todo: Todo, e: any) {
    this.currentEditing = undefined
    todo.title = e.target.value
// 保存数据
  }

  handleEditKeyUp(e: any) {
    const {keyCode, target} = e
    if (keyCode === 27) {
      // 取消编辑 keycode为27
      target.value = this.currentEditing?.title
      this.currentEditing = undefined
    }
  }

  clearAllDone() {
    this.todos = this.todos.filter(t => !t.done)
  }

// 当窗口的标签页改变时，根据hash的值（利用oninit钩子）重新初始化属性
  ngOnInit() {
    this.hashchangeHandler()
    window.onhashchange = () => this.hashchangeHandler()
  }

  hashchangeHandler() {
    const hash = window.location.hash.slice(1)
    switch (hash) {
      case'/':
        this.visibility = 'all'
        break;
      case'/active':
        this.visibility = 'active'
        break;
      case'/completed':
        this.visibility = 'completed'
        break;
    }
  }

  ngDoCheck() {
    window.localStorage.setItem('todos', JSON.stringify(this.todos))
  }
}
