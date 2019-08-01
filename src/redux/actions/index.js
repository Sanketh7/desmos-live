import { UPDATE_OLD_EXPR_STRING, UPDATE_NEW_EXPR_STRING, UPDATE_UID, UPDATE_DISPLAY_TREE_CHECK_MARKS, UPDATE_MY_FILES, UPDATE_OTHER_FILES } from '../constants/action-types';

export function updateOldExprString(payload) {
    return { type: UPDATE_OLD_EXPR_STRING, payload }
}

export function updateNewExprString(payload) {
    return { type: UPDATE_NEW_EXPR_STRING, payload }
}

export function updateUid(payload) {
    return { type: UPDATE_UID, payload};
}

export function updateDisplayTreeCheckMarks() {
    return { type: UPDATE_DISPLAY_TREE_CHECK_MARKS };
}

export function updateMyFiles(payload) {
    return { type: UPDATE_MY_FILES, payload };
}

export function updateOtherFiles(payload) {
    return { type: UPDATE_OTHER_FILES, payload };
}