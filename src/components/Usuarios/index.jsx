import { useEffect, useState } from "react";
import FetchData from "../FetchData";
import "./usuarios.css";
import "../../styles.css";

export default function Usuarios({ onGetUserId, onCloseUser, changeGrid }) {
  const [clickCloseUser, setCliqueCloseUser] = useState(true);
  const [userId, setUserId] = useState("");

  const handleClickUser = (userId) => {
    setCliqueCloseUser(false);
    setUserId(userId);
    onGetUserId(userId);
  };

  useEffect(() => {
    onCloseUser(clickCloseUser);
  }, [clickCloseUser]);

  const clickFollow = (button) => {
    if (button.innerHTML.includes("+")) {
      button.innerHTML = "✓ Following";
      button.style.backgroundColor = "var(--followingBtn-bg)";
      button.style.color = "var(--followingBtn-color)";
    } else {
      button.innerHTML = "+ Follow";
      button.style.backgroundColor = "var(--followBtn-bg)";
      button.style.color = "#ffffff";
    }
  };

  return (
    <>
      {!clickCloseUser && (
        <div className="containerUsuario">
          <div className="bannerUser"></div>
          <div className="buttons">
            <button className="follow" onClick={(e) => clickFollow(e.target)}>
              + Follow
            </button>
            <button className="more">
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
          <FetchData urlPoint={`users/${userId}`} />
          {/* essa div barreira impede do evento de clique do usuário acontecer pq ela fica como uma parede invisível na frente, assim mesmo que clique em cima do usuário, somente o evento de clique de fechar o usuário que funciona */}
          <div className="barreira"></div>
          <span
            onClick={() => {
              setCliqueCloseUser(true);
              document.querySelector("header i:last-of-type").style.display =
                "inline-block";
            }}
          >
            X
          </span>
        </div>
      )}

      {clickCloseUser && (
        <div
          className="containerUsuarios"
          style={{
            gridTemplateColumns:
              changeGrid === "bi bi-list" ? "repeat(2, 1fr)" : "1fr",
          }}
        >
          <FetchData urlPoint={"users"} onClickUser={handleClickUser} />
        </div>
      )}
    </>
  );
}
