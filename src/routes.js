import React from "react";
import {Route, Switch} from 'react-router-dom';
import Soundboard from './components/Soundboard/Soundboard'
import WorldView from './components/WorldView/WorldView'

export default (
    <Switch>
        <Route component={Soundboard} exact path='/'/>
        <Route component={WorldView} path='/worldview'/>
    </Switch>
)
