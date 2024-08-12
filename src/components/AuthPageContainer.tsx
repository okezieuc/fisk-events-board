import React from "react";

type AuthPageContainerProps = {
    children: React.ReactElement
}

const AuthPageContainer = ({ children }: AuthPageContainerProps) => {
    return (
        <div className="flex min-h-screen flex-col bg-yellow-500">
            <div className="p-4 h-16">
                <img src="assets/images/Fisklogo.png" className="h-full"/>
            </div>
            <div className="flex flex-row flex-grow container mx-auto justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default AuthPageContainer;