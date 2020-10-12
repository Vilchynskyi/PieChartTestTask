import React from 'react';
import { Route } from 'react-router';
import PieChart from './PieChart/PieChart';
import HomePage from './HomePage/HomePage';

import '../common/style/reset.css'
import '../common/style/index.css'

function App() {
    return (
        <div className="container">
            <Route path="/" exact component={HomePage} />
            <Route path="/piechart" component={PieChart}/>
        </div>
    );
}

export default App;
