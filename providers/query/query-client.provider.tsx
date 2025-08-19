import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useReactQueryDevTools } from '@dev-plugins/react-query';


export default function QueryProvider({children}: {children:ReactNode}) {
    const queryClient = new QueryClient();
    useReactQueryDevTools(queryClient);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}