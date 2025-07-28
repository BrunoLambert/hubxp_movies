type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface PrepareRequestType {
    method: RequestMethod,
    prefix: string
    data?: Object
}