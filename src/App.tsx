// function App() {
/*
  let name: string; //any type means name has no type restriction but not recommended
  // let name: any;//any type means name has no type restriction but not recommended
  // let personName:unknown;//recoomended over any but still please give secific type
  let age: number | string; //here `|` UNION allows this age variable to assign number or string
  let isStudent: boolean;
  let hobbies: string[]; //it means it eill accept only array with strings
  let role: [number, string]; //it means it will accept only an array with first member number and second number string

  // Declare Type to a function there are two ways 
  // function printName(name:string){
  //   console.log(name);
  // }

  // printName("Devrath");

  // let printName: Function;//Not recommended

  //We can properly define a function like how many things it's going to contain

  // let printName: (name: string) => void;// it will take a name of type string and it will return void. THIS IS HOW WE ASSIGN TYPE TO A FUNCTION

  // let printName: (name: string) => never;// it will return nothing but void will return undefined

  //  Two ways to define an object either give it type Object as above which is incorrect as object can have multiple types of data memembers so what we can do is define a type or interface of that object. HERE type or interface is basically ALIAS

  //let person: Object; //incorrect way

  //Correct way. It is a good practice to keep first letter of type or interface capital

  type Person = {
    name: string;
    age?: number;
  };

  
  
  type Person = {
    name: string;
    age: number;
  };

  This will give error as it requires both name and age
  let person:Person = {
    name:"Heyma"
  };

  so we can make age optional

   type Person = {
    name: string;
    age?: number;
  };

  

  let person: Person = {
    name: "Devstar",
  }; //This object will contain alll the properties inside of this person type

  let lotsOfPeople: Person[]; //array of Person Object

  

  // Interface vs Type

  interface Guys {
    name: string;
    age?: number;
  }

  interface Guy extends Guys {
    profession: string;
  }//Guy also contains all properties of Guys

  // type Y = Guys & {
  //   c: string;
  //   d: number;
  // }; this also works 

  type X = {
    a: string;
    b: number;
  };

  // interface Guy extends X {
  //   profession: string;
  // } This also works

  //   type Y = {
  // c:string;
  // d:number;
  //   }

  //If we want property of X in Y

  type Y = X & {
    c: string;
    d: number;
  };

  // let y: Y = {
  //   c:'efdas',
  //   d:43,
  // } this will give error as X properties are missing so types can be extended like this.
*/

import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./models/models";

//This React.FC means that type of this function is Functional Component and it return JSX. React.ReactNode supports all the types

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");//we give this the type string as our todo state will be of type string we can give it multiple types using UNION `|` as done above
  const [todos, setTodos] = useState<Array<Todo>>([]);//This means that it will be an array of Todo Object It can also be written as useState<Todo[]>([])
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
