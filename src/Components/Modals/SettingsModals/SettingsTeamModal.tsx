import Styles from '../Modal.module.scss';
import { CloseModal, IsModal } from '../isModal';
import changeTeamData from 'Api/Teams/ChangeTeamData';
import ButtonVoid from 'Components/MiniComponents/button';
import CustomInput from 'Components/MiniComponents/input';
import { OpenTeamType } from 'Types/TypesOfData/TeamOrUser/OpenTeamType';
import { handleImageUpload } from 'Utils/Handlers/HandlerImageUpload';
import { FC, useState } from 'react';

interface SettingsTeamModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    team: OpenTeamType;
}

const SettingsTeamModal: FC<SettingsTeamModal> = ({ setModalOpen, team }) => {
    const [teamPhoto, setTeamPhoto] = useState('');
    const [teamTitle, setTeamTitle] = useState('');
    const [teamDesc, setTeamDesc] = useState('');

    function ChangeFunction() {
        if (teamPhoto !== '') {
            changeTeamData('image', teamPhoto, team.id);
        }
        if (teamTitle !== '') {
            changeTeamData('title', teamTitle, team.id);
        }
        if (teamDesc !== '') {
            changeTeamData('desc', teamDesc, team.id);
        }
        CloseModal();
    }

    return (
        <IsModal title="Настройки" setModalOpen={setModalOpen}>
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleImageUpload(e, setTeamPhoto)}
            />
            <CustomInput
                placeholder="Название"
                mode="large"
                changeFunction={(e) => {
                    setTeamTitle(e.currentTarget.value);
                }}
            ></CustomInput>
            <CustomInput
                placeholder="Описание"
                mode="large"
                changeFunction={(e) => {
                    setTeamDesc(e.currentTarget.value);
                }}
            ></CustomInput>
            <ButtonVoid
                clickHandler={ChangeFunction}
                title="Применить"
                classes={Styles.ButtonModal}
                padding={false}
            ></ButtonVoid>
        </IsModal>
    );
};

export default SettingsTeamModal;
