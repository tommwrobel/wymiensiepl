import { useGetStatisticsQuery } from "../../api/statisticsApi";
import { useGetUsersQuery, useLazyGetUsersQuery } from "../../api/usersApi";
import { selectAuthUser, selectIsLoggedUser } from "../../features/authSlice";
import useAppSelector from "../../hooks/useAppSelector";
import { RootState, store } from "../../store/store";

const TestPage = (): JSX.Element => {

    const isLoggedUser = useAppSelector(selectIsLoggedUser);
    const user = useAppSelector(selectAuthUser);

    const [trigger, request] = useLazyGetUsersQuery();
    const stats = useGetStatisticsQuery();

    return <>
      <button onClick={() => trigger()}>PERFORM</button>
      {isLoggedUser ? "logged!" : "nope"}
      <pre>{JSON.stringify(stats.data, null, 4)}</pre>
      {request.isSuccess && <pre>{JSON.stringify(request.data, null, 4)}</pre>}
    </>;
};

export default TestPage;
