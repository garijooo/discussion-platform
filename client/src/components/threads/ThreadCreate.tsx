import React, { useState, FC } from 'react';

import { reduxForm } from 'redux-form';

import ThreadForm from './ThreadForm';
import ThreadFormReview from './ThreadFormReview';

const ThreadCreate:FC = () => {
    const [showFormReview, setShowFormReview] = useState(false);

    const renderContent = function() {
        return showFormReview ? <ThreadFormReview /> : <ThreadForm />;
    }

    return(
        <div>
            ThreadCreate
            {renderContent()}
        </div>
    );
}

export default reduxForm({ form: 'threadForm' })(ThreadCreate);