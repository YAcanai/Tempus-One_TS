import { getDatabase, ref, onValue } from 'firebase/database';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';

export function getAllUsers() {
    const db = getDatabase();
    return new Promise<OpenUserType[]>((resolve, reject) => {
        onValue(
            ref(db, 'users/'),
            (snapshot) => {
                if (snapshot.exists()) {
                    resolve(Object.values(snapshot.val()));
                } else {
                    console.error('Пользователи не были получены.');
                    reject(null);
                }
            },
            {
                onlyOnce: true,
            }
        );
    });
}
