import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import useAppContext from "../../hooks/useAppContext.jsx";
import { sampleCommunityData } from "../../Utils/SampleData";
import LoadingSpinner from "../../assets/LoadingSpinner";
const POSTS_URL = "http://localhost:8080/api/v1/marketplace/post/";

const TenantCommunity = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  // const { singlePost, setSinglePost } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  // const [posts, setPosts] = useState(sampleCommunityData);
  const [posts, setPosts] = useState([]);
  // const [singlePost, setSinglePost] = useState({});

  const loadPosts = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(POSTS_URL, { headers })
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handlePostClick = (data) => {
    // setSinglePost(data);

    // if (singlePost && singlePost.id) {
    const url = `${"/tenantdashboard/community/"}${data.id}`;
    navigate(url);
    // }
  };

  useEffect(() => {
    loadPosts();
  }, [auth, navigate]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-[22px]">Community</h1>
        <button
          onClick={() => navigate("/tenantdashboard/community/new-post")}
          className="bg-green-700 text-white tracking-wider rounded-full px-10 py-2 self-start"
        >
          Add post
        </button>
      </div>

      {isLoading ? (
        <div className="loadingCont flex justify-center items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : (
        // : posts.length == 0 ? (
        // <div>No Data Found</div>
        // )
        <div className="flex flex-wrap gap-6">
          {posts &&
            posts.map((data, index) => (
              <div
                className="w-[25%] mt-6 card card-compact bg-base-100 shadow-xl"
                key={index}
              >
                {/* <Link to={`/tenantdashboard/community/${data.id}`}> */}
                <div className="">
                  <img
                    className="h-[200px] w-full object-cover "
                    src={data.imageUrl}
                  />
                  <div className="card-body">
                    <h2 className="card-title">{data.name}</h2>
                    <p>{data.description}</p>
                    <div className="flex justify-between items-center card-actions">
                      <h2 className="font-bold text-[22px]">$ {data?.price}</h2>
                      <button
                        onClick={() => handlePostClick(data)}
                        className="bg-green-700 text-white tracking-wider rounded-full px-10 py-2"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default TenantCommunity;
