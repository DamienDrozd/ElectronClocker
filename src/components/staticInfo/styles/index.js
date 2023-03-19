import styled from 'styled-components';


export const StaticInformation = styled.div`
    background-color: ${props => props.theme.background_three};
    border-radius: 10px;
    border: 1px solid ${props => props.theme.border};
    padding: 20px;
    margin: 20px;
    display: block;
    font-size: 20px;
    color: ${props => props.theme.text};
    font-family: 'Roboto', sans-serif;
    height: 100%;
`
export const CardDiv =  styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.background_two};
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin: 20px;
    font-family: 'Roboto', sans-serif;
    border: 1px solid ${props => props.theme.border};
    
`