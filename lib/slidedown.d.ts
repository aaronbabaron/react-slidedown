import React from "react";
interface SlideDownProps {
    children?: React.ReactNode;
    className?: string;
    transitionOnAppear?: boolean;
    closed?: boolean;
}
export declare const SlideDown: React.MemoExoticComponent<React.ForwardRefExoticComponent<SlideDownProps & React.RefAttributes<HTMLDivElement>>>;
export default SlideDown;
