'use server'

import axios from "axios"
import { PrepareRequestType } from "../types/ApiTypes"

const BASE_URL = "https://api.themoviedb.org/3"
const AUTH_BEARER = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTNhYmExZDY2MDk3MTZlYmY1NzFlMmE1ZmI5YmVkYSIsIm5iZiI6MTc1MzYyODkzNy44Miwic3ViIjoiNjg4NjQxMDk4MDk3MWE3M2EzNTJiMGYxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KgxqTFRZ8LkS_60yqnoM4YkALz8I32rI_WhqThf9L6s"

const ApiInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${AUTH_BEARER}`
    }
})

export const prepareRequest = async ({ method, prefix, data }: PrepareRequestType) => {
    return ApiInstance.request({
        method,
        url: prefix,
        params: data
    })
}
