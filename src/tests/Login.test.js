import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando a página de Login', () => {
  it('Verifica se a página inicia no endpoint correto', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<App />);
    
    expect(pathname).toBe('/');
  });

  it('Verifica se todos os elementos estão sendo renderizados na tela corretamente', () => {
    renderWithRouterAndRedux(<App />);

    screen.getByTestId('input-player-name');
    screen.getByTestId('input-gravatar-email');
    screen.getByTestId('btn-play');
    screen.getByTestId('btn-settings');
    screen.getByRole('button', { name: /play/i });
  });

  it('Verifica se o botão de configuração leva para o endpoint correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingBtn = screen.getByTestId('btn-settings');
    userEvent.click(settingBtn);

    const pathname = history.location.pathname;

    expect(pathname).toBe('/settings');
  });

  it('Verifica o comportamento do botão Play, e se leva para o endpoint correto', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nicknameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');

    expect(playBtn).toBeDisabled();
    userEvent.type(emailInput, 'teste@teste.com');
    expect(playBtn).toBeDisabled();
    userEvent.type(nicknameInput, 'teste');
    expect(playBtn).not.toBeDisabled();

    userEvent.click(playBtn);
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    });
  });

  it('Verifica se ao logar é feita uma chamada à API para guardar o token no localStorage', () => {
    const tokenObj = {
      response_code: 0,
      response_message: "Token Generated Successfully!",
      token: "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(tokenObj),
    }));

    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nicknameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(nicknameInput, 'teste');
    userEvent.click(playBtn);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});