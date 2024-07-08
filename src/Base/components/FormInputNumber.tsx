import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface FormInputNumberProps<T extends FieldValues> extends FormControlProps {
  control: Control<T>;
  errorMessage?: string;
  id: string;
  isRequired?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  thousandSeparator?: boolean | string;
  type?: HTMLInputTypeAttribute;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

function FormInputNumber<T extends FieldValues = FieldValues>({
  control,
  errorMessage,
  id,
  isRequired,
  label,
  name,
  thousandSeparator,
  placeholder,
  type = "number",
  leftIcon,
  rightIcon,
  ...formControlProps
}: FormInputNumberProps<T>) {
  return (
    <FormControl
      id={id}
      isInvalid={Boolean(errorMessage)}
      isRequired={isRequired}
      {...formControlProps}
    >
      <FormLabel>{label}</FormLabel>
      <Controller<T>
        control={control}
        name={name as Path<T>}
        render={({ field: { onChange, name: inputName, value } }) =>
          thousandSeparator ? (
            <InputGroup>
              {leftIcon ? (
                <InputLeftElement color="gray.800" fontSize="1.2em">
                  {leftIcon}
                </InputLeftElement>
              ) : null}
              <Input
                as={NumericFormat}
                decimalSeparator=","
                name={inputName}
                placeholder={placeholder}
                thousandSeparator={thousandSeparator}
                thousandsGroupStyle="thousand"
                value={value === undefined ? "" : value}
                onChange={onChange}
              />
            </InputGroup>
          ) : (
            <InputGroup>
              {leftIcon ? (
                <InputLeftElement color="gray.800" fontSize="1.2em">
                  {leftIcon}
                </InputLeftElement>
              ) : null}
              <Input
                name={inputName}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
              />
              {rightIcon ? (
                <InputRightElement color="gray.800" fontSize="1.2em">
                  {rightIcon}
                </InputRightElement>
              ) : null}
            </InputGroup>
          )
        }
      />
      {errorMessage ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

export default FormInputNumber;
