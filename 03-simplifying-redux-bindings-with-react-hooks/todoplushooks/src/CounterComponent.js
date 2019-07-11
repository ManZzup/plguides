import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseCount } from './actions';

export default function CounterComponent(){
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                {counter}
            </div>
            <div>
                <button onClick={() => dispatch(increaseCount())}>
                    UP YOU GO
                </button>
            </div>
        </div>
    )
}