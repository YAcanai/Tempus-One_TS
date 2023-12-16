import { OpenTeamType } from 'Types/TypesOfData/TeamOrUser/OpenTeamType';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';
import PlusIcon from 'Assets/Icons/Post/plus-circle.svg';
import UserIcon from 'Assets/Icons/Header/user.svg';
import Styles from './Styles.module.scss';
import { useNavigate } from 'react-router-dom';

export default function ShowUserOrTeam({
    Team,
    User,
}: {
    Team?: OpenTeamType;
    User?: OpenUserType;
}) {
    const navigate = useNavigate();

    if (User) {
        return (
            <div
                className={Styles.Obj}
                onClick={() => navigate('/User/' + User.id)}
            >
                <div className={Styles.Data}>
                    <div className={Styles.Photo}>
                        <img src={User.photo || UserIcon} alt="" />
                    </div>
                    <div className={Styles.Text}>
                        <div className={Styles.Title}>{User.name}</div>
                        <div className={Styles.Members}>
                            {User.members.length | 0} подписчиков
                        </div>
                    </div>
                </div>
                <div className={Styles.Activity}>
                    <button className={Styles.SubButton}>
                        <img src={PlusIcon} alt="" />
                    </button>
                </div>
            </div>
        );
    } else if (Team) {
        return (
            <div
                className={Styles.Obj}
                onClick={() => navigate('/Team/' + Team.id)}
            >
                <div className={Styles.Data}>
                    <div className={Styles.Photo}>
                        <img src={Team.image} alt="" />
                    </div>
                    <div className={Styles.Text}>
                        <div className={Styles.Title}>{Team.title}</div>
                        <div className={Styles.Members}>
                            {Object.values(Team.members).length | 0} подписчиков
                        </div>
                    </div>
                </div>
                <div className={Styles.Activity}>
                    <button className={Styles.SubButton}>
                        <img src={PlusIcon} alt="" />
                    </button>
                </div>
            </div>
        );
    }
}