import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Holidays from "./components/Holidays.tsx";


function App() {

    const client = new QueryClient()

    return (
        <>
            <QueryClientProvider client={client}>
                <Holidays/>
            </QueryClientProvider>
        </>
    )
}

export default App
