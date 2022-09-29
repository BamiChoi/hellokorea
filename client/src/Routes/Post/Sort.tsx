import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface ISort {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

interface ISortForm {
  sort: string;
}

function Sort({ sort, setSort }: ISort) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ISortForm>();
  const onChangeSort = (value: string) => {
    navigate(`?sort=${value}`);
    setSort(value);
  };
  useEffect(() => {
    setValue("sort", sort);
  }, [setValue, sort]);
  return (
    <form>
      <select
        {...register("sort", { onChange: (e) => onChangeSort(e.target.value) })}
      >
        <option value="new">최신순</option>
        <option value="vote">추천순</option>
        <option value="view">조회순</option>
      </select>
    </form>
  );
}

export default Sort;
