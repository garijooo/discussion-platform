import React, { FC, useState } from 'react';

import Header from '../Header';
import ThreadsShow from './ThreadsShow';

const Threads: FC = () => {
    const [counter, setCounter] = useState<number>(1);
    
    return (
        <>
            <Header />
            <ThreadsShow />
        </>
    );
}

export default Threads;