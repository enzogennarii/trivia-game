import React from 'react';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';

function Header() {
  const { score, gravatarEmail, name } = useSelector((state) => state.player);
  const hash = md5(gravatarEmail).toString();
  const gravatarImg = `https://www.gravatar.com/avatar/${hash}`;

  return (
    <div className="header-container">
      <div className="header">
        <div>
          <span className="header-name" data-testid="header-player-name">
            {name}
          </span>
        </div>
        <img
          src={ gravatarImg }
          alt="Player Avatar"
          className="header-img"
          data-testid="header-profile-picture"
        />
      </div>
      <h1>Trívia Game</h1>
      <div>
        <span className="header-score" data-testid="header-score">{ score }</span>
      </div>
    </div>
  );
}

export default Header;
