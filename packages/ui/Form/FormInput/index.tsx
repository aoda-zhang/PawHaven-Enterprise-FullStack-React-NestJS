import { TextField, type TextFieldProps } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { BaseFormType, BaseTextFieldType } from '../formBase.type';

export const FormInput: React.FC<
  BaseFormType & TextFieldProps & BaseTextFieldType
> = ({
  name,
  label,
  defaultValue = '',
  type = 'text',
  fullWidth = true,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={clsx([props?.className, 'baseFormContainer'])}>
          <div className="mb-3">{label}</div>
          <TextField
            {...field}
            {...props}
            fullWidth={fullWidth}
            variant={props?.variant ?? 'outlined'}
            required={props?.required}
            error={!!error}
            type={type}
            helperText={error?.message}
          />
        </div>
      )}
    />
  );
};
