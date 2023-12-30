import styled from "@emotion/styled";

export const PositionedNotificationContainer = styled.div(`
    position: fixed;
    width: 100%;
    max-width: 100vw;
    z-index: 999999;
    top: 0;
    padding: 0.3rem 0.5rem;
    transition: all 3s;
`);

export const PositionedNotificationCloseButtonContainer = styled.div(`
    z-index: 999;
    bottom: 0.6rem;
    right: 1rem;
    position: absolute!important;
`);
