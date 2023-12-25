import { FC, useEffect, useState } from 'react';
import IsModal from '../isModal';
import Styles from '../Modal.module.scss';
import SendIcon from 'Assets/Icons/Post/message.svg';
import { getComments } from 'Api/Posts/Activities/getComments';
import CommentRender from './CommentRender';
import { Comments } from 'Types/TypesOfData/Post/Comments';
import { useAuth } from 'Hooks/useAuth';
import { addNewComment } from 'Api/Posts/Activities/addNewComment';

interface CommentsModalProps {
    PostId: string;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentsModal: FC<CommentsModalProps> = ({ setModalOpen, PostId }) => {
    const { UserId } = useAuth();
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comments[] | string>(
        'Комментариев еще нет.'
    );

    function getCommentsThis() {
        getComments(PostId)
            .then((comments) => setComments(comments))
            .catch(() => setComments('Комментариев еще нет.'));
    }

    useEffect(() => {
        getCommentsThis();
    }, []);

    const sendComment = () => {
        const ToDay = new Date().getTime();
        if (commentText) {
            const NewComment = {
                CommentatorId: UserId,
                CommentText: commentText,
                CommentDate: ToDay,
            };
            addNewComment(NewComment, PostId);
            getCommentsThis();
            setCommentText('');
        }
    };

    return (
        <IsModal title={'Комментарии'} setModalOpen={setModalOpen}>
            <div className={Styles.Comments}>
                {Array.isArray(comments) &&
                    comments.map((comment) => (
                        <CommentRender
                            key={comment.CommentId}
                            comment={comment}
                        />
                    ))}
            </div>

            <div className={Styles.Input}>
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Новый комментарий"
                />
                <button onClick={() => sendComment()}>
                    <img src={SendIcon} alt="" />
                </button>
            </div>
        </IsModal>
    );
};
export default CommentsModal;