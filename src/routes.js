import React from "react";
import {Route, Switch} from 'react-router-dom';
import WorldView from './components/WorldView/WorldView';
import MountainRange from './components/MountainRange/MountainRange';
import Mines from './components/Mines/Mines';

export default (
    <Switch>
        <Route component={MountainRange} exact path='/'/>
        <Route component={MountainRange} path='/mountain/:state'/>
        <Route component={WorldView} path='/worldview'/>
        <Route component={Mines} path='/mines/:state'/>
    </Switch>
)