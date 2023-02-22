import { useContext, useEffect, useState } from "react";
import { useGetUserTransactionsQuery } from "../../api/transactionsApi";
import PageSection from "../../components/PageSection/PageSection";
import { AuthContext } from "../../context/AuthContext";
import { Transaction } from "../../models/app.models";

const ExchangesPage = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const userTransactionsQuery = useGetUserTransactionsQuery({ userId: user?.id as string });

  useEffect(() => {
    if (userTransactionsQuery.isSuccess && userTransactionsQuery.data) {
      setTransactions(userTransactionsQuery.data);
      console.log(userTransactionsQuery.data)
    }
  }, [userTransactionsQuery.isSuccess, userTransactionsQuery.data])

  return (
    <PageSection>
      {transactions.map(t => JSON.stringify(t,null,'\t'))}
    </PageSection>
  );
}

export default ExchangesPage;