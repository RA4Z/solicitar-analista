import { db } from 'config/firebase';
import { addDoc, collection } from 'firebase/firestore';

export async function salvarSolicitacao(data: any) {
    try {
        const result = await addDoc(collection(db, 'trabalhos'), data)
        return result.id
    } catch (error) {
        console.log('Erro add service:', error)
        return 'erro'
    }
}

