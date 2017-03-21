import React, { Component } from 'react';
import { Spinner } from 'native-base';

const primary = require('../../themes/variable').brandPrimary;

export default class SpinnerExample extends Component {
    render() {
        return (
            <Spinner color={primary} />
        );
    }
}
