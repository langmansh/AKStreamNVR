import {
    FETCH_ENUMS
} from './action';

const initialState = {
    isFetching: true,
    data: null,
};

export const enums = (state = initialState, action) => {
    switch (action.type) {
        case `${FETCH_ENUMS}_PENDING`:
            return {...initialState};
        case `${FETCH_ENUMS}_SUCCESS`:
            var result = {};
            action.payload.data.forEach((item, index) => {
                var mappingResult = {};
                item["enums"].forEach((e, i) => {
                    mappingResult[e.enumName] = e;
                })
                result[item["enumType"]] = mappingResult;
            });
            return {
                ...state,
                isFetching: false,
                data: result,
            };
        default:
            return state;
    }
}

