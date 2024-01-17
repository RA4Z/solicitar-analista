import { database } from "config/firebase";
import { push, ref, set, serverTimestamp, child } from "firebase/database";

export async function sugerir(texto: string) {
    const id = push(child(ref(database), 'sugerir')).key
    set(ref(database, `sugerir/${id}`), {
        texto: texto, timestamp: serverTimestamp()
    })
}