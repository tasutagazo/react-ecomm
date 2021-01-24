import styled from 'styled-components';

export const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 80px;
    @media only screen and (max-width: 768px) {
          flex-wrap: wrap;
          padding: 15px 10px;
    }
`