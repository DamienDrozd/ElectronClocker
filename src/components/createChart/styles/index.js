import styled from 'styled-components';



export const CustomSelect = styled.select`
    background-color: ${props => props.theme.secondary};
    border-radius: 10px;
    border: 1px solid ${props => props.theme.border};
    padding: 20px;
    margin: 5px;
    display: block;
    font-size: 20px;
    color: ${props => props.theme.white};
    height: 100%;
`