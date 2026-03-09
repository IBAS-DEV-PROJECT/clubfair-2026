import { Button } from 'react95';
import styled from 'styled-components';
import Modal from './Modal';

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0;
`;

const Message = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  white-space: pre-line;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AlertModal = ({ message, onClose }: AlertModalProps) => {
  return (
    <Modal title="알림" onClose={onClose} width={350}>
      <ContentWrapper>
        <Message>{message}</Message>
        <ButtonWrapper>
          <Button onClick={onClose}>확인</Button>
        </ButtonWrapper>
      </ContentWrapper>
    </Modal>
  );
};

export default AlertModal;
