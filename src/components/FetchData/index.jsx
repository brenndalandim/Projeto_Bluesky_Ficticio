import { useEffect, useState } from "react";
import "./styles.css";

export default function FetchData({ urlPoint, onClickUser, onClickPost }) {
  const [data, setData] = useState([]);
  const [fetchType, setFetchType] = useState("");

  const fetchData = async () => {
    setLoading(true);
    await fetch(`https://jsonplaceholder.typicode.com/${urlPoint}`)
      .then((response) => response.json())
      .then((json) => {
        json.length > 0 ? setData(json) : setData([json]);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      })
      .catch((erro) => console.log(`erro: ${erro}`));
  };

  useEffect(() => {
    fetchData();
    if (urlPoint.includes("users")) {
      setFetchType("users");
    }

    if (urlPoint.includes("posts")) {
      setFetchType("posts");
    }

    if (urlPoint.includes("comments")) {
      setFetchType("comments");
    }
  }, [urlPoint]);

  const formataNome = (nomeCompleto) => {
    let listaNome = nomeCompleto.split(" ");
    let nome = capitalizeString(listaNome[0]);
    let sobrenome = capitalizeString(listaNome[listaNome.length - 1]);

    return `${nome} ${sobrenome}`;
  };

  const capitalizeString = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const mailToUser = (email) => {
    let arroba = email.indexOf("@");
    let user = email.slice(0, arroba).toLowerCase();

    return `@${user}`;
  };

  const maxComment = (comment) => {
    if (comment.length > 140) {
      return `${comment.slice(0, 140)}...`;
    } else {
      return comment;
    }
  };

  const [loading, setLoading] = useState(true);

  const deleteComment = (event) => {
    event.target.parentElement.parentElement.style.transform = "scale(0.1)";

    let pCountComment = document.querySelector(".commentCount");
    let countDelete = pCountComment.innerHTML - 1;
    setTimeout(() => {
      event.target.parentElement.parentElement.style.display = "none";
      countDelete <= 0
        ? (pCountComment.innerHTML = "")
        : (pCountComment.innerHTML = countDelete);
    }, 800);
  };

  const handleLike = (elemento) => {
    if (elemento.className === "bi bi-heart") {
      elemento.className = "bi bi-heart-fill";
      elemento.classList.toggle("open");
      elemento.nextSibling.style.fontSize = ".8rem";
      elemento.nextSibling.style.color = "#EC4899";
    } else {
      elemento.classList.toggle("open");
      elemento.className = "bi bi-heart";
      elemento.nextSibling.style.fontSize = 0;
    }
  };

  const handleRT = (elemento) => {
    if (!elemento.classList.contains("open")) {
      elemento.classList.toggle("open");
      elemento.nextSibling.style.fontSize = ".8rem";
      elemento.nextSibling.style.color = "#5CEFAA";
    } else {
      elemento.classList.toggle("open");
      elemento.nextSibling.style.fontSize = 0;
    }
  };

  const handleClickPost = (id) => {
    onClickPost(id)
    document.querySelector('.containerUsuario').style.display = 'none'
  }

  return (
    <>
      {loading && (
        <div className="containerLoading">
          <img
            src="https://lh5.googleusercontent.com/proxy/OUqG0HgVNVMNorlPCmI4VgJa-3h7uHLkkMy9vdJ0eRsQlvJBytFUS-HvuW-O9EJd-c9xB7KAqlwby4Fzp59g1705FzBuP-F8dC1ZaBQtmLeCu5i6FfSd6Mmzh8mjOwgrEYZwy5UStg"
            alt="loading gif"
            className="loading"
          />
        </div>
      )}
      {fetchType === "users" &&
        data.map((user) => (
          <div
            key={user.id}
            className="user caixa"
            onClick={(e) => {
              onClickUser(user.id);
              document.querySelector("header i:last-of-type").style.display = "none";
            }}
          >
            <img
              className="profilePicture"
              src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
              alt="profile picture"
            ></img>
            <p className="name">{user.name}</p>
            <p className="username">@{user.username}</p>
            <p className="catchPhrase">{user.company.catchPhrase}</p>
          </div>
        ))}
      {fetchType === "posts" &&
        data.map((post) => (
          <div
            key={post.id}
            className="post caixaPostComment"
            onClick={(e) =>
              !e.target.classList.contains("interacoes") &&
              !e.target.classList.contains("bi")
                ? handleClickPost(post.id)
                : e.target.classList.contains("bi-chat-left") &&
                  e.target.parentElement.parentElement.parentElement.parentElement.classList.contains(
                    "containerPostsComments"
                  )
                ? handleClickPost(post.id)
                : ""
            }
          >
            <h4 className="title">{post.title}</h4>
            <p className="body">{post.body}</p>
            <div className="interacoes interacoesPosts">
              <div className="bi containerInteracao">
                <i className="bi bi-chat-left"></i>
                <p className="bi commentCount">5</p>
              </div>
              <div className="bi containerInteracao">
                <i
                  className="bi bi-arrow-left-right"
                  onClick={(e) => handleRT(e.target)}
                ></i>
                <p className="bi interacaoCount">1</p>
              </div>
              <div className="bi containerInteracao">
                <i
                  className="bi bi-heart"
                  onClick={(e) => handleLike(e.target)}
                ></i>
                <p className="bi interacaoCount">1</p>
              </div>
              <i className="bi bi-share"></i>
            </div>
          </div>
        ))}
      {!loading &&
        fetchType === "comments" &&
        data.map((comment) => (
          <div key={comment.id} className="comment caixaPostComment">
            <div className="containerName">
              <p className="name">{formataNome(comment.name)}</p>
              <p className="username">{mailToUser(comment.email)}</p>
            </div>
            <p className="body">{maxComment(comment.body)}</p>
            <div className="interacoes">
              <i className="bi bi-chat-left"></i>
              <div className="bi containerInteracao">
                <i
                  className="bi bi-arrow-left-right"
                  onClick={(e) => handleRT(e.target)}
                ></i>
                <p className="bi interacaoCount">1</p>
              </div>
              <div className="bi containerInteracao">
                <i
                  className="bi bi-heart"
                  onClick={(e) => handleLike(e.target)}
                ></i>
                <p className="bi interacaoCount">1</p>
              </div>
              <i className="bi bi-share"></i>
              <i
                className="bi bi-trash"
                onClick={(e) =>
                  confirm("Deseja mesmo excluir esse comentário?") === true
                    ? deleteComment(e)
                    : ""
                }
              ></i>
            </div>
          </div>
        ))}
    </>
  );
}
