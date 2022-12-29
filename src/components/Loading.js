import React, { useState } from 'react';
import { Preloader, TailSpin } from 'react-preloader-icon';

function Loading({ showOverlay, showLoading }) {

    if (showOverlay) {
        return (
            <div style={{
                flex: 1,
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                overflowY: 'hidden',
                overflowX: 'hidden',
                opacity: 0.5,
                backgroundColor: 'black',
                width: '100%',
                height: '150%',
                zIndex: 9
            }}>
                {showLoading && <Preloader style={{
                    position: 'absolute',
                    left: '50%',
                    top: '20%',
                    bottom: 0,
                    right: 0,
                    zIndex: 99,
                }} use={TailSpin} size={150} strokeWidth={10} strokeColor="#f7b085" duration={600} />}
            </div>
        );
    }
    else {
        return null
    }

}

export default Loading