export interface FieldValues {
  image?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  nickname?: string | null;
}

export interface FormProps {
  defaultValues: FieldValues;
}
