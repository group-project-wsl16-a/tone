import React from "react";
import {Route, Switch} from 'react-router-dom';
import Soundboard from './components/Soundboard/Soundboard'

export default (
    <Switch>
        <Route component={Soundboard} exact path='/'/>
    </Switch>
)
