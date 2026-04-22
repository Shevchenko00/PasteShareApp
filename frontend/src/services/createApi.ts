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
});

export const fileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFile: builder.query<
            {},
            void
        >({
            query: () => "/file",
            providesTags: ["File"],
        }),

        createFile: builder.mutation<
            void,
            { file_name: string }
        >({
            query: (body) => ({
                url: "/file/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["File"],
        }),
    }),
    overrideExisting: false,
})


export const {
    useGetFolderQuery,
    useCreateFolderMutation
} = folderApi;

export const {
    useGetFileQuery,
    useCreateFileMutation
} = fileApi;