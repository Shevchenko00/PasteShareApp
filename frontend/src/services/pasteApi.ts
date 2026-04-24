import { api } from './api.ts'
import type {TimeToDelete} from "@/services/types.ts";


export const pasteApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPaste: builder.query<
            {},
            void
        >({
            query: () => "/paste",
            providesTags: ["Paste"],
        }),

        createPaste: builder.mutation<
            void,
            { title: string, text: string, time_to_delete: TimeToDelete }
        >({
            query: (body) => ({
                url: "/paste/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Paste"],
        }),
    }),
    overrideExisting: false,
})




export const {
    useGetPasteQuery,
    useCreatePasteMutation
} = pasteApi;