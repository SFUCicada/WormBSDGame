import React, { useRef, useState } from "react";
import Canvas from '../Canvas/Canvas';
import draw from "../Draw/Draw";
import { GameWrapper, Score, Welcome } from "./Game.styles";
import useGameLogic from "./useGameLogic";

interface GameProps {}

export enum GameState {
    RUNNING,
    GAME_OVER,
    PAUSE,
}

const Game: React.FC<GameProps> = ({}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [gameState, setGameState] = useState<GameState>(GameState.RUNNING);

    const onGameOver = () => setGameState(GameState.GAME_OVER)

    const { snakeBody, onKeyDownHandler, foodPosition, resetGameState } = useGameLogic({
        canvasHeight: 150,
        canvasWidth: 300,
        onGameOver,
        gameState
    });

    const drawGame = (ctx: CanvasRenderingContext2D) => {
        draw({ ctx, snakeBody, foodPosition })
    };

    return (
    <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>
        <Canvas ref={canvasRef}draw={drawGame} />
        {gameState === GameState.GAME_OVER ?(
            <button onClick={() => {
                setGameState(GameState.RUNNING);
                resetGameState();
            }}>Play Again</button>
        ) : <button onClick={() => {
            setGameState(gameState === GameState.RUNNING ? GameState.PAUSE: GameState.RUNNING )
        }}>{gameState === GameState.RUNNING ? 'Pause' : 'Play'}</button> }
        <Score>{`Your Score: ${(snakeBody.length - 1) * 10}`}</Score>
        <Welcome>Hello and Welcome to Worm. To Win: Collect as Many Apples as You Can.</Welcome>
        <Welcome>Controls: Move using 'HJKL'. Avoid Colliding with Yourself or the Walls as this Will End the Game.</Welcome>
    </GameWrapper>
    );
};

export default Game;