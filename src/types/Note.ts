import { FormState } from '../helpers/formReducer';

export type NoteType = {
  id: number,
  name: string,
  username: string,
  project: string,
  tracker: FormState,
};