import Styles from '../Modal.module.scss';
import { CloseModal } from '../isModal';
import { getUserFromId } from 'Api/Users/getData/getUserDataFromId';
import FakeComment from 'Components/FakeData/FakeComment';
import ShowLogo from 'Components/MiniComponents/ShowLogo';
import { Comments } from 'Types/TypesOfData/Post/Comments';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';
import formatTimeAgo from 'Utils/Posts/FormatTimeAgo';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface comment {
    comment: Comments;
}

const CommentRender: FC<comment> = ({ comment }) => {
    const [commentator, setCommentator] = useState<OpenUserType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserFromId(comment.CommentatorId).then((user) =>
            setCommentator(user),
        );
    }, []);

    if (commentator) {
        return (
            <div className={Styles.comment}>
                <div
                    className={Styles.author}
                    onClick={() => {
                        navigate('/User/' + commentator.id);
                        CloseModal();
                    }}
                >
                    <div className={Styles.Photo}>
                        <ShowLogo ImageUrl={commentator.photo}></ShowLogo>
                    </div>
                    <div className={Styles.Data}>
                        {commentator.name} {commentator.level}
                        <div className={Styles.commentText}>
                            {comment.CommentText}
                        </div>
                        <div className={Styles.date}>
                            {formatTimeAgo(comment.CommentDate)}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <FakeComment></FakeComment>;
    }
};

export default CommentRender;
