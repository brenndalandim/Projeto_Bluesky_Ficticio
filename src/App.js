// import FetchData from "./components/FetchData";
import { useState } from 'react'
import Usuarios from "./components/Usuarios";
import Posts from "./components/Posts";
import Comments from "./components/Comments";

import "./styles.css";

export default function App() {

  //pega o id do usuário clicado e o estado do clique de fechar o usuário
  const [userId, setUserId] = useState('')
  const [clickCloseUser, setClickCloseUser] = useState(true)

  const handleGetUserId = (user) => {
    setUserId(user)
  }

  const handleClickCloseUser = (clique) => {
    setClickCloseUser(clique)
  }

  //pega o id do post clicado e o estado do clique de fechar o post
  const [postId, setPostId] = useState('')
  const [clickClosePost, setClickClosePost] = useState(false)

  const handleGetPostId = (post) => {
    setPostId(post)
  }

  const handleClosePost = (clique) => {
    setClickClosePost(clique)
  }

  //trocar o icone de grade e lista dos usuários
  const [changeGrid, setChangeGrid] = useState("bi bi-list")

  const handleChangeGrid = (span) => {
    if(span === "bi bi-list"){
        setChangeGrid("bi bi-grid")
    } else {
      setChangeGrid("bi bi-list")
    }
  }

  const handleChangeColorScheme = (icone) => {
    if(icone.className.includes('sun')){
      icone.className = 'bi bi-moon-fill'
      document.querySelector('html').classList.add('light-mode')
    } else {
      icone.className = 'bi bi-sun-fill'
      document.querySelector('html').classList.remove('light-mode')
    }
  }

  return (
    <div className="App">

      <header>
        <i className="bi bi-sun-fill" onClick={(e) => handleChangeColorScheme(e.target)}></i>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bluesky_Logo.svg/2319px-Bluesky_Logo.svg.png" alt="logo bluesky" />
        <i className={changeGrid} onClick={(e) => handleChangeGrid(e.target.className)}></i>
      </header>

      <main>
        <Usuarios onGetUserId={handleGetUserId} onCloseUser={handleClickCloseUser} changeGrid={changeGrid}/>

        <Posts userId={userId} clickCloseUser={clickCloseUser} clickPost={handleGetPostId} getClickClosePost={handleClosePost}/>

        <Comments postId={postId} clickCloseUser={clickCloseUser} clickClosePost={clickClosePost}/>
      </main>

      <footer>&copy; Brennda Landim - Assessment</footer>
    </div>
  );
}
