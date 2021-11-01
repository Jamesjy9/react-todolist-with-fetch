import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";




const Input = () =>{

 

    const [text, setText] = useState([]);
    const [counter, setCounter] = useState(0);

      const addText= (e) =>{
        if (e.keyCode === 13 && e.target.value.trim()!== ""){
            setCounter(text.length+1)
            setText([...text, { done: false, label: e.target.value}]);
           e.target.value = ""
        }
    
    }


    const Delete = (indexItem) => {
        setText((prevState) =>
          prevState.filter((todo, index) => index !== indexItem)
          
        );
        setCounter(text.length);
      };

      useEffect(() => {
        if (text.length >= 0) {
            updateText(text);
            setCounter(text.length)
        }
    }, [text]) 

    useEffect(() => {
        obtainText();
        setCounter(text.length)
    }, []) 

    const obtainText = async (text) => {
        try {
            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/jamesjy9');
            const data = await response.json();
            setText(data);

        }
        catch (error) {
            console.log(error);
        }

    }

    const updateText = (text) => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/Jamesjy9', {
            method: 'PUT',
            body: JSON.stringify(text),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => {
                response.json()
            })
            .then((data) => {
            })
            .catch((error) => {
                console.log(error)
            })
    }




    return (

<>
<div className="container">
<h1> todos </h1>


<input className="input" type= "text" placeholder= "What needs to be done?" id="input"  onKeyDown={addText}/>



<ul>
{
    text.map((valor, index) =>{
return (<>
<div className="row ">
        <li className="list" key={index}>{valor.label} <strong className="Delete" onClick={()=>Delete (index)}>X</strong>  </li>

</div>

    </>
    )
   
     })


}

<div className="row">
<span className="span2">{counter} Item left</span>
<span className="span3"></span>
<span className="span3"></span>
</div>


</ul>



</div>
</>
    )
}



export default Input;