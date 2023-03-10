import ReactPullToRefresh from 'react-pull-to-refresh';
import {CircularProgress} from '@mui/material';
import React, {useEffect, useMemo, useState} from 'react';

export const ReactPullToRefreshComponent = () => {
    return <ReactPullToRefresh
        icon={<CircularProgress disableShrink color="error" size={24}/>}
        onRefresh={async () => {
            return Promise.resolve()
        }}
    >
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
        <h1>Lorem ipsum</h1>
    </ReactPullToRefresh>
}
