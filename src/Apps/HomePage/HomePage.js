import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class HomePage extends Component {

    itemTitleHandler(index, event) {
        const {
            updateItemTitleState
        } = this.props;
        const title = event.target.value;
        updateItemTitleState(index, title);
    }

    itemValueHandler(index, event) {
        const {
            updateItemValueState
        } = this.props;
        const value = +event.target.value;
        updateItemValueState(index, value);
    } 

    buttonHandler = () => {
        const {
            addNewItem
        } = this.props;
        addNewItem()
    }

    render() {
        const {
            items,
        } = this.props;
        return (
            <div className="homePage">
                <h1 className="pageTitle">PieChart</h1>
                <h2 className="pageDesc">Please, insert at least 2 items</h2>
                {items.map((item, index) => {
                        const {
                            title,
                            value
                        } = item;
                        return (
                            <div className="itemInputs" key={index + 1}>
                                <div className="formGroup">
                                    <input className="formField" type="text" name="title" placeholder="Title"
                                        value={title}
                                        onChange={(event) => this.itemTitleHandler(index, event)}
                                        required autoComplete="off" 
                                    />
                                    <label className="formLabel" htmlFor="title">Title</label>
                                </div>
                                <div className="formGroup">
                                    <input className="formField" name="value" placeholder="Value"
                                        value={value}
                                        onChange={(event) => this.itemValueHandler(index, event)}
                                        type="number" required
                                    />
                                    <label className="formLabel" htmlFor="value">Value</label>
                                </div>
                            </div>
                        )
                })}
                <div className="button" onClick={this.buttonHandler}>ADD NEW ITEM</div>
                <NavLink className="button" to="/piechart"> Show PieChart</NavLink>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.items
})

const mapDispatchToProps = (dispatch) => ({
    updateItemTitleState: (index, title) => dispatch({
        type: "UPDATE_ITEM_TITLE_STATE",
        index,
        title
    }),
    updateItemValueState: (index, value) => dispatch({
        type: "UPDATE_ITEM_VALUE_STATE",
        index,
        value
    }),
    addNewItem: () => dispatch({
        type: "ADD_NEW_ITEM"
    })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)