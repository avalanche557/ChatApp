import React from 'react';

import {BrowserRouter as Router, Route } from 'react-router-dom';

//import components
import Join from './components/join/Join';
import Chat from './components/chat/Chat'

const App = () => (
    <Router>
        <Route path='/' exact component={Join}></Route>
        <Route path='/chat' component={Chat}></Route>
    </Router>
)

export default App;