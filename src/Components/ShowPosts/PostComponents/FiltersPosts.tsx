import { FC, useEffect, useState } from 'react';
import Styles from '../Posts/Styles.module.scss';
import { Post } from 'Types/TypesOfData/Post/Post';
import { getPosts } from 'Api/Posts/getAllPosts';
import { setLastPostKey } from 'Store/slices/PostsSlice';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { useHeader } from 'Hooks/useHeader';

interface FiltersProps {
    setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
    filter?: string;
}

const FiltersPost: FC<FiltersProps> = ({ setPosts, filter }) => {
    const [Filter, setFilter] = useState<string | string[] | undefined | null>(
        filter
    );
    const { UserSubscriptions, UserId } = useAuth();
    const { HeaderSearchBar } = useHeader();
    const dispatch = useAppDispatch();

    function getPostsDefault(
        filter:
            | string
            | undefined
            | null
            | string[]
            | { orderBy: string; equalTo: string | undefined }
    ) {
        getPosts(filter || null)
            .then((posts) => {
                setPosts(posts);
                dispatch(setLastPostKey(Object.keys(posts).pop()));
            })
            .catch(() => {
                ErrorNotification('Посты не найдены.');
            });
    }

    useEffect(() => {
        getPostsDefault(Filter);
    }, [Filter]);

    useEffect(() => {
        if (HeaderSearchBar !== '') {
            getPostsDefault({ orderBy: 'PostTitle', equalTo: HeaderSearchBar });
        }
    }, [HeaderSearchBar]);

    const teams =
        (UserSubscriptions?.teams && Object.values(UserSubscriptions?.teams)) ||
        [];
    const users =
        (UserSubscriptions?.users && Object.values(UserSubscriptions?.users)) ||
        [];
    const FilterInteresting = (UserSubscriptions?.teams ||
        UserSubscriptions?.users) && [...teams, ...users];

    return (
        <div className={Styles.Filters}>
            <button
                className={Styles.Filter}
                onClick={() => {
                    setFilter('');
                }}
            >
                Все посты
            </button>
            <button
                className={Styles.Filter}
                onClick={() => {
                    setFilter(FilterInteresting);
                }}
            >
                Интересное
            </button>
            <button
                className={Styles.Filter}
                onClick={() => {
                    setFilter(UserId);
                }}
            >
                Только Мои
            </button>
        </div>
    );
};
export default FiltersPost;
