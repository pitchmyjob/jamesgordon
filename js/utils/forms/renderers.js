import React from 'react';

import { Input } from 'native-base';

export const renderInput = (field) => {
    const { input, meta, ...props } = field;
    const { onChange } = input;

    return (
        <Input onChangeText={onChange} {...props} />
    );
};
