import React, { FC, useState } from 'react';

import Header from '../Header';
import ThreadsList from './ThreadsList';

const Threads: FC = () => {
    const [counter, setCounter] = useState<number>(1);
    
    return (
        <>
            <Header />
            <ThreadsList/>
        </>
    );
}

export default Threads;