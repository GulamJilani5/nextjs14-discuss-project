import { redirect } from "next/navigation";
import PostList from "@/components/posts/post-list";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";


interface SearchPageProps{
    searchParams: {
        term: string;
    }
}
export default function SearchPage({searchParams}:SearchPageProps) {
    const {term} = searchParams;

    return <div>
         <PostList fetchData = {()=>fetchPostsBySearchTerm(term)} />
    </div>
}