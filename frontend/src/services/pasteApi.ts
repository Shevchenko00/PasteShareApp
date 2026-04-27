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

        // 🔥 UPDATE
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
    }),
    overrideExisting: false,
});


export const {
    useGetPasteQuery,
    useCreatePasteMutation,
    useUpdatePasteMutation,
} = pasteApi;