import React from 'react';
import Router from 'next/router';
import { deleteTokens } from '../public/oauth';

export default class extends React.Component {
    async componentDidMount () {
        await deleteTokens();
        await Router.push('/');
    }

    render() {
        return null;
    }
}