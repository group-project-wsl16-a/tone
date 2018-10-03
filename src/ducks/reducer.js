const initialState = {

}

const EXAMPLE_TEST = 'EXAMPLE_TEST'


export default function reducer( state = initialState, action ){ 
    switch( action.type ){
        
        case EXAMPLE_TEST:
        return Object.assign( {}, state, { searchParams: action.payload })

        default:
        return state;
    }
}

export function exampleFunction ( ) {
    return {
        type: EXAMPLE_TEST,
        payload: 'Test'
    }
}