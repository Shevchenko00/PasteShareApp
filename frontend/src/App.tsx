import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import styles from "./App.module.scss";
import PlusButton from "@/components/PlusButton/PlusButton.tsx";
function App() {

  return (
    <>
        <div className={styles.page}>
            <Header />
            <main className={styles.content}>
            </main>

            <PlusButton />

            <footer className={styles.footer} />
            <Footer />
        </div>


    </>
  )
}

export default App
