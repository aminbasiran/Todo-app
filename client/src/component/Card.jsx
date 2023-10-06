import "./card.scss"
import axios from 'axios';

function Card({task,handleDelete}) {

const Delete = (id)=>{
    handleDelete(id)
}

const Edit = (id) =>{
    handleEdit(id)
}

    return ( 

        <>
            <div className="card">
                <div className="card__title">{task.title}</div>
                <div className="card__edit" onClick={()=>Edit(task._id)} ></div>
                <div className="card__delete" onClick={()=>Delete(task._id)}></div>
            </div>
        
        </>
    );
}

export default Card;