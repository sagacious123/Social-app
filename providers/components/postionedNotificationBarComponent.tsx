import { ReactElement } from "react";
import { MdClose } from "react-icons/md";
import {
  PositionedNotificationCloseButtonContainer,
  PositionedNotificationContainer,
} from "./styled";

export interface PositionedNotificationBarComponentProps {
  show?: boolean;
  title?: string;
  message?: string | ReactElement;
  onClose?: () => void;
  backgroundColor?: string;
  color?: string;
}

export const PositionedNotificationBarComponent: React.FC<
  PositionedNotificationBarComponentProps
> = ({
  show,
  title,
  message = "Request Handled",
  backgroundColor = "#00A788",
  color = "#fff",
  onClose = () => {},
}) => {
  if (!show) return null;

  return (
    <PositionedNotificationContainer style={{ backgroundColor }}>
      <div className="py-2 text-center" style={{ color }}>
        <div className="fw-600">{title}</div>
        <div className="fw-500">{message}</div>
      </div>
      <PositionedNotificationCloseButtonContainer
        style={{ color }}
        onClick={() => onClose()}
      >
        <MdClose fontSize={24} onClick={() => onClose()} />
      </PositionedNotificationCloseButtonContainer>
    </PositionedNotificationContainer>
  );
};
