import { api } from './api.ts'
import type {TimeToDelete} from "@/services/types.ts";



export const pasteApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getPaste: builder.query<
            any,
            void
        >({
            query: () => "/paste",
            providesTags: ["Paste"],
        }),

        createPaste: builder.mutation<
            any,
            { title: string; text: string; time_to_delete: TimeToDelete }
        >({
            query: (body) => ({
                url: "/paste/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Paste"],
        }),
        updatePaste: builder.mutation<
            any,
            {
                id: number;
                title?: string;
                text?: string;
                time_to_delete?: TimeToDelete;
            }
        >({
            query: ({ id, ...body }) => ({
                url: `/paste/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Paste"],
        }),
        getOnePaste: builder.query<
            any,
            string
        >({
            query: (id:string) => ({
                url: `/paste/${id}`,
                method: "GET",
            }),
            providesTags: ["Paste"],
        }),
    }),
    overrideExisting: false,
});


export const {
    useGetOnePasteQuery,
    useGetPasteQuery,
    useCreatePasteMutation,
    useUpdatePasteMutation,
} = pasteApi;