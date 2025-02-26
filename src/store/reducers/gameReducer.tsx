const initialState = {imgNames: ,
                      bgColor: "black",
                      colorText:"black",
                      isLoading: true,
                      isRunning: false
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