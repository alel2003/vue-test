import type { AxiosResponse } from "axios"

import { request } from '@/services/api/index'

import type { Phone } from "@/types"

export const PHONES = {
    get(): Promise<AxiosResponse<Phone[]>> {
        return request.get(`phones/`)
    }
}