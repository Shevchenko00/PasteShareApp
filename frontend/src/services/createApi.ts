import { api } from './api.ts'

export const folderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFolder: builder.query<
            {},
            void
        >({
            query: () => "/folder",
            providesTags: ["Folder"],
        }),

        createFolder: builder.mutation<
            void,
            { folder_name: string }
        >({
            query: (body) => ({
                url: "/folder/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Folder"],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetFolderQuery,
    useCreateFolderMutation
} = folderApi;