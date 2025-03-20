import axios from 'axios';
import { Response } from 'express';

export const axiosErrorHandler = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            return {
                Error: error.response.status,
                Details: error.response.data,
            };
        } else {
            return {
                Error: "No response from server",
                Details: error.message,
            };
        }
    } else {
        throw new Error("Error: " + (error instanceof Error ? error.message : 'Unknown error'));
    }
};

export const responseHandler = (res:Response, result:any)=> {
    if (result && "ok" in result) {
      res.status(200).json(result.data);
    } else {
      const status = parseInt(String(result?.Error)) || 400;
      res.status(status).json(result?.Details || { error: "Unknown error" });
    }
  }