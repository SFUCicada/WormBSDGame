import { Position } from "../Game/useGameLogic";

interface DrawArgs{
    ctx: CanvasRenderingContext2D;
    snakeBody: Position[];
}

export const SEGMENT_SIZE = 5;

const draw = ({ ctx, snakeBody }: DrawArgs) => {

    console.log(snakeBody);

    ctx.fillStyle = 'rgb(200,0,0)';

    snakeBody.forEach(segment => ctx.fillRect(segment.x,segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
    );
};

export default draw;