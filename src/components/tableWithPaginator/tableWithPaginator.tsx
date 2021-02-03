import * as React from 'react';
import { useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './tableWithPaginator.scss';

type DataType = {
  id: number;
  name: string;
  score: number;
  time: number;
};
type Props = {
  data: Array<DataType>;
  classTable: string;
  classPaginator: string;
  pageSize: number;
  isPaginatorNeed: boolean;
};

export const TableWithPaginator = ({
  data,
  classTable,
  classPaginator,
  pageSize,
  isPaginatorNeed,
}: Props): JSX.Element => {
  const [alfabetName, setAlfabetName] = React.useState<boolean>(true);
  const [bestScore, setBestScore] = React.useState<boolean>(false);
  const [bestTime, setBestTime] = React.useState<boolean>(false);
  const [state, setState] = React.useState<Array<DataType>>(data);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  useEffect(() => {
    setState(data);
  }, [data]);

  const { t } = useTranslation();
  const indexOfLastTodo = currentPage * pageSize;
  const indexOfFirstTodo = indexOfLastTodo - pageSize;
  const currentTodosInitial = state.slice(indexOfFirstTodo, indexOfLastTodo);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(state.length / pageSize); i++) {
    pageNumbers.push(i);
  }

  const sortColumn = (param: string) => {
    switch (true) {
      case param === 'User Name' || param === 'Имя' || param === 'Імя': {
        if (alfabetName) {
          setAlfabetName(false);
          setState(state.sort((a, b) => a.name.localeCompare(b.name)));
        } else {
          setAlfabetName(true);
          setState(state.sort((a, b) => b.name.localeCompare(a.name)));
        }
        break;
      }
      case param === 'Score' || param === 'Счет' || param === 'Кошт': {
        if (bestScore) {
          setBestScore(false);
          setState(state.sort((a, b) => a.score - b.score));
        } else {
          setBestScore(true);
          setState(state.sort((a, b) => b.score - a.score));
        }
        break;
      }
      case param === 'Time' || param === 'Время' || param === 'Час': {
        if (bestTime) {
          setBestTime(false);
          setState(state.sort((a, b) => a.time - b.time));
        } else {
          setBestTime(true);
          setState(state.sort((a, b) => b.time - a.time));
        }
        break;
      }
      default: {
        setState(state);
      }
    }
  };

  const millisToMinutesAndSeconds = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    if (minutes === 0) return `${seconds < 10 ? 0 : seconds} ${t('raiting.seconds')}`;
    return `${minutes} ${t('raiting.minutes')} ${seconds < 10 ? 0 : seconds} ${t('raiting.seconds')}`;
  };

  return (
    <div>
      <Table className={classTable} striped bordered hover size="sm">
        <thead>
          <tr
            className="table__head"
            onClick={(e: React.MouseEvent<HTMLTableRowElement>) => sortColumn((e.target as HTMLElement).innerText)}
          >
            <th>{t('raiting.place')}</th>
            <th>{t('raiting.name')}</th>
            <th>{t('raiting.score')}</th>
            <th>{t('raiting.time')}</th>
          </tr>
        </thead>
        <tbody>
          {currentTodosInitial.map((r, i) => (
            <tr key={r.id}>
              <td className="table__row">{i + 1}</td>
              <td className="table__row">{r.name}</td>
              <td className="table__row">{r.score}</td>
              <td className="table__row">{millisToMinutesAndSeconds(r.time)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isPaginatorNeed && (
        <Pagination className={classPaginator}>
          <Pagination.Prev
            onClick={() => {
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
            disabled={currentPage === 1}
          />
          {pageNumbers.map((p) => (
            <Pagination.Item
              key={p}
              onClick={(e: React.MouseEvent<HTMLUListElement>) => {
                if ((e.currentTarget as HTMLElement).nodeName === 'A') {
                  setCurrentPage(Number((e.currentTarget as HTMLElement).innerText));
                }
              }}
              active={p === currentPage}
            >
              {p}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => {
              if (currentPage < pageNumbers.length) setCurrentPage(currentPage + 1);
            }}
            disabled={currentPage === pageNumbers.length}
          />
        </Pagination>
      )}
    </div>
  );
};
