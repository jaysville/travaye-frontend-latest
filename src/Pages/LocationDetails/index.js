import Maryland from "../../assets/mm-ticket-prices.png";
import Avatar from "../../assets/user-avatar.png";
import { AltButton, Button } from "../../components/UI/Buttons";
import classes from "./LocationDetails.module.css";

import { notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/UI/Loader";
import { FiveStars, FourStars } from "../../components/UI/svgs/svgs";
import {
  useAddLocationToLikedLocationsMutation,
  useGetLocationByIdQuery,
} from "../../redux/Api/locationApi";

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState({});
  const [addLocationToLikedLocations] =
    useAddLocationToLikedLocationsMutation();

  const { data, isError, error, isLoading } = useGetLocationByIdQuery({ id });
  useEffect(() => {
    if (data) {
      setLocation(data);
    }
    if (isError) {
      notification.error({
        message: error?.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [data, error?.error, isError]);

  const handleAddClick = () => {
    if (location?.locationName) {
      addLocationToLikedLocations({ locationName: location.locationName })
        .unwrap()
        .then((res) =>
          notification.success({
            message: "Liked",
            duration: 3,
            placement: "bottomRight",
          })
        )
        .catch((err) => {
          notification.error({
            message: err.data.error,
            duration: 3,
            placement: "bottomRight",
          });
        });
    } else {
      // Handle the case where location?.locationName is undefined
      console.error("Location name is undefined");
    }
  };
  return (
    <div className={classes.location}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="row">
            <div className="col-md-6">
              <figure>
                <img
                  src={
                    location.locationImagePath
                      ? location.locationImagePath[0]
                      : Maryland
                  }
                  alt="poster"
                />
                <figcaption>
                  Please scroll/swipe to see additional images
                </figcaption>
              </figure>
            </div>
            <div className={`col-md-6 ${classes.details}`}>
              <div>
                <h4>{location.locationName}</h4>
                <h6>{location.locationAddress}</h6>
              </div>

              <p className="my-3">{location.locationDescription}</p>

              <div className="d-flex mb-3">
                <Button color="green" location={true} onClick={handleAddClick}>
                  Like location
                </Button>
                <Button location={true}>View on Google Maps</Button>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6">
              <form>
                <textarea
                  rows="13"
                  placeholder="Share your experience here...."
                ></textarea>
                <AltButton location={true} className="ms-auto mt-3 mb-5">
                  Post Experience
                </AltButton>
              </form>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-between">
                <h4>Reviews</h4>
                <div>
                  Average Rating <i>{FourStars}</i>
                </div>
              </div>
              <ul className={classes.reviews}>
                <li>
                  <div>
                    <div className="d-flex justify-content-between">
                      <h5>
                        <b>Awesome Sound Experience!!!</b>
                      </h5>
                      <i>{FiveStars}</i>
                    </div>

                    <p>
                      Awesome Sound Experience!!! Best Cinema Experience I have
                      experienced in my life. Sound was so amazing and the 3d
                      viewing was ecstatic. Fantastic Popcorns as well!
                    </p>
                    <div className={classes.user}>
                      <img src={Avatar} className="img-fluid  me-2" alt="pfp" />
                      <p className="mt-1" style={{ color: "#009f57" }}>
                        Kehinde Olu-Onifade
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <div className="d-flex justify-content-between">
                      <h5>
                        <b>Awesome Sound Experience!!!</b>
                      </h5>
                      <i>{FiveStars}</i>
                    </div>

                    <p>
                      Awesome Sound Experience!!! Best Cinema Experience I have
                      experienced in my life. Sound was so amazing and the 3d
                      viewing was ecstatic. Fantastic Popcorns as well!
                    </p>
                    <div className={classes.user}>
                      <img src={Avatar} className="img-fluid  me-2" alt="pfp" />
                      <p className="mt-1" style={{ color: "#009f57" }}>
                        Kehinde Olu-Onifade
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationDetails;
