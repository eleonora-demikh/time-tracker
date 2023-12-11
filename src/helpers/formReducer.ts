type FormState = {
  userId?: string,
  date: string;
  time: number;
  details: string;
};

type FormAction =
| { type: 'UPDATE_FIELD'; field: string; value: string | number }
| {type: 'TRIM'}
| { type: 'RESET' };

export const initialState: Omit<FormState, 'userId'> = {
  date: '',
  time: 0,
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
