import Styles from './MiniComponents.module.scss';
import { Subscription } from 'Api/Users/Interaction/Subscription';
import changeUserData from 'Api/Users/changeUserData';
import PlusDarkIcon from 'Assets/Icons/Post/plus-circle-dark.svg';
import PlusIcon from 'Assets/Icons/Post/plus-circle.svg';
import {
    ErrorNotification,
    MassageNotification,
} from 'Components/Notifications/Notifications';
import { WhoWrotePost } from 'Components/ShowPosts/Posts/PostRender';
import { useAuth } from 'Hooks/useAuth';
import { itsMember } from 'Utils/UsersOrTeams/istMember';
import { FC } from 'react';

interface SubscribeButton {
    WhoWrotePost: WhoWrotePost | null;
}

const SubscribeButton: FC<SubscribeButton> = ({ WhoWrotePost }) => {
    const { UserId, UserSubscriptions, UserExperience, UserIsAuth } = useAuth();

    const isMember = itsMember(WhoWrotePost, UserId, UserSubscriptions);
    const isTeam = WhoWrotePost?.id && WhoWrotePost?.id[0] === '-';

    function subbing() {
        if (UserIsAuth) {
            const message = isMember
                ? 'Вы успешно отписались!'
                : 'Вы успешно подписались';

            const NewXp = isMember ? UserExperience - 10 : UserExperience + 10;

            Subscription(
                isTeam ? 'team' : 'user',
                WhoWrotePost?.id,
                UserId,
                isMember ? true : false,
            );

            changeUserData('experience', NewXp, UserId);
            MassageNotification(message);
        } else {
            ErrorNotification('Нужно войти в аккаунт.');
        }
    }

    return (
        <button
            className={Styles.SubButton}
            onClick={(e) => {
                e.stopPropagation();
                subbing();
            }}
        >
            {isMember ? (
                <img src={PlusDarkIcon} alt="" />
            ) : (
                <img src={PlusIcon} alt="" />
            )}
        </button>
    );
};

export default SubscribeButton;
