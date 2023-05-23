import React from 'react';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';

function Header() {
  const { email, name } = useSelector((state) => state.login);

  const hash = md5(email).toString();
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
          className="header-img"
          src={ gravatarImg }
          alt="deu ruim"
          data-testid="header-profile-picture"
        />
        <div>
          <span className="header-email" data-testid="header-player-email">
            {email}
          </span>
        </div>
      </div>
      <div>
        <span className="header-score" data-testid="header-score">0</span>
      </div>
    </div>
  );
}

export default Header;
