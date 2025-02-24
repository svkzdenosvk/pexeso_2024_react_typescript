const initialState = {seconds: 0,
                      imgNames: ,
                      bgColor: "black",
                      isLoading: true,
                      ;}

function counterReducer(state = initialState, action ){
    
    switch(action.type){
        case 'BUBUBU':
            return {...state, count};
        default:
            return {}    
    }
    return state;
}

export default counterReducer;