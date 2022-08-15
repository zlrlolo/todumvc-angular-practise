import {Component} from '@angular/core';

interface Todo {
  id: number,
  title: string,
  done: boolean
}

const todos: Todo[] = [
//   {
//     id: 1,
//     title: '吃饭',
//     done: true
//   },{
//     id: 2,
//     title: '唱歌',
//     done: true
//   },{
//   id: 3,
//     title: '睡觉',
//     done: false
// }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public todos: Todo[] = todos
}
