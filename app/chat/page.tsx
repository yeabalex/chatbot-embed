import { ChatWidget } from "@/components/ChatWidget/ChatWidget"
import { Suspense } from "react"


export default function ChatUI() {
    return (
    <Suspense fallback={<h1>Loading...</h1>}>    
        <ChatWidget/>
    </Suspense>    
    )
}