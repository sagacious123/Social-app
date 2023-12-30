import {
  Button,
  ButtonProps,
  ButtonGroup,
  ButtonGroupProps,
} from "@chakra-ui/react";
import React from "react";
// import { IconType } from "react-icons";
import { Icon } from "@chakra-ui/react";

export interface PrimaryButtonProps extends ButtonProps {
  value?: string;
}
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  value,
  children,
  ...rest
}) => {
  return (
    <Button
      isLoading={rest.isLoading}
      loadingText="Submitting"
      className="primary-btn h-auto fw-normal"
      isDisabled={rest.disabled}
      {...rest}
    >
      {value}
      {children}
    </Button>
  );
};

interface ThemeGroupButtonProps extends ButtonGroupProps {
  to: string;
  name?: string;
  icon: any | undefined;
  bgColor?: string;
}

export const ThemeGroupButton: React.FC<ThemeGroupButtonProps> = ({
  to,
  name,
  icon,
  bgColor = "btn-success",
  ...rest
}) => {
  return (
    <ButtonGroup {...rest}>
      <a href={to} className={`btn btn-sm rounded-0 ${bgColor}`} title={name}>
        <Icon as={icon} color="#fff" />
        <span className="hidden-xs text-white">&nbsp;&nbsp;{name}</span>
      </a>
    </ButtonGroup>
  );
};
