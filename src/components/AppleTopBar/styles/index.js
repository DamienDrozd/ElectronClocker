import styled from 'styled-components';


export const ButtonDiv =  styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom : 20px;
`

export const Button1 = styled.button`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.theme.button1};
    margin-left: 10px;
    border : 0;
`

export const Button2 = styled.button`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.theme.button2};
    margin-left: 10px;
    border : 0;
`

export const Button3 = styled.button`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.theme.button3};
    margin-left: 10px;
    border : 0;
`
