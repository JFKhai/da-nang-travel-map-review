import { Props } from "./types/type";

export default async function DetailPage({params} : Props) {
  const {id} = await params;
  return (
    <div>
      <h1>Trang Chi Tiết (Thiện làm) id : {id}</h1>
    </div>
  )
}
