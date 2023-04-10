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

export const OverclockDiv = styled.div`
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

export const OverClockButton = styled.button`
    background-color: ${props => props.theme.primary};
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

export const SliderDiv = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Slider = styled.input`
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: ${props => props.theme.secondary};
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    &:hover {
        opacity: 1;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: ${props => props.theme.primary};
        cursor: pointer;
    }
    &::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: ${props => props.theme.primary};
        cursor: pointer;
    }
`

export const StopTurboBoostButton = styled.button`
    background-color: ${props => props.theme.secondary};
    border-radius: 10px;
    border: 1px solid ${props => props.theme.border};
    display: block;
    font-size: 20px;
    color: ${props => props.theme.white};
    height: 100%;
    width: 100%;
`

export const StartTurboBoostButton = styled.button`
    background-color: ${props => props.theme.primary};
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