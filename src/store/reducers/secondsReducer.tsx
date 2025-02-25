import { My_Type_Redux_Seconds_Action } from '../../_inc/my_types';


const initialState = {seconds: 0}

function secondsReducer(state = initialState, action:My_Type_Redux_Seconds_Action ){

    switch(action.type){
        case 'SECONDS_COUNTER':
            return { seconds:state.seconds+1}
        default:
            return state;
    
    }
}

export default secondsReducer;