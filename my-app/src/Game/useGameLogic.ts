import React, { useState } from "react"
import { SEGMENT_SIZE } from "../Draw/Draw";
import useInterval from "../Utils/useInterval";
import createSnakeMovement from "./Movement";

export interface Position{
    x: number;
    y: number;
}

export enum Direction{
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

const MOVEMENT_SPEED = 100;

interface UseGameLogicArgs {
    canvasWidth?: number;
    canvasHeight?: number;
}

const useGameLogic = ({canvasHeight, canvasWidth}: UseGameLogicArgs) => {

    const [direction, setDirection] = useState<Direction>();

    const [snakeBody, setSnakeBody] = useState<Position[]>([
     {
        x:0,
        y:0,
     },
    ]);

    const [foodPosition, setFoodPosition] = useState<Position[] | undefined>();

    const snakeHeadPosition = snakeBody[snakeBody.length - 1];

    const {moveDown, moveUp, moveLeft, moveRight} = createSnakeMovement();
    console.log(canvasHeight,canvasWidth);

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.code) {
            case 'KeyS':
                if (direction != Direction.UP){
                setDirection(Direction.DOWN);
                }
                break;
            case 'KeyW':
                if (direction != Direction.DOWN){
                setDirection(Direction.UP)
                }
                break;
            case 'KeyA':
                if (direction != Direction.RIGHT){
                setDirection(Direction.LEFT)
                }
                break;
            case 'KeyD':
                if (direction != Direction.LEFT){
                setDirection(Direction.RIGHT)
                }
                break;
        }
        console.log(event.code);
    };

    const moveSnake = () => {
        let snakeBodyAfterMovement: Position[] | undefined;
        switch (direction){
            case Direction.UP:
                if (snakeHeadPosition.y > 0){
                snakeBodyAfterMovement = moveUp(snakeBody);
                } else{
                    alert('YOU HIT A WALL. GAME OVER!');
                }
                break;
            case Direction.DOWN:
                if (canvasHeight && snakeHeadPosition.y < canvasHeight - SEGMENT_SIZE ){
                snakeBodyAfterMovement = moveDown(snakeBody);
                } else{
                    alert('YOU HIT A WALL. GAME OVER!')
                }
                break;
            case Direction.LEFT:
                if (snakeHeadPosition.x > 0){
                snakeBodyAfterMovement = moveLeft(snakeBody);
                }else{
                    alert('YOU HIT A WALL. GAME OVER!');
                }
                break;
            case Direction.RIGHT:
                if (canvasWidth && snakeHeadPosition.x < canvasWidth - SEGMENT_SIZE){
                snakeBodyAfterMovement = moveRight(snakeBody);
                } else{
                    alert('YOU HIT A WALL. GAME OVER!');
                }
                break;
        }
        if(snakeBodyAfterMovement){
        setSnakeBody(snakeBodyAfterMovement);
        }
    };

    useInterval(moveSnake, MOVEMENT_SPEED);
    
    return{
        snakeBody,
        onKeyDownHandler,
    };
};

export default useGameLogic;