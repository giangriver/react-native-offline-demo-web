export class ApiResponse {
    message: string | undefined;
    responseData: any;
    status: string | undefined;
    timeStamp: Date | undefined;
    violations: [Violations] | undefined;
}

export class Violations {
    code: string | undefined;
    message: string | undefined;
    uimessage: string | undefined;
}
