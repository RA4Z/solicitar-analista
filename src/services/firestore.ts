import { db } from 'config/firebase';
import { addDoc, collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';

export async function salvarSolicitacao(data: any) {
    try {
        const result = await addDoc(collection(db, 'trabalhos'), data)
        return result.id
    } catch (error) {
        console.log('Erro add service:', error)
        return 'erro'
    }
}

export async function visualizarSolicitacoes(setSolicitacoes: any) {
    const ref = query(collection(db, "trabalhos"))
    onSnapshot(ref, (querySnapshot) => {
        const posts: any[] = []
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() })
        })
        setSolicitacoes(posts)
    })
}

export async function infoProjeto(projetoID: any, setProjeto: any) {
    try {
        const ref = (await getDoc(doc(db, 'trabalhos', projetoID))).data()
        setProjeto(ref)
        return 'ok'
    }
    catch (error) {
        console.log(error)
        return 'error'
    }
}
