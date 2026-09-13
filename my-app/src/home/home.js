import React, { useState, useEffect } from "react";
import axios from 'axios';
import { apiUrl, mediaUrl } from '../config';
import { Link, Outlet } from "react-router-dom";
import image1 from '../home/peakpx 1.jpg';
import image2 from '../home/peakpx 2.jpg';
import image3 from '../home/peakpx 3.jpg';
import image4 from '../home/peakpx 4.jpg';
import image5 from '../home/peakpx 5.jpg';
import image6 from '../home/peakpx 6.jpg';
import image7 from '../home/peakpx 7.jpg';
import dinosaur from '../home/peakpx (15).jpg';
import dog from '../home/dog-5753302.jpg';
import { motion } from 'framer-motion';
import AnimatedText from "../WAVE TEXT/Wavetext";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "./home.css";

const images = [image1, image2, image3, image4, image5, image6, image7];

const variants = {
  enter: { x: 120, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -120, opacity: 0 },
};

function Home() {
  const [category, setCategory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unreadCounts, setUnreadCounts] = useState({});

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    axios
      .get(apiUrl('/api/getAnimalcategorylimit'))
      .then((apioutput) => {
        const categories = apioutput.data.Animal || [];
        setCategory(categories);

        categories.forEach((cat) => {
          axios
            .post(apiUrl('/api/getAnimalnumber'), {
              Categoryname: cat.Categoryname,
            })
            .then((res) => {
              setUnreadCounts((prevCounts) => ({
                ...prevCounts,
                [cat.Categoryname]: res.data.count,
              }));
            })
            .catch((err) =>
              console.error("Error getting count for", cat.Categoryname, err)
            );
        });
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mains">
      <section className="slideshow">
        <div className="slide-copy">
          <span className="hero-kicker">Living encyclopedia of the wild</span>
          <AnimatedText text="Explore, Protect" />
          <AnimatedText text="Preserve..." />
          <p className="slogan">
            Wildlife refers to undomesticated animals living freely in natural habitats,
            playing vital roles in ecological balance across forests, oceans, deserts,
            and beyond.
          </p>
        </div>

        <motion.div
          key={currentIndex}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <img className="slideimg" src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        </motion.div>

        <div className="slider-controls">
          <button className="prev" onClick={goToPrevious} aria-label="Previous slide">
            <ArrowBackIosNewIcon />
          </button>
          <button className="next" onClick={goToNext} aria-label="Next slide">
            <ArrowForwardIosIcon />
          </button>
        </div>
      </section>

      <h1 className="collection-Title">Nature's wonders are our responsibility.</h1>

      <div className="grid-containerrr">
        {category.map((element) => (
          <div className="grid-itemmm" key={element._id || element.Categoryname}>
            <Link className="ctext-cate" to={`/Animalcategory?Categoryname=${element.Categoryname}`}>
              <img className="cimg" src={mediaUrl(element.file)} alt={element.Categoryname} />
              <span>{element.Categoryname}</span>
            </Link>
            <div className="category-count">{unreadCounts[element.Categoryname] || 0} Species</div>
          </div>
        ))}
      </div>

      <div className="button-row">
        <Link className="cta-button" to="/Collection">See All Collection</Link>
      </div>

      <div className="pet-section">
        <div className="pet-content">
          <h2 className="pet-title">Discover <span>Wildlife Pets</span></h2>
          <p className="pet-description">
            Our beloved pets are part of the animal kingdom too. Explore the pet collection
            to learn about breeds, traits, and the stories behind our closest animal companions.
          </p>
          <Link to="/Pets">
            <button className="pet-button">Explore Now</button>
          </Link>
        </div>
        <div className="pet-image-container">
          <img src={dog} alt="Wildlife Pets" className="pet-image" />
        </div>
      </div>

      <h1 className="cnm">Animals from A to Z</h1>

      <div className="character-grid">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <Link className="ctext" key={letter} to={`/FirstChardetail?firstChar=${letter}`}>
            {letter}
          </Link>
        ))}
      </div>

      <div className="ancient-card">
        <div className="ancient-card-content">
          <h2 className="ancient-card-title">Step back in time with <span>Ancient Animals</span></h2>
          <p className="ancient-card-description">
            Explore prehistoric creatures that once roamed the Earth. From dinosaurs to
            mammoths, discover their history, adaptations, and the worlds they inhabited.
          </p>
          <Link to="/Extinct">
            <button className="ancient-card-button">Discover More</button>
          </Link>
        </div>
        <div>
          <img src={dinosaur} alt="Ancient Animals" className="ancient-image" />
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default Home;
