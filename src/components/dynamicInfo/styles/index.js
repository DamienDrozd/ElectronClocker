import styled from 'styled-components';


export const CardDiv =  styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.background_two};
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin: 20px;
    border: 1px solid ${props => props.theme.border};
`

export const DynamicInformation = styled.div`
    background-color: ${props => props.theme.background_three};
    border-radius: 10px;
    border: 1px solid ${props => props.theme.border};
    padding: 20px;
    margin: 5px;
    display: block;
    font-size: 20px;
    color: ${props => props.theme.text};
    height: 100%;
`

export const ChartCardDiv =  styled.div`
    background-color: ${props => props.theme.background_two};
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin: 20px;
    border: 1px solid ${props => props.theme.border};
    width: 100%;
`


export const ChartDiv = styled.div`
    flex-grow: 5;
    background-color: ${props => props.theme.background_three};
    border-radius: 10px;
    border: 1px solid ${props => props.theme.border};
    padding: 20px;
    margin: 5px;
    display: block;
    font-size: 20px;
    color: ${props => props.theme.text};
    height: 100%;
`
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
    width: 100%;
`