import { UPDATE_OLD_EXPR_STRING, UPDATE_NEW_EXPR_STRING, UPDATE_UID, UPDATE_DISPLAY_TREE_CHECK_MARKS, UPDATE_MY_FILES, UPDATE_OTHER_FILES } from '../constants/action-types';

const initialState = {
    oldExprString: "",
    newExprString: "",
    uid: undefined,
    displayTreeCheckMarks: false,
    myFiles: [],
    otherFiles: {}
};

function rootReducer(state = initialState, action) {
    if (action.type === UPDATE_OLD_EXPR_STRING) {
        return Object.assign({}, state, {
            oldExprString: action.payload.exprString
        });
    }
    if (action.type === UPDATE_NEW_EXPR_STRING) {
        return Object.assign({}, state, {
            newExprString: action.payload.exprString
        });
    }
    if (action.type === UPDATE_UID) {
        return Object.assign({}, state, {
            uid: action.payload.uid
        });
    }
    if (action.type === UPDATE_DISPLAY_TREE_CHECK_MARKS) {
        return Object.assign({}, state, {
            displayTreeCheckMarks: !state.displayTreeCheckMarks // TODO: make it so it doesn't flip but set (in case flipping goes wrong/doesn't happen)
        });
    }
    if (action.type === UPDATE_MY_FILES) {
        return Object.assign({}, state, {
            myFiles: action.payload.list
        });
    }
    if (action.type === UPDATE_OTHER_FILES) {
        return Object.assign({}, state, {
            otherFiles: action.payload.list
        }); 
    }
    return state;
}

export default rootReducer;