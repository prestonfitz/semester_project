import type {Result} from './types.ts'

export async function fetchJsonUnknown(url: string): Promise<Result<unknown>> {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            return {ok: false, error: {type: 'http', status: response.status, statusText: response.statusText}}
        }

        try {
            const data: unknown = await response.json()
            return {ok: true, data}
        } catch (e) {
            return {ok: false, error: {type: 'parse', message: String(e)}}
        }
    } catch (e) {
        return {ok: false, error: {type: 'network', message: String(e)}}
    }
}