export type FormState = {
  date: string;
  time: string | number;
  details: string;
};

type FormAction =
| { type: 'UPDATE_FIELD'; field: string; value: string | number }
| {type: 'TRIM'}
| { type: 'RESET' };

export const initialState: FormState = {
  date: '',
  time: '',
  details: '',
};

export function formReducer (state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };

    case 'TRIM':
      const trimmedState: FormState = {
        ...state,
        details: state.details.replace(/\s+/g, ' ').trim(),
      };

      return trimmedState;

    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
