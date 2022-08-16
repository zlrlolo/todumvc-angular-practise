import {Component} from '@angular/core';
import {combineLatest} from "rxjs";

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
  },{
    id: 2,
    title: '唱歌',
    done: false
  },{
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
  public todos: Todo[] = todos


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

  get toggleAll() {
    return this.todos.every(t => t.done)
    // 当调用toggleAll时，回以每一个dodos.done是否为真（还未完全理解）
  }

  set toggleAll(val) {
    this.todos.forEach(t => t.done = val)
  }

  removerTodo(i: number) {
    this.todos.splice(i,1)
  }
}
