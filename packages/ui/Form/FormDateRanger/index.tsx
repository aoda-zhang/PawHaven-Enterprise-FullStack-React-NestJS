import { FormControl, FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { SingleInputDateRangeFieldProps } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import clsx from 'clsx';
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { BaseFormType } from '../formBase.type';

type FormSingleDateRangerProps = BaseFormType &
  Omit<SingleInputDateRangeFieldProps, 'value' | 'onChange'> & {
    fullWidth?: boolean;
  };

export const FormDateRanger: FC<FormSingleDateRangerProps> = ({
  name,
  label,
  defaultValue = [null, null],
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
          <FormControl fullWidth={fullWidth} error={!!error}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SingleInputDateRangeField
                value={field.value}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    variant: props?.variant ?? 'outlined',
                    required: props?.required,
                    fullWidth,
                  },
                }}
              />
            </LocalizationProvider>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        </div>
      )}
    />
  );
};
