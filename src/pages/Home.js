import React, {useState} from 'react';
import{v4 as uuidv4} from 'uuid';

const Home = () => {
  const[roomId, setRoomId]=useState('');
  const[username, setUserName]=useState('');
  const createNewRoom = (e) =>{
    e.preventDefault();
    const id= uuidv4();
    setRoomId(id);
  
  }
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img className="homePageLogo" src="/codeCollab-img.png" alt="code-collab-img" />
        <h4 className='mainLabel'>Paste codeCollab ID</h4>
        <div className='inputGroup'>
          <input type='text' className='inputBox' placeholder='codeCollab ID' onChange={(e)=>setRoomId(e.target.value)} value={roomId}></input>

          <input type='text' className='inputBox' placeholder='username' onChange={(e)=> setUserName(e.target.value)} value={username}></input> 
          <button className='btn joinBtn'>Join</button>
          <span className='createInfo'>
            Don't have a codeCollab ID? &nbsp;
            <a onClick={createNewRoom} href='' className='createNewBtn'>
              create one
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Built by {''}<a href='https://github.com/anirudhkini'>anirudh</a></h4>
      </footer>

    </div>
  )
}

export default Home;