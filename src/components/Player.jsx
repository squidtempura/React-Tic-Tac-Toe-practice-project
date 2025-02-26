import { useState } from "react";
export default function Player({initialName, symbol,isActive})
{
    const [playerName,setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    function changePlayerName(event)
    {
        setPlayerName(event.target.value);
    }
    function handleEdit()
    {
        setIsEditing((isEditing)=>!isEditing);
    }
    let editablePlayerName = <span className="player-name">{playerName}</span>
    if(isEditing)
    {
        editablePlayerName = <input type = 'text' required value ={playerName} onChange={changePlayerName}/>
    }
    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'save' : 'edit'}</button>
          </li>
    );
}