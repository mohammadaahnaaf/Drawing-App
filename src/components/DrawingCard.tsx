import React from 'react';
import { Link } from 'react-router-dom';
import { Stage, Layer, Line, Rect, Circle } from 'react-konva';
import { Drawing } from '@/types/types';



interface DrawingCardProps {
  drawing: Drawing;
}

const DrawingCard: React.FC<DrawingCardProps> = ({ drawing }) => {
  const { title } = drawing;
  return (
    <Link to={`/drawing/${drawing._id}`}>
      <div className='ring-0 hover:scale-105 duration-300 hover:ring-2 ring-purple-500 m-2 p-2 rounded-lg shadow-lg bg-white'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        <Stage width={400} height={250}>
          <Layer>
            {drawing?.lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="purple"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
              />
            ))}
            {drawing?.shapes.map((shape, i) => (
              <React.Fragment key={i}>
                {shape?.tool === 'rectangle' && (
                  <Rect
                    x={shape.x}
                    y={shape.y}
                    width={shape.width || 0}
                    height={shape.height || 0}
                    stroke="purple"
                    strokeWidth={2}
                  />
                )}
                {shape?.tool === 'circle' && (
                  <Circle
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius || 0}
                    stroke="purple"
                    strokeWidth={2}
                  />
                )}
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>
    </Link>
  );
};

export default DrawingCard;
