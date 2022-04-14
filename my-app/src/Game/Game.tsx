import React, { useRef } from "react";
import Canvas from '../Canvas/Canvas';
import draw from "../Draw/Draw";
import { GameWrapper } from "./Game.styles";
import useGameLogic from "./useGameLogic";

interface GameProps {}

const Game: React.FC<GameProps> = ({}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { snakeBody, onKeyDownHandler } = useGameLogic({
        canvasHeight: canvasRef.current?.height,
        canvasWidth: canvasRef.current?.width,
    });

    const drawGame = (ctx: CanvasRenderingContext2D) => {
        draw({ ctx, snakeBody })
    };

    return (
    <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>
        <Canvas ref={canvasRef}draw={drawGame} />
    </GameWrapper>
    );
};

export default Game;