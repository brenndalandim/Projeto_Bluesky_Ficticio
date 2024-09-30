import { useState, useEffect } from "react";
import FetchData from "../FetchData";
import "./posts.css";
import "../../styles.css";

export default function Posts({
  userId,
  clickCloseUser,
  clickPost,
  getClickClosePost,
}) {
  //captações de estados de click e handle para abrir um post
  const [clickedPostId, setClickedPostId] = useState("");

  const handlePostClick = (postId) => {
    clickPost(postId);
    setClickedPostId(postId);
    setClickClosePost(false);
  };

  //captações de estados de click e handle para fechar um post
  const [clickClosePost, setClickClosePost] = useState(true);

  const handleClickClosePost = () => {
    setClickClosePost(true);
    document.querySelector('.containerUsuario').style.display = 'block'
  };

  useEffect(() => {
    getClickClosePost(clickClosePost);
  }, [clickClosePost]);

  //efeito para sempre que fechar um usuário e voltar pra tela inicial fazer um reset dos clicks dos posts
  useEffect(() => {
    setClickClosePost(true);
  }, [clickCloseUser]);

  return (
    <>
      {!clickCloseUser && clickClosePost && (
        <div className="containerPostsComments">
          <FetchData
            urlPoint={`posts/?userId=${userId}`}
            onClickPost={handlePostClick}
          />
        </div>
      )}
      {!clickCloseUser && !clickClosePost && (
        <div className="containerPost">
          <FetchData urlPoint={`posts/${clickedPostId}`} />
          {/* essa div barreira impede do evento de clique do usuário acontecer pq ela fica como uma parede invisível na frente, assim mesmo que clique em cima do usuário, somente o evento de clique de fechar o usuário que funciona */}
          <div className="barreira"></div>
          <span className="btnGoBack">
            <i
              className="bi bi-chevron-left"
              onClick={() => handleClickClosePost()}
            ></i>
            <span className="title">Post</span>
          </span>
        </div>
      )}
    </>
  );
}
