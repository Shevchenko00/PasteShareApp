import PlusButton from "@/components/PlusButton/PlusButton.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import Header from "@/components/Header/Header.tsx";
import PasteItems from "@/components/PasteItems/PasteItems";
import { useGetPasteQuery } from "@/services/pasteApi.ts";
import {useAuth} from "@/hooks/useAuth.ts";

const RootPage = () => {
    const {
        data: pastes,
        isLoading,
        isError,
        error
    } = useGetPasteQuery();
    const { user, isAuth } = useAuth()
    return (
        <>
            <Header />

            <main style={{ padding: "24px" }}>
                {isLoading && <p>Loading...</p>}

                {isError && (
                    <p style={{ color: "red" }}>
                        Loading error
                    </p>
                )}

                {!isLoading && !isError && pastes && (
                    <PasteItems pastes={pastes} />
                )}
            </main>

            <PlusButton />
            <Footer />
        </>
    );
};

export default RootPage;