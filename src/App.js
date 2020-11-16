import React from "react"
import "./css/App.scss"
import Navigation from "./components/Navigation"
import ToDosContainer from "./components/ToDosContainer"
import ToDonesContainer from "./components/ToDonesContainer"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import About from "./components/About"
import Notfound from "./components/Notfound"

//User interface (UI) unit (Component)

console.log(localStorage);

// let data = {
//   name: "Ali",
//   age: 23,
// }


//  localStorage.setItem("to-do-app",JSON.stringify(data))

//  console.log(JSON.parse(localStorage.getItem("to-do-app")).name); 
//  localStorage.removeItem("to-do-app") 

class App extends React.Component {
  state={
    todoItems:[
      
    ],
  }

  componentDidMount(){
    // onload
    let data= localStorage.getItem("todoapp")
    if(data){
      let convertedData= JSON.parse(data)
      this.setState({
        todoItems:convertedData
      })
    }
   
  }
  addItem=(value)=>{
    console.log(this, "this is from App")
      let item = { id:this.state.todoItems.length, text:value, done:false }
      let copystate = [...this.state.todoItems]
      copystate.push(item)
      this.setState({
        todoItems:copystate
      },()=>{
        localStorage.setItem("todoapp",JSON.stringify(this.state.todoItems))

      })
     /*  this.setState({
        todoItems:[...this.state.todoItems, item]
      }) */
  }

  updateItem=(id)=>{
    let updatedItems = this.state.todoItems.map(item=>{
        if(item.id === id){
          item.done = !item.done
          return item
        }else{
          return item
        }
    })

    this.setState({
      todoItems:updatedItems
    }, ()=>{
      localStorage.setItem("todoapp",JSON.stringify(this.state.todoItems))

    })
}

deleteItem=(id)=>{
  /*  let CopyState=[...this.state.todoItems] */
   let updatedData = this.state.todoItems.filter(item=>item.id!==id)
   this.setState({
     todoItems:updatedData
   },()=>{
     localStorage.setItem("todoapp", JSON.stringify(this.state.todoItems));
   })
}

  render(){

    let toDos=this.state.todoItems.filter(item=>!item.done) 
    let toDones= this.state.todoItems.filter(item=>item.done)
     return (
       <BrowserRouter>
    <div className="app">
      <Navigation/>
<Switch>
      <Route exact path="/">
      <ToDosContainer toDos={toDos} addItem={this.addItem} updateItem={this.updateItem} deletItem={this.deletItem}  />
      <ToDonesContainer toDones={toDones} updateItem={this.updateItem} deletItem={this.deletItem} />
    </Route>
    <Route path='/about' component={About}/>
    <Route component={Notfound}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
  }
}

export default App;


