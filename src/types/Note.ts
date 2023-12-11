import { FormState } from '../helpers/formReducer';

export type NoteType = {
  id: string,
  name: string,
  username: string,
  project: string,
  tracker: FormState,
};