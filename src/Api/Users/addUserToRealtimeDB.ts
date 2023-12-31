import { getDatabase, set, ref } from '@firebase/database';

export function addUserToRealtimeDB(
    email: string | null,
    uid: string | null,
    displayName: string | null,
    photoURL: string | null,
    emailVerified: boolean | null,
    Age: number | null = 0
) {
    const db = getDatabase();
    const NewUser = {
        email: email,
        experience: 0,
        id: uid,
        level: 1,
        name: displayName,
        photo: photoURL,
        age: Age,
        emailVerified: emailVerified,
        members: 0,
    };

    set(ref(db, 'users/' + uid + '/'), NewUser);
}
