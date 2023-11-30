import { db } from 'config/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore';

export async function salvarSolicitacao(data: any) {
    try {
        const result = await addDoc(collection(db, 'trabalhos'), data)
        return result.id
    } catch (error) {
        console.log(error)
        return 'erro'
    }
}

export async function visualizarSolicitacoes(setSolicitacoes: any, setBackup?: any) {
    const ref = query(collection(db, "trabalhos"))
    onSnapshot(ref, (querySnapshot) => {
        const posts: any[] = []
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() })
        })
        setSolicitacoes(posts)
        if (setBackup) setBackup(posts)
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

export async function atualizarProjeto(projetoID: any, data: any) {
    try {
        const postRef = doc(db, "trabalhos", projetoID);
        await updateDoc(postRef, data)
        return 'ok'
    }
    catch (error) {
        console.log(error)
        return 'error'
    }
}

export async function deletarProjeto(projetoID: any) {
    try {
        const postRef = doc(db, "trabalhos", projetoID);
        await deleteDoc(postRef)
        return 'ok'
    }
    catch (error) {
        console.log(error)
        return 'error'
    }
}
