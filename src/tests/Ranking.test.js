import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Ranking from '../pages/Ranking';

describe('Testando a página de Ranking', () => {
    it('Verifica se a página ranking é renderizada no endpoint correto', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        localStorage.setItem('ranking', '[{"name":"hehe","score":0,"picture":"f"}]');
        act(() => {
            history.push('/ranking')
        })

        expect(history.location.pathname).toBe('/ranking');
    });

    it('Verifica se todos os elementos estão sendo renderizados na tela corretamente', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        localStorage.setItem('ranking', '[{"name":"job","score":48,"picture":"f"}]');
        act(() => {
            history.push('/ranking')
        })

        const name = screen.getByTestId('player-name-0');
        const score = screen.getByTestId('player-score-0');
        const img = screen.getByAltText('Avatar do jogador')
        expect(name.innerHTML).toEqual('job');
        expect(score.innerHTML).toEqual('48');
        expect(img.src).toEqual('http://localhost/f');
    });

    it('Verifica se o botão de play again leva para o endpoint correto', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        localStorage.setItem('ranking', '[{"name":"job","score":48,"picture":"f"}]');

        act(() => {
            history.push('/ranking')
        })
        userEvent.click(screen.getByTestId('btn-go-home'));

        expect(history.location.pathname).toBe('/');


    });

    // it('Verifica o comportamento do botão Play, e se leva para o endpoint correto', async () => {
    //     const { history } = renderWithRouterAndRedux(<App />);

    //     const emailInput = screen.getByTestId('input-gravatar-email');
    //     const nicknameInput = screen.getByTestId('input-player-name');
    //     const playBtn = screen.getByTestId('btn-play');

    //     expect(playBtn).toBeDisabled();
    //     userEvent.type(emailInput, 'teste@teste.com');
    //     expect(playBtn).toBeDisabled();
    //     userEvent.type(nicknameInput, 'teste');
    //     expect(playBtn).not.toBeDisabled();

    //     userEvent.click(playBtn);
    //     await waitFor(() => {
    //         const { pathname } = history.location;
    //         expect(pathname).toBe('/game');
    //     });
    // });

    // it('Verifica se ao logar é feita uma chamada à API para guardar o token no localStorage', () => {
    //     const tokenObj = {
    //         response_code: 0,
    //         response_message: "Token Generated Successfully!",
    //         token: "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    //     };

    //     global.fetch = jest.fn(() => Promise.resolve({
    //         json: () => Promise.resolve(tokenObj),
    //     }));

    //     const { history } = renderWithRouterAndRedux(<App />);

    //     const emailInput = screen.getByTestId('input-gravatar-email');
    //     const nicknameInput = screen.getByTestId('input-player-name');
    //     const playBtn = screen.getByTestId('btn-play');

    //     userEvent.type(emailInput, 'teste@teste.com');
    //     userEvent.type(nicknameInput, 'teste');
    //     userEvent.click(playBtn);

    //     expect(global.fetch).toHaveBeenCalledTimes(1);
    // });
});