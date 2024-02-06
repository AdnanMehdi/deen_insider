//react states//
import { useEffect, useState } from "react";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Popup from "@layouts/components/Popup";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaRegCalendar } from "react-icons/fa";
import { getSearchValue } from "@layouts/partials/Header";
import GoogleBar from "@layouts/partials/GoogleBar";
const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  dataArray,
  fkingSearch,
  recent_posts,
  categories,
  promotion,
}) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;

  //state for search result//
  const [model,setModel] = useState(false)
  const [detail,setDetail] = useState()
  // // state for category//
  // const [post,setPost] = useState("all")
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const post = searchParams.get('category')

  // console.log(dataArray)

  useEffect(()=>{
  },[post,search,model])

  
  // console.log(fkingSearch,'seacrhc')

  return (
    <Base>
      {/* Home main */}
      <section>
        <div className="container">
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 lg">
              {/* Recent posts */}
              
                <div className="section">
                  {/* {markdownify(featured_posts.title, "h2", "flex justify-center items-center section-title")} */}
                  <div className={`flex ${model ? 'grid grid-cols-2 gap-4': 'w-full'}`}>
                    <div className={`${model ? "columns-2 gap-2" : "columns-2 gap-2  lg:gap-3 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8"} `}>
                      
                          {dataArray.filter((item)=>{
                            return item?.type === post ? search.toLowerCase() === '' ? item : item.tags?.toLowerCase().includes(search) 
                            : post === "All" ? search.toLowerCase() === '' ? item : item.tags?.toLowerCase().includes(search) :""
                          }).map(item=>{
                            return(
                              <div key={item._id} onClick={()=>{setModel(true),setDetail(item)}} class="break-inside-avoid cursor-pointer transform transition duration-500 
                              hover:scale-110">
                                {item.status === "approved" ?
                                <div >
                                    {item.banner ? 
                                    <img className="h-auto max-w-full rounded-lg" src={item.banner} alt=""/>
                                    : <> {item.link ? <img className="h-auto max-w-full rounded-lg" 
                                    src={`https://img.youtube.com/vi/${item.link.slice(32)}/hqdefault.jpg`} alt=""/>
                                  : <img className="h-auto max-w-full rounded-lg" src={item.mediaUrl} alt=""/>}
                                   </> }
                                  <div>
                                    <figcaption class="mt-2 font-bold pb-1">{item.title}</figcaption>
                                    {item.content ? 
                                      <p className="text-sm line-clamp-2 pb-2">{item.content.slice(0,75)}...</p>
                                    : ""}
                                  </div>
                                  </div>
                                : null}
                              </div>
                            )
                          })}
                    </div>
                    <GoogleBar post={detail} model={model} setModel={setModel}/>
                    
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  // const fkingSearch = getSearchValue()
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");
  const res = await fetch(`http://localhost:3000/api/blog`)
  const data = await res.json()
  const res1 = await fetch(`http://localhost:3000/api/video`)
  const data1 = await res1.json()
  const res2 = await fetch(`http://localhost:3000/api/photo`)
  const data2 = await res2.json()
  const allData = data.concat(data1,data2)
  // Randomize array....//
  const shuffle = array => {
    return array.sort(() => Math.random() - 0.5)
  }
  const shuffledArray = shuffle(allData)

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categoriesWithPostsCount,
      dataArray:shuffledArray,
      // fkingSearch:fkingSearch
    },
  };
};
