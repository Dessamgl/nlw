import React, { forwardRef, ForwardRefRenderFunction } from "react";
import {Textarea as ChakraTextArea, FormLabel, FormControl, TextareaProps as ChakraTextAreaProps, FormErrorMessage} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface TextareaProps extends ChakraTextAreaProps {
  name: string;
  label?: string;
  size?: "sm" | "md" | "lg" | "xs";
  error?: FieldError;
}

const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> 
  = ({ name, label, size = "lg", error = null,...rest }, ref ) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel color="gray.200" paddingTop="3" htmlFor={name}>{label}</FormLabel> }

      <ChakraTextArea
        name={name} 
        id={name}
        size={size}
        fontSize="md"
        cursor="pointer"
        focusBorderColor="red.900"
        bgColor="gray.800"
        variant="filled"
        _hover={{
          bgColor: 'gray.700'
        }}
        ref={ref}
        {...rest}
      />
      { !!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
  </FormControl>
  )
}

export const Textarea = forwardRef(TextareaBase);