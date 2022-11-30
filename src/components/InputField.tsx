import React, { useRef } from "react";//useRef hook is similar to document.getElementById or class name i.e. to target that html element
import "./styles.css";

// Used bem convention for writing classes

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;//this function type can be copied from when we go to App.tsx file and hover over it
  handleAdd: (e: React.FormEvent) => void;
}//This interface gives type to our props being accepted below instead of writing React.FC = ({ todo, setTodo, handleAdd }:{string, React.Dispatch<React.SetStateAction<string>>, (e: React.FormEvent) => void}). we can write it as ({ todo, setTodo, handleAdd }:props) or as we have defined below

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);//we will use this so that we can remove the backgound shadow state whwn we focus on input after writing something and then press enter or Go button.WE can Get The Type By Hovering on input element below

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();//It will remove that shadow. ? means optional i.e we are not sure if it will be null or have some value in it. So giving type allows us to use these blur() effects on our input element
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  );
};

export default InputField;