import { Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  dismissible?: boolean; // 배경 클릭/X버튼으로 닫을 수 있는지
  onClose?: () => void; // dismissible이 true일 때 호출
  width?: number;
}

const ModalOverlay = styled.div<{ $dismissible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: ${({ $dismissible }) => ($dismissible ? 'pointer' : 'default')};
`;

const StyledWindow = styled(Window)<{ $width: number }>`
  width: 90vw;
  max-width: ${({ $width }) => $width}px;
  cursor: default;
`;

const CloseIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-left: -1px;
  margin-top: -1px;
  transform: rotateZ(45deg);
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background: ${colors.borderDarkest};
  }

  &:before {
    height: 100%;
    width: 3px;
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    height: 3px;
    width: 100%;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  width: 30px;
  height: 80%;
  aspect-ratio: 1;
  padding: 0;
  border: 1px solid ${colors.borderDarkest};
  background: ${colors.divider};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    inset 1px 1px 0 ${colors.borderLightest},
    inset -1px -1px 0 ${colors.borderDark};
`;

const HeaderWrapper = styled.div`
  position: relative;
`;

const Modal = ({ title, children, dismissible = false, onClose, width = 400 }: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (dismissible && onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    if (dismissible && onClose) {
      onClose();
    }
  };

  return (
    <ModalOverlay $dismissible={dismissible} onClick={handleOverlayClick}>
      <StyledWindow $width={width}>
        <HeaderWrapper>
          <WindowHeader>{title}</WindowHeader>
          {dismissible && (
            <CloseButton onClick={handleClose}>
              <CloseIcon />
            </CloseButton>
          )}
        </HeaderWrapper>
        <WindowContent>{children}</WindowContent>
      </StyledWindow>
    </ModalOverlay>
  );
};

export default Modal;
