const initialState = {seconds: 0,
                      imgNames: ,
                      bgColor: "black",
                      isLoading: true,
                      ;}

function gameReducer(state = initialState, action ){
    
    switch(action.type){
        case 'BUBUBU':
            return {...state, count};
        default:
            return {}    
    }
    return state;
}

export default gameReducer;