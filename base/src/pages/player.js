import React from 'react';
import dynamic from 'next/dynamic';

const PlayerComponent = dynamic(() => import('audioplayer/audioplayer'), { ssr: false });

const player = () => {
  return (
    <div>
      <PlayerComponent />
      audioplayer
    </div>
  );
};

export default player;
