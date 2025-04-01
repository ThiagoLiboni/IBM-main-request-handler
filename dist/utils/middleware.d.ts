import { Response } from 'express';
export declare const axiosErrorHandler: (error: unknown) => {
    Error: number;
    Details: any;
} | {
    Error: string;
    Details: string;
};
export declare const responseHandler: (res: Response, result: any) => void;
