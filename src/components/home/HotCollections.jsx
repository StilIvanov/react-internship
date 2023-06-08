import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../reactslick.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotCollections = () => {
  const [hotCollectionsItems, sethotCollectionsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    sethotCollectionsItems(data);
  }

  useEffect(() => {
    fetchHotCollections();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-delay="500"
        className="container"
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {hotCollectionsItems.map((item) => (
              <div className="" key={item.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      {isLoading ? (
                        <Skeleton height={200} width={300} />
                      ) : (
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      )}
                    </Link>
                  </div>
                  {isLoading ? (
                    <Skeleton circle width={50} height={50} />
                  ) : (
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                  )}
                  {isLoading ? (
                    <Skeleton width={100}/>
                  ) : (
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-192</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
