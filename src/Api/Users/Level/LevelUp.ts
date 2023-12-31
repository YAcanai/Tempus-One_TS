/* eslint-disable import/order */
import { getDatabase, ref, set } from '@firebase/database';
import MaxXpToNextLevel from 'Utils/UsersOrTeams/MaxXpToNextLevel';

export default function LevelUP(
    UserId: string | null,
    level: number | null,
    experience: number | null,
) {
    const db = getDatabase();
    if (level && experience) {
        const NextLevel = level + 1;
        const NextExperience = experience - MaxXpToNextLevel(level);

        const levelRef = ref(db, 'users/' + UserId + '/level/');
        const experienceRef = ref(db, 'users/' + UserId + '/experience/');

        set(levelRef, NextLevel);
        set(experienceRef, NextExperience);
    }
}
