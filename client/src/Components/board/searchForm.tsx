import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface ISearchForm {
  keyword: string;
  target: string;
}

function SearchForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ISearchForm>();
  const isValidKeyword = async (data: ISearchForm) => {
    const { keyword, target } = data;
    navigate(`search?keyword=${keyword}&target=${target}`);
  };
  return (
    <form
      className="space-x-2 flex justify-center w-auto items-end h-8"
      onSubmit={handleSubmit(isValidKeyword)}
    >
      <select
        className="border-2 border-main h-full px-1"
        {...register("target", {
          required: "target is required",
        })}
      >
        <option value="title">제목</option>
        <option value="writer">작성자</option>
        <option value="content">내용</option>
      </select>
      <input
        className="border-2 border-main h-full px-2"
        type="text"
        aria-placeholder="이 게시판에서 검색"
        placeholder="이 게시판에서 검색"
        {...register("keyword", {
          required: "Keyword is required",
        })}
      />
      <button className="bg-main text-white h-full px-4 rounded-md">
        검색
      </button>
    </form>
  );
}

export default SearchForm;
