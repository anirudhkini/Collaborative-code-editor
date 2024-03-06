import React from 'react';

const Home = () => {
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src="/codeCollab-img.png" alt="code-collab-img" />
        <h4 className='mainLabel'>Paste codeCollab ID</h4>
        <div className='inputGroup'>
          <input type='text' className='inputBox' placeholder='codeCollab ID'></input>
          <input type='text' className='inputBox' placeholder='username'></input>
          <button className='btn joinBtn'>Join</button>
          <span className='createInfo'>
            Don't have a codeCollab ID? &nbsp;
            <a href='' className='createNewBtn'>
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