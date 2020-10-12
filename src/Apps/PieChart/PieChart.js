import React, { Component } from 'react'
import { connect } from 'react-redux'


class PieChart extends Component {

    state = {
        hoverItemIndex: undefined
    }

    getRandomColor(numberOfItems) {
        let colorsArray = [];
        for (let i=0; i < numberOfItems; i++){
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            colorsArray.push(color);
        }
        return colorsArray;
    }

    getValues(){
        const {
            items
        } = this.props;
        let valuesArray = [];
        items.forEach((item = {}) => {
            const { value } = item;
            valuesArray.push(value);
        })
        return valuesArray;
    }

    getTitles(){
        const {
            items
        } = this.props;
        let titlesArray = [];
        items.forEach((item) => {
            const { title } = item;
            titlesArray.push(title);
        })
        return titlesArray;
    }

    getPoints(){
        const {
            items,
        } = this.props;
        
        let valuesArray = []
        items.forEach((item = {}) => {
            const { value } = item;
            valuesArray.push(value);
        })
        
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

    getPercents(valuesArray){
        let sumOfValues = valuesArray.reduce((acc, value) => acc + value);
        let percentsArray = valuesArray.map((value) => {
            let result = value * 100 / sumOfValues;
            return result.toFixed(2);
        })
        return percentsArray;
    }

    getFlags(valuesArray){
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
            hoverItemIndex
        } = this.state 
        const titlesArray = this.getTitles();
        const valuesArray = this.getValues();
        const pointsArray = this.getPoints(valuesArray);
        const flagsArray = this.getFlags(valuesArray);
        const colorsArray = this.getRandomColor(pointsArray.length);
        const percentsArray = this.getPercents(valuesArray);

        return (
            <div className="pieChartComponent">
                {}
                <svg viewBox="-125 -125 250 250" height="300px" width="300px" xmlns="http://www.w3.org/2000/svg">
                    <g transform="rotate(-90)">
                            { pointsArray.map((point, index) => {
                                const [x, y] = point;
                                const prevPoint = index !== 0 ? pointsArray[index - 1] : pointsArray[pointsArray.length - 1];
                                const [prevX, prevY] = prevPoint;
                                return (
                                    <path
                                        key={index + 1}
                                        className="pieSlice"
                                        d={`M0,0 L${prevX},${prevY} A100,100 0 ${flagsArray[index]},1 ${x},${y} Z`}
                                        fill={colorsArray[index]}
                                        onMouseOver={() => this.setState({ hoverItemIndex: index })}
                                        onMouseLeave={() => this.setState({ hoverItemIndex: '' })}
                                    />
                                )
                            }) }
                    </g>
                </svg>
                <div>
                    {titlesArray[hoverItemIndex]}
                </div>
                <li className="titlesList">
                    {   titlesArray.map((title, index) => {
                            return (
                                <ul style={{ color: colorsArray[index] }}>{title} - {valuesArray[index]} ({percentsArray[index]}%)</ul>
                            )
                        })
                    }
                </li>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    items: state.items 
})

export default connect(
    mapStateToProps,
)(PieChart)