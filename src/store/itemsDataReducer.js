const itemsDataReducer = (state = {
    items: [
        {
            title: undefined,
            value: undefined
        },
        {
            title: undefined,
            value: undefined
        },
    ]
}, action) => {
    const {
            items
        } = state;
    switch(action.type) {
        case "UPDATE_ITEM_TITLE_STATE":
            items[action.index].title = action.title;
            return { items };
        case "UPDATE_ITEM_VALUE_STATE":
            items[action.index].value = action.value;
            return { items };
        case "ADD_NEW_ITEM":
            const defaultItem = { title: undefined, value: undefined };
            return { items: [...items, defaultItem]}
        default:
            return state;
    }
}

export default itemsDataReducer