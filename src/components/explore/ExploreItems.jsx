import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from "../UI/Countdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExploreItems = () => {
  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(8);

  const [isLoading, setIsLoading] = useState(true);

  const showMore = () => {
    setVisible((preValue) => preValue + 4);
  };

  async function fetchExplorePage() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setData(data);
  }

  useEffect(() => {
    fetchExplorePage();
    setTimeout(() => {
      setIsLoading(false);
    }, 3700);
  }, []);

  // Filter nft's

  async function filterNfts(filter) {
    if (filter === "") {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
      );
      setData(data);
    }

    if (filter === "price_low_to_high") {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high`
      );
      setData(data);
    }

    if (filter === "price_high_to_low") {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low`
      );
      setData(data);
    }

    if (filter === "likes_high_to_low") {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`
      );
      setData(data);
    }

  }

  return (
    <>
      <div data-aos="fade-right" data-aos-duration="1000" data-aos-delay="1500">
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterNfts(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {data.slice(0, visible).map((item) => (
        <div
          data-aos="zoom-in"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-once="false"
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            {isLoading ? (
              <Skeleton circle width={50} height={50} />
            ) : (
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
            )}

            {isLoading ? (
              <Skeleton />
            ) : (
              <Countdown expiryDate={item.expiryDate} />
            )}
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`}>
                {isLoading ? (
                  <Skeleton height={300} />
                ) : (
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                )}
              </Link>
            </div>
            {isLoading ? (
              <Skeleton />
            ) : (
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={showMore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
