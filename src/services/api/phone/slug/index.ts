import type { AxiosResponse } from "axios"

import { request } from '@/services/api/index'

import type { Phone } from "@/types"

export const PHONE_SLUG = {
    get(slug: string): Promise<AxiosResponse<Phone>> {
        return request.get(`phones/${slug}/`)
    }
}