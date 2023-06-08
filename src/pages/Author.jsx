import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Author = () => {
  const { authorId } = useParams();

  const [authorData, setAuthorData] = useState([]);
  const [followers, setFollowers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAuthor() {
    const { data } =
      await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}
    `);
    setAuthorData(data);
  }

  function followButton() {
    setFollowers((prev) => !prev);
  }

  useEffect(() => {
    fetchAuthor();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    window.scrollTo(0, 0);
  }, []);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <div
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        data-aos-delay="500"
                        className="profile_avatar"
                      >
                        <img src={authorData.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div data-aos="fade-right" className="profile_name">
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">
                              {authorData.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorData.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    )}
                  </div>

                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <div
                      className="de-flex-col"
                      data-aos="fade-left"
                      data-aos-duration="1000"
                      data-aos-delay="500"
                    >
                      <div className="profile_follower">
                        {followers
                          ? `${authorData.followers + 1} followers`
                          : `${authorData.followers} followers`}
                      </div>

                      <Link to="#" className="btn-main" onClick={followButton}>
                        {followers ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    isLoading={isLoading}
                    authorId={authorData.authorId}
                    nftCollection={authorData.nftCollection}
                    authorImage={authorData.authorImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
