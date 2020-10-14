import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash';

class PieChart extends Component {

    state = {
        hoverItemIndex: undefined
    }

    validateItems(itemsList) {
        return itemsList.filter(item => item.value && item.title);
    }

    getValues(){
        const {
            itemsList
        } = this.props;
        const validItemsList = this.validateItems(itemsList);
        let valuesArray = [];
        validItemsList.forEach((item = {}) => {
            const { value } = item;
            valuesArray.push(value);
        })
        return valuesArray;
    }

    getTitles(){
        const {
            itemsList
        } = this.props;
        let titlesArray = [];
        itemsList.forEach((item) => {
            const { title } = item;
            titlesArray.push(title);
        })
        return titlesArray;
    }

    getPoints(valuesArray) {
        if (isEmpty(valuesArray)) return []
        let acc = 0;
        let totalAmount = valuesArray.reduce((acc, item) => acc + item); 
        
        let pointsArray = [];
        valuesArray.map((value) => {
            acc += value;
            let point = 2 * Math.PI * (acc / totalAmount);
            let x = Math.cos(point) * 100;
            let y = Math.sin(point) * 100;
            return pointsArray.push([x.toFixed(2), y.toFixed(2)]);
        })

        return pointsArray;
    }

    getPercents(valuesArray = []) {
        if (isEmpty(valuesArray)) return []
        let sumOfValues = valuesArray.reduce((acc, value) => acc + value);
        let percentsArray = valuesArray.map((value) => {
            let result = value * 100 / sumOfValues;
            return result.toFixed(2);
        })
        return percentsArray;
    }

    getFlags(valuesArray = []) {
        if (isEmpty(valuesArray)) return []
        let largeArcFlagsArray = [];
        let sumOfValues = valuesArray.reduce((acc, value) => acc + value);
        largeArcFlagsArray = valuesArray.map((value) => {
            if (sumOfValues / value >= 2) {
                return 0;
            } else return 1
        })
        return largeArcFlagsArray;
    }

    render() {
        const {
            itemsList 
        } = this.props;
        const {
            hoverItemIndex
        } = this.state;
        
        const titlesArray = this.getTitles();
        const valuesArray = this.getValues();
        const pointsArray = this.getPoints(valuesArray);
        const flagsArray = this.getFlags(valuesArray);
        const percentsArray = this.getPercents(valuesArray);

        return (
            <div>
                { isEmpty(valuesArray) && <h1>Please, go back to the main page and enter all data correctly</h1>}
                { !isEmpty(valuesArray) &&
                <div className="pieChartComponent">
                    <svg viewBox="-125 -125 250 250" height="300px" width="300px" xmlns="http://www.w3.org/2000/svg">
                        <g transform="rotate(-90)">
                                {   pointsArray.map((point, index) => {
                                        const itemKey = index + 1;
                                        const [x, y] = point;
                                        const prevPoint = index !== 0 ? pointsArray[index - 1] : pointsArray[pointsArray.length - 1];
                                        const [prevX, prevY] = prevPoint;
                                        return (
                                            <path
                                                key={itemKey}
                                                className="pieSlice"
                                                d={`M0,0 L${prevX},${prevY} A100,100 0 ${flagsArray[index]},1 ${x},${y} Z`}
                                                fill={itemsList[index].color}
                                                onMouseOver={() => this.setState({ hoverItemIndex: index })}
                                                onMouseLeave={() => this.setState({ hoverItemIndex: '' })}
                                            />
                                        )
                                    })
                                }
                        </g>
                    </svg>
                    <div className="sliceTitle">
                        {titlesArray[hoverItemIndex]}
                    </div>
                    <ul className="titlesList">
                        { titlesArray.map((title, index) => {
                            const itemKey = index + 1;
                            return (
                                <li key={itemKey} style={{ color: itemsList[index].color }}>
                                    {title} - {valuesArray[index]} ({percentsArray[index]}%)
                                </li>
                            )
                            })
                        }
                    </ul>
                </div>
                }   
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    itemsList: state.items 
})

export default connect(
    mapStateToProps,
)(PieChart)