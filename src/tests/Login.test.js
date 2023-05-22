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
});