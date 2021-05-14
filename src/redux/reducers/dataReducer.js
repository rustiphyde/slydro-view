import {
	SET_SLYDESHOWS,
    LOADING_DATA
} from "../types";

const initialState = {
	slydeshows: [],
	
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SET_SLYDESHOWS:
			return {
				...state,
				slydeshows: action.payload,
				loading: false,
			};
		
		default:
			return state;
	}
}
