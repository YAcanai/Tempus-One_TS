import { ModsOfWritePost } from 'Utils/ModsOfComps';
import Styles from '../Styles.module.scss';
import FeatherIcon from 'feather-icons-react';
import { useState } from 'react';
import FullDataModal from '../Modals/FullScreenModal';
import ModalAddNewMode from '../Modals/SelectModal';
import ControlBlockRender from './ControlBlockRender';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useWritePost } from 'Hooks/useWritePost';
import { setSelectMode } from 'Store/slices/WritePost/WritePostSlice';
import { BlockOfPostType } from 'Types/TypesOfData/Post/WritePost';

export const ControlBlocksPanel = () => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const dispatch = useAppDispatch();
    const [isModalFullOpen, setIsModalFullOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [selectBlockForModal, setSelectBlockForModal] =
        useState<BlockOfPostType>();

    function openMod(blockData: { type: string; id: number }) {
        if (blockData.type === ModsOfWritePost.text) {
            document
                .getElementById('topBlock')
                ?.classList.add(Styles.closeTopBlock);
            setTimeout(() => {
                dispatch(
                    setSelectMode({ type: blockData.type, id: blockData.id })
                );
            }, 300);
        } else {
            dispatch(setSelectMode({ type: blockData.type, id: blockData.id }));
        }
    }

    return (
        <>
            {isModalFullOpen && (
                <FullDataModal
                    setIsModalOpen={setIsModalFullOpen}
                    ResultObject={selectBlockForModal}
                ></FullDataModal>
            )}
            {isModalAddOpen && (
                <ModalAddNewMode
                    setIsModalOpen={setIsModalAddOpen}
                ></ModalAddNewMode>
            )}

            <div className={Styles.ControlPanel}>
                {BlocksOfPost.map((blockData) => (
                    <ControlBlockRender
                        key={blockData.id}
                        blockData={blockData}
                        openMod={openMod}
                        setIsModalOpen={setIsModalFullOpen}
                        SelectMode={selectMode}
                        setSelectBlockForModal={setSelectBlockForModal}
                    />
                ))}
                <button
                    className={Styles.ButtonAdd}
                    onClick={() => {
                        setIsModalAddOpen(true);
                    }}
                >
                    <FeatherIcon icon="plus" className={Styles.Img} />
                </button>
            </div>
        </>
    );
};
