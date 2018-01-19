import styled, { css } from 'styled-components';

const Button = styled.button`
    border-radius: 3px;
    padding: 0.05em 0.25em;
    margin: 0 1em;
    background: lightgray;
    color: #1a1a1a;
    border: 1px solid darkgray;

    ${props => props.right && css`
        border-radius: 0 3px 3px 0;
        margin-left: 0;
    `}

    ${props => props.left && css`
        border-radius: 3px 0 0 3px;
        margin-right: 0;
    `}
`;


export default Button;
