export default function CustomError(message: string) {
  throw new Error(message);
}

export interface NewErrorType {
  code: string;
  error: Readonly<Error>;
  set: {
    headers: Record<string, string> & {
      "Set-Cookie"?: string | string[] | undefined;
    };
    status?: number | string;
  };
}

export function NewError({ code, error, set }: NewErrorType) {
  switch (code) {
    case "AUTHENTICATION_ERROR":
      set.status = 401;
      return {
        status: "error",
        message: error.toString().replace("Error: ", ""),
      };
    case "AUTHORIZATION_ERROR":
      set.status = 403;
      return {
        status: "error",
        message: error.toString().replace("Error: ", ""),
      };
    case "INVARIANT_ERROR":
      set.status = 400;
      return {
        status: "error",
        message: error.toString().replace("Error: ", ""),
      };
    case "NOT_FOUND":
      set.status = 404;
      return {
        status: "error",
        message: error.toString().replace("Error: ", ""),
      };
    case "INTERNAL_SERVER_ERROR":
      set.status = 500;
      return {
        status: "error",
        message: "Something went wrong!",
      };
  }
}
