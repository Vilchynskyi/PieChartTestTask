const itemsDataReducer = (state = {
    items: [
        {
            title: 'qwe',
            value: 234,
            color: getRandomColor()
        },
        {
            title: 'asd',
            value: 342,
            color: getRandomColor()
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
            const defaultItem = { title: undefined, value: undefined, color: getRandomColor() };
            return { items: [...items, defaultItem]}
        default:
            return state;
    }
}

const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color
}

export default itemsDataReducer