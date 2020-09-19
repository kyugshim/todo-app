import React, { Component } from 'react';

import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


class App extends Component {
  constructor() {
    super();
    this.state = {
      message: 'got it?',
      newTodo: '',
      todos: [{
        title: 'Learn React',
        done: false
      }, {
        title: 'Learn JSX',
        done: false
      }]
    };

  }


  newTodoChanged(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  formSubmitted(event) {
    event.preventDefault();
    // console.log(this.state.newTodo);
    this.setState({
      newTodo: '',
      todos: [...this.state.todos, {
        title: this.state.newTodo,
        done: false
      }]
    });
  }

  // 위에 코드와 같은 결과 하지만 다른 방식(위의 코드가 더 깔끔)
  // formSubmitted(event) {
  //   event.preventDefault();
  //   const todos = this.state.todos.slice();
  //   todos.push({
  //     title: this.state.newTodo,
  //     done: false
  //   })
  //   this.setState({
  //     todos
  //   });
  // }

  toggleTodoDone(event, index) {
    console.log(event.target.checked);
    const todos = [...this.state.todos]; // copy the array
    todos[index] = { ...todos[index] }; // copy the todo
    todos[index].done = event.target.checked; // update done property on copied todo 
    console.log(todos);

    this.setState({
      todos
    });
  }

  removeTodo(index) {
    const todos = [...this.state.todos]; // copy the array
    todos.splice(index, 1);
    this.setState({
      todos
    });

  }

  allDone() {
    const todos = this.state.todos.map(todo => {
      return {
        title: todo.title,
        done: true
      };
    });

    this.setState({
      todos
    });
  }


  render() {
    return (
      <div className="App">
        <h3>{this.state.message}</h3>
        <form onSubmit={this.formSubmitted.bind(this)}>
          <label htmlFor="newTodo">New Todo</label>
          <input onChange={(event) => this.newTodoChanged(event)} id="newTodo" name="newTodo" value={this.state.newTodo} />
          <button type="submit">Add Todo</button>
        </form>
        <button onClick={() => this.allDone()}>All Done</button>
        <ul>
          {this.state.todos.map((todo, index) => {
            return (<li key={todo.title}>
              <input onChange={(event) => this.toggleTodoDone(event, index)} type="checkbox" checked={todo.done} />
              {/* <span style={{
                textDecoration: todo.done ? 'line-through' : 'inherit'
              }}>{todo.title}</span> */}
              <span className={todo.done ? 'done' : ''}>{todo.title}</span>
              <button onClick={() => this.removeTodo(index)}>Remove</button>
            </li>)
          })}
        </ul>
      </div>
    );
  }
}

export default App;