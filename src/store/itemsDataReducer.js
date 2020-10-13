import getRandomColor from "../utils/getRandomColor";

const itemsDataReducer = (state = {
    items: [
        {
            title: undefined,
            value: undefined,
            color: getRandomColor()
        },
        {
            title: undefined,
            value: undefined,
            color: getRandomColor()
        },
    ]
}, action) => {
    switch(action.type) {
        case "UPDATE_ITEM_TITLE_STATE":
            return { items: state.items.map((item, index) => {
                    if (index === action.index) {
                        return { ...item, title: action.title }
                    }
                    return item;
                })
            };
        case "UPDATE_ITEM_VALUE_STATE":
            return { items: state.items.map((item, index) => {
                    if (index === action.index) {
                        return { ...item, value: action.value }
                    }
                    return item;
                })};
        case "ADD_NEW_ITEM":
            const defaultItem = { title: undefined, value: undefined, color: getRandomColor() };
            return { items: [...state.items, defaultItem]}
        default:
            return state;
    }
}

export default itemsDataReducer