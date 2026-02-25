import styled from 'styled-components';
import { breakpoints } from '../../../styles/breakpoints';

type AdminContentVariant = 'dashboard' | 'setting';

const AdminContentWrapper = styled.div<{ $variant?: AdminContentVariant }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${breakpoints.mobileL}) {
    padding-top: ${({ $variant }) => ($variant === 'setting' ? '48px' : '64px')};
    padding-bottom: ${({ $variant }) => ($variant === 'setting' ? '16px' : '0')};
  }

  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.laptop}) {
    flex: 1;
    justify-content: ${({ $variant }) => ($variant === 'dashboard' ? 'center' : 'flex-start')};

    padding-top: ${({ $variant }) => ($variant === 'setting' ? '32px' : '0')};
    padding-bottom: ${({ $variant }) => ($variant === 'setting' ? '32px' : '0')};
  }
`;

export default AdminContentWrapper;
