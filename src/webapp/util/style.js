const coverHeight = 200
const Style = {
    headerRight: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        height: 44,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    rootSub: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: 1024 + 320 + 40,
    },
    recommend: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        background: '#FAFAFA',
    },

    paginator: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        alignContent: 'center',
        maxWidth: 1024,
        minWidth: 320,
        minHeight: 100,
    },
    itemDate: {
        width: 150,
        height: 20,
        position: 'absolute',
        top: coverHeight + 8,
        right: 0,
        color: '#9E9E9E',
    },
    itemDesc: {
        top: 0,
        padding: 15, minHeight: 80,
    },
    itemTag: {
        color: '#00838F',
        border: '1px solid #00838F'
    },

};

export default Style