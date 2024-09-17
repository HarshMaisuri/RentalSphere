import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import LoadingSpinner from "../../assets/LoadingSpinner";
import { sampleCommunityData } from "../../Utils/SampleData";
import useAppContext from "../../hooks/useAppContext";
import useAuth from "../../hooks/useAuth";

const CommunityPostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { singlePost, setSinglePost } = useAppContext();

  const fetchPostDetails = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(`http://localhost:8080/api/v1/marketplace/post/${id}`, { headers })
      .then((res) => setSinglePost(res.data.post))
      .catch((err) => console.log(err))
      .finally(setIsLoading(false));
  };

  useEffect(() => {
    if (!singlePost || singlePost.id !== id) {
      fetchPostDetails();
    }
  }, [auth, navigate]);

  const handleContactClick = () => {};

  return (
    <>
      {isLoading ? (
        <div className="loadingCont flex justify-center items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : (
        singlePost &&
        singlePost.id && (
          <div className="flex gap-10 mx-auto justify-center mt-10">
            <div className="w-[40%]">
              <img className="object-cover" src={singlePost.imageUrl} />
            </div>

            <div className="w-[40%]">
              <div>
                <h2 className="font-bold text-[22px]">{singlePost.title}</h2>
                <p>{singlePost.description}</p>
              </div>

              <div>
                <h2 className="text-[20px] mt-6">Availability</h2>
                <p>{singlePost.availabilityStatus}</p>
              </div>

              <div className="flex gap-10">
                <div>
                  <h2 className="text-[20px] mt-6">Contact</h2>
                  <p>{singlePost.tenantPhone}</p>
                </div>
                <div>
                  <h2 className="text-[20px] mt-6">Email</h2>
                  <p>{singlePost.tenantEmail}</p>
                </div>
              </div>
              <div>
                <h2 className="text-[20px] mt-6">Price</h2>
                <p className="font-bold text-[22px]">$ {singlePost.price}</p>
              </div>

              <Link
                className="mt-6 w-[50%] card bg-green-700 text-white py-2 text-center font-semibold capitalize rounded-md"
                to={`mailto:${singlePost.tenantEmail}`}
              >
                Send Enquiry
              </Link>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default CommunityPostDetails;
