import React from "react";
import { styled } from '@mui/system';

const Page = styled('div')({
    width: '100%'

})


function Layout({ children }: { children: any }) {


    return (
        <div>
            Layout
            <Page>
                {children}
            </Page>
            Layout
        </div>
    );
}

export default Layout;