import React, {useState} from 'react';
import{v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate= useNavigate();
  const[roomId, setRoomId]=useState('');
  const[username, setUserName]=useState('');
  const createNewRoom = (e) =>{
    e.preventDefault();
    const id= uuidv4();
    setRoomId(id);
    toast.success('New room is now online!');
  }

  const joinRoom = () =>{
    if(!roomId){
      toast.error('Please enter codeCollab ID')
      return;
    }
    if(!username){
      toast.error('Please enter a username')
      return;
    }

    //Redirect
    navigate(`/editor/${roomId}`, {
      state:{
        username,
      },
    });
  };

  const handleInputEnter = (e) =>{
    console.log('event', e.code);
    if (e.code=='Enter'){
      joinRoom();
    }
  }
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img className="homePageLogo" src="/codeCollab-img.png" alt="code-collab-img" />
        <h4 className='mainLabel'>Paste codeCollab ID</h4>
        <div className='inputGroup'>
          <input type='text' className='inputBox' placeholder='codeCollab ID' onChange={(e)=>setRoomId(e.target.value)} value={roomId} onKeyUp={handleInputEnter}></input>

          <input type='text' className='inputBox' placeholder='username' onChange={(e)=> setUserName(e.target.value)} value={username} onKeyUp={handleInputEnter}></input> 
          <button className='btn joinBtn' onClick={joinRoom}>Join</button>
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