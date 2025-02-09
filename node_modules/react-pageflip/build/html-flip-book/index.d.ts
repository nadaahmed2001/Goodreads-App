import React from 'react';
import { IFlipSetting, IEventProps } from './settings';
interface IProps extends IFlipSetting, IEventProps {
    className: string;
    style: React.CSSProperties;
    children: React.ReactNode;
    renderOnlyPageLengthChange?: boolean;
}
export declare const HTMLFlipBook: React.MemoExoticComponent<React.ForwardRefExoticComponent<IProps & React.RefAttributes<any>>>;
export {};
