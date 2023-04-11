import React from 'react';
import Categories from '../components/Categories';
import PizzaBLock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategory, selectFilter, setCategoryId } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const { sort, searchValue } = useSelector(selectFilter);

  const categoryId = useSelector(selectCategory);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = items.map((obj: any) => <PizzaBLock key={obj.id} {...obj} />);

  const getPizzas = async () => {
    const sortBy = sort.sortProperty;
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    dispatch(
      fetchPizzas({
        search,
        sortBy,
        category,
      }),
    );
  };

  React.useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className='content__items'> {status === 'loading' ? skeletons : pizzas}</div>
      )}
    </div>
  );
};

export default Home;
