import React, { useRef } from "react";
import Canvas from '../Canvas/Canvas';
import { GameWrapper } from "./Game.styles";

interface GameProps {}

const Game: React.FC<GameProps> = ({}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const draw = (ctx: CanvasRenderingContext2D) => {};

    return (
    <GameWrapper>
        <Canvas ref={canvasRef}draw={draw} />
    </GameWrapper>
    );
};

export default Game;