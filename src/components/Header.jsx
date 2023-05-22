import React from 'react';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';

function Header() {
  const { email, name } = useSelector((state) => state.login);

  const hash = md5(email).toString();
  const gravatarImg = `https://www.gravatar.com/avatar/${hash}`;

  return (
    <div>

      <img src={ gravatarImg } alt="deu ruim" data-testid="header-profile-picture" />
      <span data-testid="header-player-name">
        {name}
      </span>
      <span data-testid="header-player-email">
        {email}
      </span>
      <span data-testid="header-score">0</span>
    </div>
  );
}

export default Header;
