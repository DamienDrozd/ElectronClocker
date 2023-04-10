import styled from 'styled-components';


export const MainDiv =  styled.div`
`
export const AlignDiv =  styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`


export const InstallPackages = styled.div`
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


export const Login = styled.div`
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

export const CenterDiv =  styled.div`
    display: flex;  
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`